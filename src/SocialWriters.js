import React from 'react';
import Routes from './Routes';
import Nav from './Nav'

export default props =>

<>
	<Nav/>
	<Routes/>
</>

// Estas dos expresiones son equivalentes:

// <>
// <React.Fragment></React.Fragment>

// Pero solo React.Fragment puede tener props (por ejemplo, key)