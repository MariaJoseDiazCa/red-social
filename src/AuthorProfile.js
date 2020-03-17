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
class AuthorProfile extends React.Component {
    state = { following: false };
	render () {
        const {following} = this.state;
		return (
			<div className='profile'>
				<Author details={{
                    ...SAMPLE_AUTHOR,
                     following
                }}>
                {
                    !following &&
                    <button onClick={this.follow}>Subscribe</button>
                }       
                </Author>
			</div>
		)
    }
    follow = () =>
        this.setState({following: true});

}
export default AuthorProfile;