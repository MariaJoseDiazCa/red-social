import React, { Component } from 'react';
import './Authors.css'
import Showcase from './Showcase'
import Author from './Author'

const USERS_URL = 'https://randomuser.me/api/?seed=&results=100';

class Authors extends Component {
	constructor () {
		super()
		this.state = { authors: [], loading: false, error: false }
	}

	async componentDidMount() {
		this.setState({ loading: true})
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
		const { authors, loading,error } = this.state

		if (loading){
			return <p>Loading...</p>
		}
		if(error){
			return <p>Error 500!</p>	
		}
		

		return (
			<Showcase keyfn={author => author.login.uuid} items={authors} render={author =>
				<Author details={author}/>	
			} />
		);
 	}
}

export default Authors;
