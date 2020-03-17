import React from 'react';
import Author from './Author';
import Post from './Post';
import AddPost from './AddPost';
import './Profile.css';

const SAMPLE_AUTHOR = {
    picture: {
        large: 'https://randomuser.me/api/portraits/women/28.jpg'
    },
    name: {
        first: 'Nombre',
        last: 'Apellido'
    }
}
class Profile extends React.Component {
	constructor() {
		super()
		this.state = {showingForm: false, posts: []}
		this.showForm = this.showForm.bind(this)
		this.hideForm = this.hideForm.bind(this)
	}
	render () {
		return (
			<div className='profile'>
				<Author details={{
					...SAMPLE_AUTHOR,
					posts: this.state.posts,
					following:true
				}}>
				<button onClick={this.showForm}>Add Post</button>
				{
					this.state.showingForm &&
					<AddPost onSubmit={this.addPost.bind(this)} onCancel={this.hideForm}/>
				}
				</Author>
			
			</div>
		)
	}
	showForm () {
		this.setState({ showingForm: true })
	}
	hideForm () {
		this.setState({ showingForm: false})
	}
	addPost (post) {
		post.date = new Date()
		this.setState(previousState =>{
			return {
				...previousState, 
				posts: [
					post,
					...previousState.posts,
				]
			}
		})
		this.hideForm()
	}

}
export default Profile;
    
