import { reducers } from 'redux/core'


const open = (name, data) => reducers.modals.open({ name, data })

const close = reducers.modals.close

const update = (name, data) => reducers.modals.update({ name, data })


export default {
  open,
  close,
  update,
}
