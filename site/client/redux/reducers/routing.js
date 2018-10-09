const initialState = {
  locationBeforeTransitions: null,
}

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case '@@router/LOCATION_CHANGE':
      return { ...state, locationBeforeTransitions: payload }
    default:
      return state
  }
}
