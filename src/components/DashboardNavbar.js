import React from "react";
import { Link, Outlet } from "react-router-dom";

function  DashboardNavbar(props) {
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
                   }}>Dashboard layout</li></div> 
       <ul style={{
                        listStyle: "none",
                        display: "flex",
                        gap: "30px",
                        margin: 0,
                        padding: 0,
                       marginLeft: "auto" 
        }}>
       
       <Link to="/loan"style={{color: "white" ,
                                fontSize: "1.3rem" ,
                                fontWeight: "bold" ,
                                textDecoration: "none", 
                                }}>{props.link1}</Link>

        <Link to="/savings"style={{color: "white" ,
                                fontSize: "1.3rem" ,
                                fontWeight: "bold" ,
                                 textDecoration: "none"
                                 }}>{props.link2}</Link>

        <Link to="/repayments"style={{color: "white" , 
                                     fontSize: "1.3rem" ,
                                     fontWeight: "bold" ,
                                      textDecoration: "none"
                                      }}>{props.link3}</Link>

        <Link to="/transactions"style={{color: "white", 
                                   fontSize: "1.3rem" ,
                                   fontWeight: "bold" ,
                                   textDecoration: "none"
                                   }}>{props.link4}</Link>

        <Link to ="/profile" style={{color: "white" , 
                                  fontSize: "1.3rem" ,
                                  fontWeight: "bold" , 
                                  textDecoration: "none"
                                  }}>{props.link5}</Link>

        
        <Link to="/overview"style={{color: "white" , 
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

export default DashboardNavbar;