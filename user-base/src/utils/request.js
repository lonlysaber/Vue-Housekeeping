const { getToken } = require('./token')
const Fly = require('flyio/dist/npm/wx')

const fly = new Fly()

fly.interceptors.request.use((request) => {
  if (getToken) {
    request.headers['Authorization'] = `Bearer ${getToken()}`
  }
  return request
})

fly.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    return err
  })

function handleError (err) {
  console.log(err)
}

export function get (url, params = {}, baseUrl = 'https://yaoluolong.xyz:18082') {
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.get(baseUrl + url, params).then(response => {
        resolve(response)
      }).catch(err => {
        console.log(err)
        handleError(err)
        reject(err)
      })
    })
  }
}

export function post (url, params = {}) {
  const baseUrl = 'https://yaoluolong.xyz:18082'
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.post(baseUrl + url, params).then(response => {
        resolve(response)
      }).catch(err => {
        console.log(err)
        handleError(err)
        reject(err)
      })
    })
  }
}
