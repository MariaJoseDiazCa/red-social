import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { incr, decr, add } from './reduxStore'
import PropTypes from 'prop-types'


// const AddRandomQuantity = connect(
// 	null, 
// 	dispatch => ({
// 		onAdd: qty => dispatch(add(qty))
// 	})
// )(class extends React.Component {
// 	state = { value: 0}
// 	render () {
// 		const { value } = this.state
// 		return (
// 			<div>
// 				<input value ={value} onChange={this.update}/>
// 				<button onClick={this.addQuantity}>ADD</button>
// 			</div>
// 		)
// 	}
// 	update = event => this.setState({value: Number
// 	(event.target.value)})
// 	addQuantity = () =>
// 		this.props.onAdd(this.state.value)
// })

//VERSION CON HOOKS

const AddRandomQuantity = connect(
	null,
	dispatch => ({onAdd: qty => dispatch(add(qty))})
)(props => {
	const [value, updateValue ] = useState(0)
	const [currentTime, updateTime ] = useState(new Date())
	useEffect(() => {
		const interval = setInterval(
			() => updateTime(new Date()),
			1000
		)
		return () => clearInterval(interval)
	}
	)

	return (
		<div>
			<input value ={value} onChange={event => updateValue(Number(event.target.value))}/>
			<button onClick={() => props.onAdd(value)}>ADD</button>
			<p>Ahora son las {currentTime.toString()}</p>
		</div>
	)
})

const Contador = props =>
    <div>
        <p>El valor del contador es {props.contador}</p>
        <button onClick={props.inc}>+</button>
        <button onClick={props.dec}>-</button>
		<AddRandomQuantity/>
    </div>

Contador.propTypes = {
	contador: PropTypes.number.isRequired,
	inc: PropTypes.func.isRequired,
	dec: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
	inc: () => dispatch(incr()),
	dec: () => dispatch(decr())
})

const mapStateToProps = state => ({
	contador: state.count
})

// const ConnectedContador = connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(Contador)
// export default ConnectedContador

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Contador)
