import { useState } from "react";
import Header from "./Header";
import PreflopTrivia from "./PreflopTrivia";

function Training(props) {

    return (
        <>
            <Header />
            <PreflopTrivia matrix={props.matrix} /> 
        </>
    );
  }
  
  export default Training;
  