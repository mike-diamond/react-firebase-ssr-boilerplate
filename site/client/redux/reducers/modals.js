export const initialState = []

export const open = (state, { name, data = {} }) => {
  const newState = [ ...state ]

  newState.push({ name, data })

  return newState
}

export const close = (state, payload /* name */) => {
  return ([ ...state ]).filter(({ name }) => name !== payload)
}

export const update = (state, { name, data = {} }) => {
  const newState = ([ ...state ]).map((modal) => {
    if (modal.name === name) {
      return {
        name,
        data,
      }
    }

    return {
      ...modal
    }
  })
}
