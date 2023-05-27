import { userLogin, keeperLogin} from '@/api/wechat'
import { getToken, setToken, removeToken } from '@/utils/auth'
  
  
  const getDefaultState = () => {
    return {
      token: '',
      name: '登录/注册',
      avatar: '',
      phone:'',
      type:''
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
    // 设置电话号码
    SET_PHONE: (state, phone) => {
        state.phone = phone
    },
  
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_TYPE: (state, type) => {
      state.type = type
    }
  }
  
  const actions = {
    // 登录
    userLogin({ commit }, userInfo) {
        const [userPhone, userPwd]   = [userInfo.userPhone,userInfo.userPwd]
        return new Promise((resolve, reject) => {
        userLogin({ userPhone: userPhone.trim(), userPwd: userPwd }).then(response => {
          const { data } = response
          commit('SET_TOKEN', data.userId)
          commit('SET_NAME',data.userName)
        commit('SET_AVATAR',data.userAvatar)

          commit('SET_PHONE',data.userPhone)
          commit('SET_TYPE','user')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
    })
    },

    keeperLogin({ commit }, keeperInfo) {
      const [keeperPhone, keeperPwd]   = [keeperInfo.keeperPhone,keeperInfo.keeperPwd]
      return new Promise((resolve, reject) => {
      keeperLogin({ keeperPhone: keeperPhone.trim(), keeperPwd: keeperPwd }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.keeperId)
        commit('SET_NAME',data.keeperName)
        commit('SET_AVATAR',data.keeperAvatar)
        
        commit('SET_PHONE',data.keeperPhone)
        commit('SET_TYPE','keeper')
        resolve(response)
      }).catch(error => {
        reject(error)
      })
  })
  },
  
    // 登出
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
          commit('RESET_STATE')
          resolve()
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
  
  