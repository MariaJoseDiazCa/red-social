import React from 'react';

import Author from './Author';
import Post from './Post';
import './Profile.css';

const SAMPLE_AUTHOR = {
    picture: {
        large: 'https://randomuser.me/api/portraits/women/28.jpg'
    },
    name: {
        first: 'Nombre',
        last: 'Apellido'
    },
    posts: [
        {date: new Date(), title: 'primero', content: 'contenido'},
        {date: new Date(), title: 'segundo', content: 'más posts!'}
    ]
}

    // componentDidMount () {
    //     fetch(USERS_URL)
    //     .then(response => response.json())
	// 	.then(({ results }) =>
	// 		results.find(author =>
	// 			author.login.uuid ===
	// 			this.props.match.params.uuid
    //         )
	// 	)
	// 	.then((details) => this.setState({ details }))
	// 	.finally(() => this.setState({loading: false}))
	// }

const USERS_URL = 'https://randomuser.me/api/?seed=abc&results=100';


class AuthorProfile extends React.Component {
	state = {following: false, details: {}, loading: true}
	constructor() {
	  super()
	  this.follow = this.follow.bind(this)
	}
	// igual que en Author.js, pero sin async-await
	componentDidMount() {
	  const loggedUser = JSON.parse(localStorage.getItem('user'))
	  fetch(USERS_URL)
		.then(response => response.json())
		.then(({results}) =>
		  results.find(author =>
			author.login.uuid === this.props.match.params.uuid
		  )
		)
		.then(details => {
			this.setState({ 
				details,
				posts: (
					JSON.parse(localStorage.getItem('posts')) || {}
				)[details.login.uuid] || [],
				following: ((
					JSON.parse(localStorage.getItem('followers')) || {}
				)[details.login.uuid] || []).includes(loggedUser.login.uuid),
				requested: ((
					JSON.parse(localStorage.getItem('requests')) || {}
				)[details.login.uuid] || []).includes(loggedUser.login.uuid)

			})
		})
		.catch(error => this.setState({errorLoading: error}))
		.finally(() => this.setState({loading: false}))
	}
	render() {
	  const {following, details, loading, errorLoading, posts, requested} = this.state
  
	  if (loading) {
		return <p>Loading...</p>
	  }
  
	  if (errorLoading) {
		return <p>Error 500!!!</p>
	  }
  
	  return (
		<div className='profile'>
		  <Author details={{
			...details,
			posts,
			following,
		  }}>
			{/* { this.props.match.params.uuid } */}
			<button onClick={() => this.props.history.goBack()}>Go back</button>
			{
			  !following && !requested &&
				<button onClick={this.follow}>Suscribirse</button>
			}
			{
				requested && !following &&
				<p>{details.name.first} aun no ha aceptado tu solicitud</p>
			}
		  </Author>
		</div>
	  )
	}
	follow() {
	  // TODO Actualmente el usuario puede volver a suscribirse. Habría que controlar que solo se suscriba una vez, y renderizar algún mensaje tipo "esperando aceptación"
	  // TODO La duplicidad se controla aquí
	  const loggedUser = JSON.parse(localStorage.getItem('user'))
	  const requests = JSON.parse(localStorage.getItem('requests')) || {}
	  const currentRequests = requests[this.state.details.login.uuid] || []
	  requests[this.state.details.login.uuid] = [
		...currentRequests,
		loggedUser.login.uuid
	  ]
	  // en esta ocasión si puede quedarse aquí, porque solo se subscribe una vez
	  localStorage.setItem(
		'requests',
		JSON.stringify(requests)
	  )
	  this.setState({requested: true})
	}
  }
export default AuthorProfile;