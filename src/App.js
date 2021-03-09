import { Component } from 'react';
import './App.css';
import BookComponent from './components/BookComponent'
import BookInfo from './components/BookComponent'

var books = require('./books-mock.json').books; //(with path)
class  App extends Component {
  constructor(){
    super();
  }
  render(){
    const book = books[1];
    let bookinfo = new BookInfo();
    bookinfo.thumb = book.imageLinks.thumbnail;
    bookinfo.title = book.title;
    bookinfo.authors  = book.authors;
    

    return (
      <div className="App">
{
          books.map((book)=>{
                let bookinfo = new BookInfo();
                bookinfo.thumb = book.imageLinks.thumbnail;
                bookinfo.title = book.title;
                bookinfo.authors  = book.authors;
                bookinfo.id  = book.id;
                return <BookComponent key={bookinfo.id} book={bookinfo}/>
          })
                   
        }


      </div>
    );
  }
}

export default App;
