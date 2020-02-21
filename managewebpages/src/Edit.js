import React from 'react';
import Select from 'react-select';
import axios from 'axios'


class Edit extends React.Component{

state={options:{type:[{value:0,label:"0 (Menu)"},{value:1,label:"1 (Events)"},{value:2,label:"2 (Content)"}],active:[{value:true,label:"true"},{value:false,label:"false"}]}}


componentDidMount(){  

    this.setState({PageId:this.props.item.id,PageTitle:this.props.item.title,PageDescription:this.props.item.description,PageType:this.props.item.type,PageIsActive:this.props.item.isActive,PageDate:this.props.item.publishedOn})

}
submitEditPage= async (e)=>{
debugger
let url='http://pagesmanagement.azurewebsites.net/api/ResponsivePages/'+e.target.className
let body={"id":this.state.PageId,"title": this.state.PageTitle,"description": this.state.PageDescription,"type": this.state.PageType.value,"isActive": this.state.PageIsActive.value,"publishedOn":this.state.PageDate}
try{
    const res= await axios.put(url,body)
    this.props.cancelEditMode()
    this.props.getPages()            
}   
catch(e){
 console.log(e)
}
}

render(){

  return <form className="page_grid">
            <div></div>
            <input placeholder="Title" value={this.state.PageTitle} onChange={(e)=>{this.setState({PageTitle:e.target.value})}}></input>
            <input placeholder="Description" value={this.state.PageDescription} onChange={(e)=>{this.setState({PageDescription:e.target.value})}}></input>
            <Select value={this.state.PageType} options={this.props.options.type} onChange={(PageType)=>{this.setState({PageType:PageType})}} name="Type" />
            <Select value={this.state.PageIsActive} options={this.props.options.active} onChange={(PageIsActive)=>{this.setState({PageIsActive:PageIsActive})}} name="Active" />
            <input value={this.state.PageDate} onChange={(e)=>{this.setState({PageDate:e.target.value})}} type="datetime-local" name="start" min="2020-01-01" max="2023-12-31"/>
            <div style={{display:'flex'}}><button className={this.props.item.id} onClick={this.submitEditPage} style={{backgroundColor:'rgb(84, 158, 84)'}}>Submit</button><button onClick={this.props.cancelEditMode} style={{backgroundColor:'rgb(212, 76, 63)'}}>Cancel</button></div>                            
        </form>
}  
}

export default Edit;