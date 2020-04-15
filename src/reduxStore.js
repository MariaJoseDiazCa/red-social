import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

//FSA = FLUX STANDARD ACTION

const rootReducer = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCR':
            return {...state, count: state.count + 1}
        case 'DECR':
            return {...state, count: state.count - 1}
        case 'ADD':
            return {...state, count: state.count + action.payload.qty}
        default:
            return state
    }
}
//version sincrona
// const add = qty => ({type: 'ADD', payload: {qty}})

// version asincrona con thunk
const ADD_TYPE = "ADD"
const add = qty => dispatch => {
    setTimeout(
        () => dispatch({type: ADD_TYPE, payload: { qty } }),
        3000
    )
}


const incr = () => ({type: 'INCR'})
const decr = () => ({type: 'DECR'})


// window.add = add

// window.boundAdd = qty => store.dispatch(add(qty))

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

store.subscribe(() => console.log('debug: ', store.getState()))

export default store

export {add, incr, decr}