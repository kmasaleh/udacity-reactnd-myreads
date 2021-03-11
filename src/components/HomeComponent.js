import { Component } from 'react';
import './HomeComponent.css';
import BookShelfComponent from './BookShelfComponent';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { BookStatus,fromRawBooksToInfoBooks,mergeSearchWithUserBooks } from './../utilities/BookInfo';
import {search,getAll,update} from './../BooksAPI';
import { BrowserRouter as Router,Link,Route } from "react-router-dom";
import SearchComponent from './SearchComponent';
class  HomeComponent extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      userBookStore : null ,
      searchResultBooks : [],
      inProgressUpdate:false
    }

  }

  componentDidMount(){
    this.getAllUserBooks();
  }
    refreshViewHandler = ()=>{
    this.forceUpdate();
    }

    getAllUserBooks = ()=> {
        this.setState({inProgressUpdate:true});
        getAll()
        .then((books)=>{
            this.setState({
            userBookStore: fromRawBooksToInfoBooks(books),
            inProgressUpdate:false
            })
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



    render(){
        const infoWanttoRead = { books :this.getWanttoReadBooks(),title:"Want To Read", refresh:this.refreshViewHandler} ;
        const infoCurentlyReading = { books :this.getReadingBooks(),title:"Currently Reading", refresh:this.refreshViewHandler}       
        const infoRead = { books :this.getReadBooks(),title:"Read", refresh:this.refreshViewHandler}       
    
        return (

            <div className="Home">
                <div>
                    <div className="loader" style={{display:this.state.inProgressUpdate?'block':'none'}}></div>
                    <BookShelfComponent  info={infoWanttoRead}/> 
                    <BookShelfComponent  info={infoCurentlyReading}/> 
                    <BookShelfComponent  info={infoRead}/>
                </div>
                <Link to='/search' >
                    <LibraryAddIcon style={{ fontSize: 35 }} className='add'onClick={this.openSearch}/>
                </Link>

            </div>

        );
    }
}

export default HomeComponent;
