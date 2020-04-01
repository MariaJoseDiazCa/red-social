import React from 'react';
import Routes from './Routes';
import Nav from './Nav'

import LoginContext from './LoginContext'

// const {Provider} = LoginContext

export default class extends React.Component {
	state = { logged: Boolean(localStorage.getItem('user'))}
	render () {
		return(
			
			<LoginContext.Provider value={{
				logged:this.state.logged,
				login: this.login,
				logout: this.logout
				}}>
				<Nav />
				<Routes />
			</LoginContext.Provider>

		)
	}
	login = user =>{
		localStorage.setItem('user', JSON.stringify(user))
		this.setState({logged: true})
	}

	logout = user => {
		this.setState({logged: false})
		localStorage.removeItem('user')

	}
}




// Estas dos expresiones son equivalentes:

// <>
// <React.Fragment></React.Fragment>

// Pero solo React.Fragment puede tener props (por ejemplo, key)