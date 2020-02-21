import React from 'react';
import axios from 'axios'
import Navbar from "./Navbar"
import New from './New'
import View from './View'
import {BrowserRouter as Router,Route} from "react-router-dom"

import './App.css';

class App extends React.Component{

 state={pages:[],newPage:false,editPage:{flag:false,id:""}}

componentWillMount(){
 this.getPages()
}

getPages= async ()=>{
  let url='http://pagesmanagement.azurewebsites.net/api/ResponsivePages'
 try{
  const res= await axios.get(url)
  console.log("resget",res.data)
  this.setState({pages:res.data})
 }
catch(error){
  console.log(error)
}

}

deletePage= async(e)=>{
if(!this.state.newPage&&!this.state.editPage.flag){
let url='http://pagesmanagement.azurewebsites.net/api/ResponsivePages/'+e.target.className
try{
    const res= await axios.delete(url)
    console.log("resdelete",res.data)
    this.getPages()            
}
catch(e){
 console.log(e)
}}
}

setNewPageFlag=(flag)=>{
  if(!this.state.editPage.flag){
    this.setState({newPage:flag})
  }
}
cancelEditMode=()=>{
this.setState({editPage:{flag:false,id:""}})

}

setEditMode= (e)=>{
  if(!this.state.newPage){
  this.setState({editPage:{flag:true,id:e.target.className}})
  }
}

render(){

  return <div className="App_container">     
              <Router>
                <Navbar/>             
              <Route exact path="/New" component={New}/>
              <Route exact path="/" render={()=>(<View pages={this.state.pages} getPages={this.getPages} deletePage={this.deletePage} setNewPageFlag={this.setNewPageFlag} newPage={this.state.newPage} setEditMode={this.setEditMode} editPage={this.state.editPage} cancelEditMode={this.cancelEditMode}/>)} />
              </Router>

        </div>
}  
}

export default App;
