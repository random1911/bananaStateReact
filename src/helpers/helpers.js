export const generateDate = () => {
  const date = new Date()
  return Date.parse(date)
}
export const getPromise = (result, timeout = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(result)
    }, timeout)
  })
}