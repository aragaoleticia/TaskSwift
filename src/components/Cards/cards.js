import React from "react";
import './cards.css';

function Cards({label, innerRef}){
    return(
    <div className='container-cards' ref={innerRef}>
        <div className='card'>
            <textarea placeholder={label}></textarea>            
        </div>
    </div>
    )
}


export default Cards;