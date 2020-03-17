import React from 'react'

import './Showcase.css'

//patron:renderProps
const Showcase = props =>
    <ul className="showcase">
        {
            props.items.map((item)=>
                <li key={props.keyfn(item)} className= "showcase__item" >
                  {props.render(item)}
                </li> 
                
            )
            
        }
    </ul>
export default Showcase;
