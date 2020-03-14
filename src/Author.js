import React from 'react';
import './Author.css'

export default props =>
    <div className="author">
        <img className="author__pic" src="http://placehold.it/128x128" alt={props.details.name}/>
        <h1 className="author__name">{props.details.name}</h1>
    </div>