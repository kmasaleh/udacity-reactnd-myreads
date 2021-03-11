import { Component } from 'react';
import './App.css';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import SearchComponent from './components/SearchComponent';
import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import HomeComponent from './components/HomeComponent';


class  App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
    }

  }
  componentDidMount(){
}


  render(){
  
    return (
      <Router>
        
        <div className="App">
          <header>
              MyReads
            <span>&copy; 2021 Khaled Saleh</span>
          </header>
            
          
            <Route path="/" exact component={HomeComponent} />            
            <Route path="/home" exact component={HomeComponent} />            
            <Route path="/search">
                <SearchComponent/> 
              </Route>  


        </div>
      </Router>
    );
  }
}
//<Route path="/search/:search/:close/:searchResults/:updateBook" component={SearchComponent} />
export default App;
