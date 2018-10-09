import reducers from 'redux/reducers'
import init from './entry'


const initialState = {}
Object.keys(reducers).map((key) => initialState[key] = reducers[key].initialState)


init(initialState, true)
