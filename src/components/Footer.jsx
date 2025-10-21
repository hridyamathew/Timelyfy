import React from "react";

function Footer() {
  return (
    <>
      <div className="container my-4">
        <p className="my-0" style={{fontSize:'small', textAlign:'center'}}>© 2025 Timelyfy. All rights reserved | Made with React by Hridya</p>
        <div className="d-flex justify-content-center">
          <a href="https://www.linkedin.com/in/hridya-mathew" target="_blank">
            <i className="fa-brands fa-linkedin fs-3 me-3" style={{color:'#5d0535ff'}}></i>
          </a>
          <a href="https://github.com/hridyamathew" target="_blank">
            <i className="fa-brands fa-github fs-3" style={{color:'#5d0535ff'}}></i>
          </a>
        </div>
        
      </div>
    </>
  );
}

export default Footer;
