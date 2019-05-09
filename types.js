function pcb(...args) {
  if (args.length !== 7) {
    throw TypeError('Pcb format error')
  }

  const [
    pid, 
    name,
    arive,
    need,
    left,
    used,
    state
   ] = args

  return {
    pid, 
    name,
    arive,
    need,
    left,
    used,
    state
  }
}

module.exports = {
  pcb
}