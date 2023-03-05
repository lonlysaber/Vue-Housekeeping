import { login, logout, getInfo,
    getAllKeeper,queryCondition,getOrder,
    getAppointment,updateKeeper,deleteKeeper} from '@/api/keeper'
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
    login({ commit }, keeperInfo) {
      const { keepername, password } = keeperInfo
      return new Promise((resolve, reject) => {
        login({ keepername: keepername.trim(), password: password }).then(response => {
          const { data } = response
          commit('SET_TOKEN', data.keeperId)
          
          setToken(data.keeperId)
  
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 分页查询用户
    getAllKeeper({commit},data){
      return new Promise((resolve,reject)=>{
          getAllKeeper(data).then(res=>{
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
  
          const [name, avatar ] = [data.keeperName,data.avatar]
  
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
    updateKeeper({commit},data){
      return new Promise((resolve,reject)=>{
        updateKeeper(data).then(res=>{
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
  
    // 删除用户
    deleteKeeper({commit},data){
      return new Promise((resolve,rejece)=>{
        deleteKeeper(data).then(res=>{
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
  
  