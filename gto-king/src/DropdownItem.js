import { useState } from "react";

function DropdownItem(props) {


    return (
        <div className="dropdownItem">
            <img src={props.img} />
            <a href="#" onClick={props.onclick}>{props.page}</a>
        </div>
    );
  }
  
  export default DropdownItem;
  