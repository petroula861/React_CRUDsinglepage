import React from 'react';
import axios from 'axios'
import Select from 'react-select';
import Edit from './Edit'
import edit from './images/edit.svg';
import trash from './images/trash.jpg';
import add from './images/add.png';
import './App.css';
import FlipMove from "react-flip-move"


class View extends React.Component{

    state={PageDate:"2021-01-01T00:00:00",PageTitle:"",PageType:{value:1},PageIsActive:{value:"false"},PageDescription:"",options:{type:[{value:0,label:"0 (Menu)"},{value:1,label:"1 (Events)"},{value:2,label:"2 (Content)"}],active:[{value:true,label:"true"},{value:false,label:"false"}]}}
//new Date().toISOString() "2021-01-01T00:00:00"

submitNewPage=async ()=>{
    console.log("state",this.state)
    let url='http://pagesmanagement.azurewebsites.net/api/ResponsivePages/'
    let body={"title": this.state.PageTitle,"description": this.state.PageDescription,"type": this.state.PageType.value,"isActive": this.state.PageIsActive.value,"publishedOn":this.state.PageDate}
    try{
        const res= await axios.post(url,body)
        console.log("response_addnewpage",res.data)
         this.props.getPages()
         this.props.setNewPageFlag(false)
         this.setState({PageDate:"2021-01-01T00:00:00",PageTitle:"",PageType:{value:1},PageIsActive:{value:false},PageDescription:""})
                  
    }
    catch(e){
     console.log(e)
    }
}


  
render(){

let {PageType}=this.state
let {PageIsActive}=this.state
let {PageDate}=this.state
let {type}=this.state.options
let {active}=this.state.options

  return <div className="View_container">
    <div className="page_grid">
        <h3>Id</h3><h3>Title</h3><h3>Description</h3><h3 style={{textAlign:'center'}}>Type</h3><h3 style={{textAlign:'center'}}>IsActive</h3><h3 style={{textAlign:'center'}}>PublishedOn</h3><h3>Actions</h3>
  </div>
  <div className="View_container_grid">
  <FlipMove>
  {this.props.newPage?
    <form className="page_grid" >
       <div></div>
       <input placeholder="Title" required onChange={(e)=>{this.setState({PageTitle:e.target.value})}}></input>
       <input placeholder="Description" onChange={(e)=>{this.setState({PageDescription:e.target.value})}}></input>
       <Select value={PageType} options={type} onChange={(PageType)=>{this.setState({PageType:PageType})}} name="Type" />
       <Select value={PageIsActive} options={active} onChange={(PageIsActive)=>{this.setState({PageIsActive:PageIsActive})}} name="Active" />
        <input onChange={(e)=>{this.setState({PageDate:e.target.value})}} value={PageDate} type="datetime-local" name="start" min="2020-01-01" max="2023-12-31"/>
        <div style={{display:'flex'}}><button onClick={this.submitNewPage} style={{backgroundColor:'rgb(84, 158, 84)'}}>Submit</button><button onClick={()=>this.props.setNewPageFlag(false)} style={{backgroundColor:'rgb(212, 76, 63)'}}>Cancel</button></div>                            
        </form>:null}
  {this.props.pages.map((item,index)=>(!this.props.editPage.flag||item.id!=this.props.editPage.id)? //!= needed here 
   <div key={item.id} className="page_grid">
     <div>{item.id}</div>
     <div style={{ textTransform: 'uppercase'}}>{item.title}</div>
     <div>{item.description}</div>
     <div style={{textAlign:'center'}}>{item.type}</div>
     <div style={{textAlign:'center'}}>{String(item.isActive)}</div>
     <div style={{textAlign:'center'}}>{item.publishedOn}</div>
     <div><img className={item.id} onClick={this.props.deletePage} src={trash} title="Delete" alt="trash"/><img className={item.id} src={edit} onClick={this.props.setEditMode} title="Edit" alt="edit" /><a href="#"><img src={add} onClick={()=>this.props.setNewPageFlag(true)} title="Add" alt="add" /></a></div>
  </div>:
  ///EDIT MODE
  <Edit item={item} getPages={this.props.getPages} cancelEditMode={this.props.cancelEditMode} options={this.state.options}/>   
  )}
   
</FlipMove>
  </div>
  </div>
}  
}

export default View;
