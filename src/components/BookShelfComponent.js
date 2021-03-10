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
                {
                  info.books?.length>0 && info.books.map((bookinfo)=>{
                        return <BookComponent key={bookinfo.id} book={bookinfo} refresh={info.refresh}/>
                  })
                   
                }

            </div>
        )
    }
}


export default BookShelfComponent;