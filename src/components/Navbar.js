import "../App.css";
import React from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar(props) {
  return (
    <>
        <div style={{    backgroundColor: "green",
                         display: "flex",
                         textDecoration: "none",
                         justifyContent: "spacebetween",
                         alignItems: "center",
                         padding: "20px 50px"
                     }}>
      <div><li style={{  display: "left",
                         color: "white",
                         marginRight: "auto", 
                         fontSize: "1.3rem",
                         fontWeight: "bold",
                       listStyle: "none"
                   }}>Digital Loan and Savings management (DLSM).</li></div> 
       <ul style={{
                        listStyle: "none",
                        display: "flex",
                        gap: "30px",
                        margin: 0,
                        padding: 0,
                       marginLeft: "auto" 
        }}>
       
       <Link to="/home"style={{color: "white" ,
                                fontSize: "1.3rem" ,
                                fontWeight: "bold" ,
                                textDecoration: "none", 
                                }}>{props.link1}</Link>

        <Link to="/sign"style={{color: "white" ,
                                fontSize: "1.3rem" ,
                                fontWeight: "bold" ,
                                 textDecoration: "none"
                                 }}>{props.link2}</Link>

        <Link to="/login"style={{color: "white" , 
                                     fontSize: "1.3rem" ,
                                     fontWeight: "bold" ,
                                      textDecoration: "none"
                                      }}>{props.link3}</Link>

        <Link to="/about"style={{color: "white", 
                                   fontSize: "1.3rem" ,
                                   fontWeight: "bold" ,
                                   textDecoration: "none"
                                   }}>{props.link4}</Link>

        <Link to ="/support" style={{color: "white" , 
                                  fontSize: "1.3rem" ,
                                  fontWeight: "bold" , 
                                  textDecoration: "none"
                                  }}>{props.link5}</Link>

        
        <Link to="/contact"style={{color: "white" , 
                                     fontSize: "1.3rem" ,
                                     fontWeight: "bold" ,
                                      textDecoration: "none"
                                      }}>{props.link6}</Link>
              </ul>
        </div>
        <Outlet></Outlet>
    </>
  );
}

export default Navbar;
