import React from 'react';
import Author from './Author';
import Post from './Post';
import AddPost from './AddPost';
import './Profile.css';
import LoginContext from './LoginContext';
import withUser from './withUser';

class Profile extends React.Component {
	state = { showingForm: false }
	render() {
		const { user } = this.props
	  return (
		  <LoginContext.Consumer>
			   {
				  ({logged, addPost, posts}) =>
					<div className='profile'>
						<Author details={{
							...user,
							posts: posts[user.login.uuid],
							following: true
						}}>
							<button onClick={this.showForm}>Add post</button>
							{
							this.state.showingForm && <AddPost onCancel={this.hideForm} onSubmit={post =>{
								addPost(post)
								this.hideForm()
							}}/>
							}
						</Author>
					</div>
			    }
		  </LoginContext.Consumer>

	  )
	}

	showForm = () => {
	  this.setState({showingForm: true})
	}
	hideForm = () => {
	  this.setState({showingForm: false})
	}
	
}
	
  export default withUser(Profile);
    
