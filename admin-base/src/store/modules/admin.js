import { login, logout, getInfo,update } from '@/api/admin'
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
      login({ adminName: username.trim(), adminPwd: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.adminId)
        
        setToken(data.adminId)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取管理员信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
        
      getInfo(state.token).then(response => {
        const data  = response.data
        if (!data) {
          return reject('验证失败，请尝试再次登录。')
        }

        const [name,avatar] = [data.adminName,data.adminPwd]

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  update({ commit},data) {
    return new Promise((resolve, reject) => {
      update(data).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updatePwd({ commit,state},data) {
    return new Promise((resolve, reject) => {
      console.log(state,data)
      const admin = {adminName:state.name,adminPwd:data.oldPwd}
      login(admin).then(res=>{
        console.log(res)
        // 密码验证成功
        if(res.code==200){
          const up = res.data
          up.adminPwd = data.newPwd
          update(up).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        }else{
          reject(err)
        }
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

