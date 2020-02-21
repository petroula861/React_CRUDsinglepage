import React from 'react';
import {NavLink} from "react-router-dom"



class Navbar extends React.Component{

render(){

  const styles={
    navstyle:{
      textTransform: 'uppercase',display:'flex'
    },
    default:{
      display:'block',width:'20%',textAlign:'center',padding:'1%',textDecoration:'none'
    },
    active:{borderBottom: "3px solid rgb(152, 208, 230)"}
  }
  return <div classname="Navbar" style={styles.navstyle}>

            <NavLink
            exact
            style={styles.default}
            activeStyle={styles.active}
            to={"/"}> All Pages
            </NavLink>
            <NavLink
            exact
            style={styles.default}
            activeStyle={styles.active}
            to={"/New"}> Miscalleneous
            </NavLink>

       </div>
}  
}

export default Navbar;
