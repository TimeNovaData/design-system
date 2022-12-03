import mitt from 'mitt'

const emitter = mitt()
window.emitter = emitter
export default emitter
