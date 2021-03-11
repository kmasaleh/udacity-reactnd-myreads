import React,{Component} from 'react';
import './SearchComponent.css';
import BookShelfComponent from './BookShelfComponent';
import ReplyAllSharpIcon from '@material-ui/icons/ReplyAllSharp';

class SearchComponent extends  Component{
    constructor(props){
        super(props);

        this.state = {
            searchText:"" ,
            searchResults :this.props.books,
            inProgressSearch :false
        }
        this.inProgressSearch =false;
        this.userIsWriting =false;
    }

    handleChange= (text)=>{
        let t= text;
        if(this.userIsWriting)
            return;
        let That =this;    
        setTimeout(()=>{
            That.setState({searchText:t});
            That.userIsWriting=false;
            That.applySearch();
            t="";
        },400)    

        
    }

    applySearch =()=>{
        let That =this;
        this.setState({inProgressSearch:true});
        //this.inProgressSearch=true;
        const {search} = this.props;
        search(this.state.searchText)
        .then(()=> {
            this.setState({inProgressSearch:false});
            //That.inProgressSearch=false
        })
        .catch(e=> {
            this.setState({inProgressSearch:false});
            //That.inProgressSearch=false
        });
    }
    render(){
        let info ={
            books:this.props.searchResults,
            title:'Search Results',
            refresh:null
        };
        return (
            <div>
                <div className="search-container">
                    <ReplyAllSharpIcon style={{ fontSize: 35 }} className="close-search" onClick={this.props.close}></ReplyAllSharpIcon>
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
//{this.inProgressSearch && (<div className="loader"></div>) }
export default SearchComponent;