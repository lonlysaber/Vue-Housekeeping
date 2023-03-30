const getters = {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    phone: state => state.user.phone,
    type: state=> state.user.type
  }
  export default getters
  