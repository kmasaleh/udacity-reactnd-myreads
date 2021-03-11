import React,{Component} from 'react';
import './SearchComponent.css';
import './../App.css';
import BookShelfComponent from './BookShelfComponent';
import ReplyAllSharpIcon from '@material-ui/icons/ReplyAllSharp';
import { Link } from "react-router-dom";
import {search,getAll} from './../BooksAPI';
import {mergeSearchWithUserBooks, fromRawBooksToInfoBooks} from './../utilities/BookInfo';

class SearchComponent extends  Component{

    constructor(props){
        super(props);

        this.state = {
            searchText:"" ,
            searchResults :[],
            inProgressSearch :false,
        }
        this.userIsWriting =false;
        this.timeout = null;
    }

    componentDidMount(){

    }

    handleChange= (text)=>{
        let t= text;
        //if(this.userIsWriting)
          //  return;
        let That =this;    
        
        clearTimeout(this.timeout);
        this.timeout= setTimeout(()=>{
            That.setState({searchText:t});
        //    That.userIsWriting=false;
            That.applySearch2();
            t="";
        },600)    
    }

    
    applySearch2 = ()=>{
        this.setState({inProgressSearch:true});
        let userBooks = [];
        getAll()
        .then((rawBooks)=>fromRawBooksToInfoBooks(rawBooks))
        .then(books=>userBooks=books)
        .catch(error=> {
            alert(error);
        });
        search(this.state.searchText)
        .then((rawbooks)=>fromRawBooksToInfoBooks(rawbooks))
        .then(searchBooks=> mergeSearchWithUserBooks(searchBooks,userBooks))
        .then(books=> {
            this.setState({searchResults:books})
            this.setState({inProgressSearch:false});
        })
        .catch(error=>  { 
            this.setState({inProgressSearch:false});
            alert(error)

        });
    }
    
    render(){
        let info ={
            books:this.state.searchResults,
            title:'Search Results'
        };
        return (
            <div>
                <div className="search-container">
                    
                    <Link to="/home">
                        <ReplyAllSharpIcon style={{ fontSize: 35 }} className="close-search" onClick={this.props.close}/>    
                    </Link>
                    <input type='text' placeholder="Search by title or author" 
                        onChange={($event)=>this.handleChange($event.target.value)}>
                    </input>
                </div>
                <div className="loader" style={{display:this.state.inProgressSearch?'block':'none'}}></div>
                <BookShelfComponent info={info}/>
            </div>
        )
    }
}

export default SearchComponent;