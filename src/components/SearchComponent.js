import React,{Component} from 'react';
import './BookShelfComponent.css';
import BookShelfComponent from './BookShelfComponent';

class SearchComponent extends  Component{
    constructor(props){
        super(props);

        this.state = {
            searchText:"" ,
            searchResults :this.props.books   
        }
    }

    handleChange= (text)=>{
        this.setState({searchText:text});
    }

    applySearch =()=>{
        const {search} = this.props;
        search(this.state.searchText);
    }
    render(){
        let info ={
            books:this.props.searchResults,
            title:'Search Results',
            refresh:null
        };
        return (
            <div className="search-container">
                <button onClick={this.props.close}> close</button>
                <input type='text' placeholder="Search by title or author" onChange={
                    ($event)=>this.handleChange($event.target.value)
                }></input>
                <button onClick={this.applySearch}>Serach</button>
                <BookShelfComponent info={info}/>
            </div>
        )
    }
}


export default SearchComponent;