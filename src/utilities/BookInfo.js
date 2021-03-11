export const  BookStatus ={
    None :"none",
    WantToRead:"wantToRead",
    Reading:"currentlyReading",
    Read:"read"
} 
export class BookInfo {
    constructor(){
        this.title="";
        this.subtitle="";
        this.authors =[];
        this.thumb="";
        this.id="";
        //this.status = BookStatus.None;
        this.shelf = BookStatus.None;
    }
}
//displying search want to mix the search results with user list
export const mergeSearchWithUserBooks = (searchBooks,userBooks)=>{
    if(!userBooks)
        return searchBooks;

    let results = 
    searchBooks?.map(book=>{
        let t = userBooks.filter(b=>b.id===book.id)[0];
        if(t)
            book.shelf = t.shelf;

        return book;    
    })
    return results;
}

//close search and want to move user selection to user list
export const mergeUserBooksWithSearch = (searchBooks,userBooks)=>{
    if(searchBooks === null || searchBooks===undefined)    
        return null;

    searchBooks.map(book=>{
        if(userBooks!==null && userBooks!==undefined){
            let t = userBooks.filter(b=>b.id===book.id)[0];
            if(t && book.status!==BookStatus.None) t.status = book.status;
            if(t==null) userBooks.push(book);
        }
        else{
            userBooks = [];
            if(book.status!==BookStatus.None)
                userBooks.push(book);
        }
        return book;
    })
    let userBooksWithShelfOnly =[] ;
    userBooks.map(b=> {
        if(b.status!==BookStatus.None)
            userBooksWithShelfOnly.push(b);
        return b;    
    })
    return userBooksWithShelfOnly;
}

export const fromRawBooksToInfoBooks = (rawBooks)=>{
    if(!Array.isArray(rawBooks))
        return null;
    return rawBooks.map((book)=>{
        if(book===undefined)
            return undefined;
        let bookinfo = new BookInfo();
        bookinfo.thumb = book.imageLinks.thumbnail;
        bookinfo.title = book.title;
        bookinfo.subtitle = book.subtitle;
        bookinfo.authors  = book.authors;
        bookinfo.id  = book.id;
        bookinfo.shelf = book.shelf;
        return bookinfo;
  });
}