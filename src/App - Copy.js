import { Component } from 'react';
import './App.css';
import BookShelfComponent from './components/BookShelfComponent'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import SearchComponent from './components/SearchComponent';
import { BookStatus,fromRawBooksToInfoBooks,mergeSearchWithUserBooks } from './../src/utilities/BookInfo'
import {search,getAll,update} from './BooksAPI';
import { BrowserRouter as Router,Route,Link } from "react-router-dom";


//var books = require('./books-mock.json').books; //(with path)

//var userBookStore =[];
class  App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      userBookStore : null ,
      searchResultBooks : [],
      searchOpened :false,
      inProgressUpdate:false
    }

    //this.userBookStore = fromRawBooksToInfoBooks(books);
    //this.searchResultBooks =null;
    //this.searchOpened=false;
    //this.userBookStore =null;
  }
  componentDidMount(){
    this.getAllUserBooks();
}

  getAllUserBooks = ()=> {
    this.setState({inProgressUpdate:true});
    getAll()
    .then((books)=>{
      //this.userBookStore = fromRawBooksToInfoBooks(books);
      //this.setState({inProgressUpdate:false});

    this.setState({
      userBookStore: fromRawBooksToInfoBooks(books),
      inProgressUpdate:false
    })

      //this.forceUpdate();
    })
    .catch(error=> {
      alert(error);
    });

  }
  getReadBooks(){
    return  this.state.userBookStore?.filter(f=>f.shelf===BookStatus.Read);
  }
  getWanttoReadBooks(){
    return this.state.userBookStore?.filter(f=>f.shelf===BookStatus.WantToRead);
  }
  getReadingBooks(){
    return this.state.userBookStore?.filter(f=>f.shelf===BookStatus.Reading);
  }

  updateBookStatus=  (book)=>{
    this.setState({inProgressUpdate:true});
    update(book,book.shelf)
    .then(()=>{
      this.setState({inProgressUpdate:false});
      this.getAllUserBooks();
    });
    
  }

  refreshViews= ()=>{
    this.forceUpdate();
  }

  applySearch =(text)=>{
    let p = new Promise((resolve,reject)=>{
        search(text)
        .then((books)=>{
            let searchBooks = fromRawBooksToInfoBooks(books);
            //this.searchResultBooks = mergeSearchWithUserBooks(searchBooks,this.userBookStore);
            this.setState({searchResultBooks:mergeSearchWithUserBooks(searchBooks,this.state.userBookStore)});
            //this.forceUpdate();
            resolve();
        })
        .catch(error=> reject(error));
    });
    return p;
}

closeSearch = ()=>{
  //this.searchResultBooks =null;
  this.setState({searchOpened:false,
    searchResultBooks :null
  });
  this.getAllUserBooks();
}
openSearch =()=>{
  this.setState({searchOpened:true});
}
/*
drawShelves = ()=> {
  const infoWanttoRead = { books :this.getWanttoReadBooks(),title:"Want To Read", refresh:this.refreshViews} ;
  const infoCurentlyReading = { books :this.getReadingBooks(),title:"Currently Reading", refresh:this.refreshViews}       
  const infoRead = { books :this.getReadBooks(),title:"Read", refresh:this.refreshViews}       
  return (
    <div>
      <BookShelfComponent  info={infoWanttoRead}/> 
      <BookShelfComponent  info={infoCurentlyReading}/> 
      <BookShelfComponent  info={infoRead}/>
    </div>
  );
}*/
  render(){
    const infoWanttoRead = { books :this.getWanttoReadBooks(),title:"Want To Read", refresh:this.updateBookStatus} ;
    const infoCurentlyReading = { books :this.getReadingBooks(),title:"Currently Reading", refresh:this.updateBookStatus}       
    const infoRead = { books :this.getReadBooks(),title:"Read", refresh:this.updateBookStatus}       
  
    return (
      <Router>
        
        <div className="App">

          <header>
              MyReads
            <span>&copy; 2021 Khaled Saleh</span>
          </header>
            
            {
              /*
             this.state.searchOpened &&
              (<SearchComponent search={this.applySearch} close={this.closeSearch} 
                searchResults={this.state.searchResultBooks} updateBook={this.updateBookStatus}
                >
                </SearchComponent>)
                */
            }
            
            {
              //this.state.searchOpened===false && 
              (
                <div>
                  <div className="loader" style={{display:this.state.inProgressUpdate?'block':'none'}}></div>
                  <BookShelfComponent  info={infoWanttoRead}/> 
                  <BookShelfComponent  info={infoCurentlyReading}/> 
                  <BookShelfComponent  info={infoRead}/>
                </div>
              )
              
              //this.drawShelves()
            }        
            
              <Link to="/search">
              <LibraryAddIcon style={{ fontSize: 35 }} className='add'onClick={this.openSearch}>
              </LibraryAddIcon>
              </Link>
            
            
            <Route path="/search" component={SearchComponent} />
        </div>
      </Router>
    );
  }
}
/*
<Icon  style={{fontSize: 64,color: 'red'}}>add_circle</Icon>
            <Route path="/" component={App} />
             <Route path="/home" component={App} />
            <Route path="/search" component={SearchComponent} />

*/
export default App;
