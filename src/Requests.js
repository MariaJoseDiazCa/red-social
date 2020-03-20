import React from 'react';

import Showcase from './Showcase';
import Author from './Author';

const SAMPLE_REQUESTS = [
    {
        uuid: '21343678',
        name: {
            first: 'nombre',
            last: 'Apellidos'
        },
        picture: {
            large: 'https://randomuser.me/api/portraits/women/28.jpg'

        }
	},
	{
        uuid: '234567865',
        name: {
            first: 'nombre',
            last: 'Apellidos'
        },
        picture: {
            large: 'https://randomuser.me/api/portraits/women/28.jpg'

        }
	},
	{
        uuid: '445533535',
        name: {
            first: 'nombre',
            last: 'Apellidos'
        },
        picture: {
            large: 'https://randomuser.me/api/portraits/women/28.jpg'

        }
    }
];

const RequestsUI = props =>
    <Showcase items={props.requests} keyFn={
        author => author.uuid} render={author => 
        <Author details={author}>
            <button onClick={() => props.onAccept(author)}>Accept</button>
            <button onClick={() => props.onDecline(author)}>Decline</button>
        </Author>
    }/>

class Requests extends React.Component {
	state = {requests: SAMPLE_REQUESTS};
	render() {
		return (
		<RequestsUI requests=
			{this.state.requests} 
			onAccept={this.accept}
			onDecline={this.decline}
		/>
		)
	}
	accept = author => 
		this.setState(previousState => ({
			requests: previousState.requests.filter
			(otherAutor =>
				 otherAutor.uuid !== author.uuid
			)
		}))
	decline = author => this.accept(author);
}
export default Requests;