import { login, logout, getInfo,
  getAllUser,queryCondition,getOrder,
  getAppointment,updateUser,deleteUser} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'


const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  // 更新状态
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 设置token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 设置名字
  SET_NAME: (state, name) => {
    state.name = name
  },

  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.userId)
        
        setToken(data.userId)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 分页查询用户
  getAllUser({commit},data){
    return new Promise((resolve,reject)=>{
        getAllUser(data).then(res=>{
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
    })
  },
  // 条件查询
  queryCondition({commit},data){
    return new Promise((resolve,reject)=>{
        queryCondition(data).then(res=>{
          
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {

      getInfo(state.token).then(response => {
        const { data } = response.data
        
        if (!data) {
          return reject('验证失败，请尝试再次登录。')
        }

        const [name, avatar ] = [data.userName,data.avatar]

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户订单
  getOrder({commit},data){
    return new Promise((resolve,reject)=>{
      getOrder(data).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  },

  // 获取用户预约
  getAppointment({commit},data){
    return new Promise((resolve,reject)=>{
      getAppointment(data).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  },

  // 修改用户信息
  updateUser({commit},data){
    return new Promise((resolve,reject)=>{
      updateUser(data).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  },

  // 删除用户
  deleteUser({commit},data){
    return new Promise((resolve,rejece)=>{
      deleteUser(data).then(res=>{
        resolve(res)
      }).catch(err=>{
        rejece(err)
      })
    })
  },

  // 登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

