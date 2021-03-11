import React,{Component} from 'react';
import './BookComponent.css';
import Icon from '@material-ui/core/Icon';
import { BookStatus } from '../utilities/BookInfo';

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
        book.shelf =  obj.value;
        if(refresh)
            refresh(book);
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
            <div className='book-container' key={book.id}> 
               <div className='thumb-container' >
                <img src={book?.thumb} alt='thumbnail' />
               </div>
               <div className='title'>{this.bookTitle}</div>
               {
                   book.authors?.map(a=> <div className='author'>{a}</div>)
                }
               <Icon style={{ fontSize: 35 }} className='bottom-right' >assignment</Icon>
               <select  className='menu bottom-right' onChange={ev=>this.changeStatus(ev.target)} 
                defaultValue={this.props.book.shelf} >
               <option value="-1" disabled="disabled">Move To</option>
                    <option value= {BookStatus.None} >None</option>
                    <option value={BookStatus.WantToRead} >Want to Read</option>
                    <option value={BookStatus.Reading} >Curently Reading</option>
                    <option value={BookStatus.Read} >Read</option>
                </select>
            </div>
        );
    }
}


export default  BookComponent;