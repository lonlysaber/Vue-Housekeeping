export function setToken (val) {
  mpvue.setStorage({
    key: 'token',
    data: val
  })
}

export function getToken () {
  const token = mpvue.getStorageSync('token')
  return token
}
