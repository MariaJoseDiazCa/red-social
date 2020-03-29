import React from 'react';
import Showcase from './Showcase';
import Author from './Author';

const USERS_URL = 'https://randomuser.me/api?seed=abc&results=100';

class Requests extends React.Component {
  state = {loading: true}
  async componentDidMount() {
    // TODO TryCatch para error 500
    const response = await fetch(USERS_URL)
    const { results: authors } = await response.json()
    const loggedUser = JSON.parse(localStorage.getItem('user'))
    const requests = (JSON.parse(
      localStorage.getItem('requests')
    ) || {}
    )[loggedUser.login.uuid] || []
    // )["9f07341f-c7e6-45b7-bab0-af6de5a4582d"] || []
    const authorsRequesting = requests.map(uuid =>
      authors.find(author => author.login.uuid === uuid)
    )
    this.setState({requests: authorsRequesting, loading: false})
  }
  render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }
    // TODO Controlar error 500
    return (
      <Showcase items={this.state.requests} keyFn={author => author.login.uuid} render={author =>
        <Author details={author}>
          <button onClick={() => this.accept(author)}>Accept</button>
          <button onClick={() => this.decline(author)}>Decline</button>
        </Author>
      } />
    )
  }
  accept = author =>  {
    const followers = JSON.parse(localStorage.getItem('followers')) || {} // "|| {}" significa que si no tiene valor por defecto es un objeto vacio.
    const loggedUser = JSON.parse(localStorage.getItem('user'))
    const currentFollowers = followers[loggedUser.login.uuid] || [] // "|| []" significa que si no tiene valor por defecto es un array vacio.
    followers[loggedUser.login.uuid] = [
      ...currentFollowers,
      author.login.uuid
    ]
    localStorage.setItem('followers', JSON.stringify(followers))
    this._removeRequest(author)
  }
  decline = author => {
    this._removeRequest(author)
    // const followers = JSON.parse(localStorage.getItem('followers')) || {}
    // const loggedUser = JSON.parse(localStorage.getItem('user'))
    // const currentFollowers = followers[loggedUser.login.uuid] || []
    // followers[loggedUser.login.uuid] = currentFollowers.filter(uuid => uuid !== author.login.uuid)
    // localStorage.setItem('followers', JSON.stringify(followers))
  }
  _removeRequest = author => {
    const requests = (JSON.parse(localStorage.getItem('requests'))) || {}
    const loggedUser = JSON.parse(localStorage.getItem('user'))
    const pendingRequests = requests[loggedUser.login.uuid] || []
    const filteredRequests = pendingRequests.filter(uuid => uuid !== author.login.uuid)
    requests[loggedUser.login.uuid] = filteredRequests
    localStorage.setItem('requests', JSON.stringify(requests))

    this.setState(previousState => ({
      requests: previousState.requests.filter(authorRequest => authorRequest !== author.login.uuid)
    }))
  }
}

export default Requests;