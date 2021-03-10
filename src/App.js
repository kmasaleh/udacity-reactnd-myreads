import { Component } from 'react';
import './App.css';
import BookShelfComponent from './components/BookShelfComponent'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import SearchComponent from './components/SearchComponent';
import Icon from '@material-ui/core/Icon';
import {BookInfo, BookStatus,fromRawBooksToInfoBooks,mergeSearchWithUserBooks, mergeUserBooksWithSearch} from './../src/utilities/BookInfo'
import {search,getAll} from './BooksAPI';

var books = require('./books-mock.json').books; //(with path)

//var userBookStore =[];
class  App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      userBookStore : null ,
      searchResultBooks : new Array() ,
      searchOpened :false
    }

    //this.userBookStore = fromRawBooksToInfoBooks(books);
    this.searchResultBooks =null;
    this.searchOpened=false;

  }

  getReadBooks(){
    return  this.userBookStore?.filter(f=>f.status===BookStatus.Read);
  }
  getWanttoReadBooks(){
    return this.userBookStore?.filter(f=>f.status===BookStatus.WantToRead);
  }
  getReadingBooks(){
    return this.userBookStore?.filter(f=>f.status===BookStatus.Reading);
  }

  refreshViews= ()=>{
    this.forceUpdate();
  }

  applySearch =(text)=>{
    if(text===null || text==="")
    {
      getAll().then((books)=>{
        let searchBooks = fromRawBooksToInfoBooks(books);
        this.searchResultBooks = mergeSearchWithUserBooks(searchBooks,this.userBookStore);
        this.forceUpdate();
    });
    }
    else{
      search(text).then((books)=>{
          let searchBooks = fromRawBooksToInfoBooks(books);
          //let s = { searchResults : mergeSearchWithUserBooks(searchBooks,this.userBookStore)};
          //this.setState(s);
          this.searchResultBooks = mergeSearchWithUserBooks(searchBooks,this.userBookStore);
          //this.userBookStore = s;
          this.forceUpdate();
      });
    }
}

closeSearch = ()=>{
  this.userBookStore = mergeUserBooksWithSearch(this.searchResultBooks,this.userBookStore);
  this.searchResultBooks =null;
  this.setState({searchOpened:false});
}
openSearch =()=>{
  this.setState({searchOpened:true});
//  this.searchOpened=true;
}

drawShelves = ()=> {
  var infoWanttoRead = { books :this.getWanttoReadBooks(),title:"Want To Read", refresh:this.refreshViews} ;
  var infoCurentlyReading = { books :this.getReadingBooks(),title:"Currently Reading", refresh:this.refreshViews}       
  var infoRead = { books :this.getReadBooks(),title:"Read", refresh:this.refreshViews}       
  return (
    <div>
   
      <BookShelfComponent  info={infoWanttoRead}> </BookShelfComponent>
      <BookShelfComponent  info={infoCurentlyReading}> </BookShelfComponent>
      <BookShelfComponent  info={infoRead}></BookShelfComponent>
    </div>
  );
}
  render(){
    return (
      <div className="App">
          { this.state.searchOpened &&
            (<SearchComponent search={this.applySearch} close={this.closeSearch} searchResults={this.searchResultBooks}></SearchComponent>)
          }
           
           {
            this.state.searchOpened===false &&  this.drawShelves()
          }        
          <LibraryAddIcon style={{ fontSize: 35 }} className='add' onClick={this.openSearch}></LibraryAddIcon>
          
      </div>
    );
  }
}
/*
<Icon  style={{fontSize: 64,color: 'red'}}>add_circle</Icon>

*/
export default App;
