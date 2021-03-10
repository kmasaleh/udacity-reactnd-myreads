import { Component } from 'react';
import './App.css';
import BookShelfComponent from './components/BookShelfComponent'
import {BookInfo} from './components/BookComponent'

var books = require('./books-mock.json').books; //(with path)

var bookStore =[];
class  App extends Component {
  constructor(props){
    super(props);
    
    this. allBooks =books
              .map((book)=>{
                    let bookinfo = new BookInfo();
                    bookinfo.thumb = book.imageLinks.thumbnail;
                    bookinfo.title = book.title;
                    bookinfo.authors  = book.authors;
                    bookinfo.id  = book.id;
                    return bookinfo;
              });
    //this.callMeBack.bind(this);
  }
  callMeBack= (bookInfo)=>{
//    var books = bookStore.filter(b=> b.id===bookInfo.id);
  //  if(books.length===0)
    //  bookStore.push(bookInfo);
    var f = this.allBooks.length;
    this.forceUpdate();
  }

  render(){
     var infoNone = { books :this.allBooks.filter(f=>f.status===0),title:"None", call:this.callMeBack} ;          
     var infoWanttoRead = { books :this.allBooks.filter(f=>f.status===1),title:"Want To Read", call:this.callMeBack} ;
     var infoCurentlyReading = { books :this.allBooks.filter(f=>f.status===2),title:"Curently Reading", call:this.callMeBack}       
     var infoRead = { books :this.allBooks.filter(f=>f.status===3),title:"Read", call:this.callMeBack}       
    return (
      <div className="App">
          <BookShelfComponent  info={infoNone}/>
          <BookShelfComponent  info={infoWanttoRead}/>
          <BookShelfComponent  info={infoCurentlyReading}/>
          <BookShelfComponent  info={infoRead}/>
      </div>
    );
  }
}

export default App;
