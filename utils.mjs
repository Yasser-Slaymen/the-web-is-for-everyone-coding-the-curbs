// the module we want to import

const flip = (str) => {
    // str = up(str)
    return str.split('').reverse().join('')
}
const up = (str) => {
    return str.toLocaleUpperCase()
}
export {flip, up}