import React, { Component } from 'react';
import './Authors.css'
import Showcase from './Showcase';
import Author from './Author';
import { Link } from 'react-router-dom'

const USERS_URL = 'https://randomuser.me/api?seed=abc&results=100';

class Authors extends Component {
	constructor () {
		super()
		this.state = { authors: [], /*logged: true,*/ loading: false, error: false }
	}

	async componentDidMount() {
		this.setState({ loading: true})
		// if (!localStorage.getItem('user')){
		// 	return this.setState({logged: false})
		// }
		try{
			const response = await fetch(USERS_URL)
			const { results } = await response.json()
			this.setState({authors: results})
		}catch(error){
			this.setState({error: true})
		}
		finally{
			this.setState({loading: false})
		}
		
	};

 	render() {
		const { authors, loading, error } = this.state
		if (loading){
			return <p>Loading...</p>
		}
		if(error){
			return <p>Error 500!</p>	
		}

		return (

			<Showcase keyFn={author => author.login.uuid} items={authors} render={author =>
				<Link to={`/profile/${author.login.uuid}`}>
					<Author details={author}>
						<button onClick={event => {
							event.preventDefault()
							// event.stopPropagation()
							alert('hola')
						}}>
							Saludar
						</button>
					</Author>	
				</Link>
			} />
		);
 	}
}

export default Authors
