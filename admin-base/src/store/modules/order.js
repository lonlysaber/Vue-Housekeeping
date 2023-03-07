import { getAllOrder,queryCondition,updateOrder,deleteOrder} from '@/api/order'

  import { resetRouter } from '@/router'
  
  
  const getDefaultState = () => {
    return {
    }
  }
  
  const state = getDefaultState()
  
  const mutations = {
    
  }
  
  const actions = {
    
    // 分页查询订单
    getAllOrder({commit},data){
      return new Promise((resolve,reject)=>{
          getAllOrder(data).then(res=>{
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
  
    // 修改订单信息
    updateOrder({commit},data){
      return new Promise((resolve,reject)=>{
        updateOrder(data).then(res=>{
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
  
    // 删除订单
    deleteOrder({commit},data){
      return new Promise((resolve,rejece)=>{
        deleteOrder(data).then(res=>{
          resolve(res)
        }).catch(err=>{
          rejece(err)
        })
      })
    },
  
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  
  