import React from 'react';
import Routes from './Routes';
import Nav from './Nav'

import LoginContext from './LoginContext'

const USERS_URL = 'https://randomuser.me/api?seed=abc&results=100'


// const {Provider} = LoginContext

export default class extends React.Component {
	state = { 
		user: JSON.parse(localStorage.getItem('user')),
		posts: JSON.parse(localStorage.getItem('posts')) || {}
	}
	render () {
		return(

			<LoginContext.Provider value={{
				logged:Boolean(this.state.user),
				findUsers: this.findUsers,
				posts: this.state.posts,
				login: this.login,
				logout: this.logout,
				addPost: this.addPost
				}}>
				<Nav />
				<Routes />
			</LoginContext.Provider>
		)
	}

	findUsers = async () => {
		const response = await fetch(USERS_URL)
		const {results: users } = await response.json()
		return users
	}

	_attemptLogin = async ({user, password}) => {
		const users = await this.findUsers()
		const found = users.find(candidate =>
			candidate.login.username === user &&
			candidate.login.password === password
		)
		return found
	}

	login = async credentianls  => {
		const user = await this._attemptLogin(credentianls)
		if (!user){
			throw new Error('No user found')
		}
		localStorage.setItem('user', JSON.stringify(user))
		this.setState({ user })
		return user
	}

	logout = () => {
		this.setState({user: null})
		localStorage.removeItem('user')
	}

	addPost = post => {
		post.date = new Date()
		const previousState = this.state
		const uuid = previousState.user.login.uuid
		// setState debe devolver exactamente lo que va a cambiar
		// para este caso podría obviarse el primer ...previousState, ya que este no cambia, solo cambia posts
		const nextState = {
		  ...previousState,
			posts: {
			  ...previousState.posts,
			  [uuid]: [
				  post,
				  ...previousState.posts[uuid]
			  ]
			}
		}
		this.setState(nextState)
		localStorage.setItem(
		  'posts',
		  JSON.stringify(nextState.posts)
		)
	}
	componentDidUpdate () {
		localStorage.setItem('SocialWriters', JSON.stringify(this.state))
	}
}




// Estas dos expresiones son equivalentes:

// <>
// <React.Fragment></React.Fragment>

// Pero solo React.Fragment puede tener props (por ejemplo, key)