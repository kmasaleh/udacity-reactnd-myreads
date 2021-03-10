import React,{Component} from 'react';
import './BookComponent.css';
import Icon from '@material-ui/core/Icon';
import {AssignmentIcon}  from '@material-ui/icons/Assignment';





export let UserBooks =  [];

class BookComponent extends  Component{
    constructor(props){
        super(props);
/*
        this.state = {
            book: props.book   
        }*/
        this.changeStatus.bind(this);
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        //console.log(`book shelf status is : ${this.state.ShelfStatus}`);
    }
    changeStatus(obj){
        const  {refresh,book } = this.props;
        book.status =  parseInt(obj.value,10);
        if(refresh)
            refresh();
    }

    bookTitle = ()=>{
        const  {book } = this.props;
        if(book.title)
            return  book.title;
        if(book.subtitle)    
            return  book.subtitle;

        return "";
    }
    render(){
        const  {book } = this.props;
//<Assignment style={{ color: red[500],fontsize:50 }}></Assignment>
//               <Icon className="fa fa-plus-circle" />  <HomeIcon />
        return(
            <div className='book-container'> 
               <div className='thumb-container'>
                <img src={book.thumb} alt='thumbnail'/>
               </div>
               <div className='title'>{this.bookTitle}</div>
               {
                   book.authors?.map(a=> <div className='author'>{a}</div>)
                }
               <Icon style={{ fontSize: 35 }} className='bottom-right' >assignment</Icon>
               <select  className='menu bottom-right' onChange={ev=>this.changeStatus(ev.target)}>
               <option value="-1" disabled="disabled">Move To</option>
                    <option value="0" selected={this.props.book.status===0}>None</option>
                    <option value="1" selected={this.props.book.status===1}>Want to Read</option>
                    <option value="2" selected={this.props.book.status===2}>Curently Reading</option>
                    <option value="3" selected={this.props.book.status===3}>Read</option>
                </select>
            </div>
        );
    }
}


export default  BookComponent;