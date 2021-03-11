import React,{Component} from 'react';
import './BookShelfComponent.css';
import BookComponent from './BookComponent'

class BookShelfComponent extends  Component{
    constructor(props){
        super(props);

        this.state = {
            
        }
    }

    render(){
        const {info } = this.props;
        return (
            <div className='shelf-container'>
                <div className='shelf-title'>{info.title}</div>
                <ul>
                {
                  info.books?.length>0 && info.books.map((bookinfo)=>{
                        return (
                        <li key={bookinfo?.id}>
                            <BookComponent   book={bookinfo} refreshParent={info.refresh}/>
                        </li>
                        )
                  })
                   
                }
                </ul>

            </div>
        )
    }
}


export default BookShelfComponent;