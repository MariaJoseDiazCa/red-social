import React from 'react';

const USERS_URL = 'https://randomuser.me/api/?seed=&results=100';

class Login extends React.Component {
	state = { 
		hasChanges: false,
		user: '',
		password: '',
		error: false,
		loginError: false
	};

    render() {
		const {user, password, terms } = this.state;
        return(
            
			<form onSubmit={this.login}>
				<label>
					Usuario:&nbsp;
					<input name= 'user' value={user} onChange={this.update}/>
				</label>
				<label>
					Contraseña:&nbsp;
					<input name= 'password' type='password' value={password} onChange={this.update}/>
				</label>
				{/* <label>
					Acepto las condiciones
					<input name= 'terms' type='checkbox' value={terms} onChange={this.update}/>
				</label> */}
				<input type='submit' value='Login' disabled={this.state.busy ||
					!this.state.hasChanges}/>
				{
					this.state.error &&
					<p>El usuario o contraseña son requeridos</p>
				}
				{
					this.state.loginError &&
					<p>Usuario o contraseña incorrecto</p>
				}
			</form>
        )
	}

	update = event =>
		this.setState({
			error: false,
			loginError: false,
			hasChanges: true,
			[event.target.name]: event.target.type ==='checkbox'
				? event.target.checked
				: event.target.value
		})
	updateUser = event => this.setState({ user: event.target.value});
	updatePassword = event => this.setState({password: event.target.value});
	
	login = async event => {
		//Libreria Joi para validar casos reales.
		event.preventDefault()
		const {user, password} = this.state;
		if (user.trim().length === 0 || password.trim().length === 0){
			return this.setState({error: true, hasChanges: false})
		}
		this.setState({busy: true})
		const response = await fetch(USERS_URL);
		const {results: users} = await response.json();
		const found =users.find(candidate =>
			candidate.login.username === user &&
			candidate.login.password === password
		)
		this.setState({ busy: false})
		if (!found) {
			return this.setState({loginError: true})
		}
		this.props.onLogin(found)
		//alert(JSON.stringify(found))
	}
}
export default Login;