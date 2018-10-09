export const initialState = {
  isUserLinking: false,
  isRequestLoaderVisible: false,
  closedPopups: {},
}

export const setUserLinking = (state, payload) => {
  return {
    ...state,
    isRequestLoaderVisible: payload,
    isUserLinking: payload,
  }
}

export const setRequestLoaderVisibility = (state, payload) => {
  return {
    ...state,
    isRequestLoaderVisible: payload,
  }
}

export const setClosedPopups = (state, payload) => {
  return {
    ...state,
    closedPopups: payload,
  }
}
