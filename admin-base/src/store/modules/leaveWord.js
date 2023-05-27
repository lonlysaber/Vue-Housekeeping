import { getAllLeaveWord,queryCondition,updateLeaveWord,deleteLeaveWord} from '@/api/leaveWord'

  
  
  const getDefaultState = () => {
    return {
    }
  }
  
  const state = getDefaultState()
  
  const mutations = {
    
  }
  
  const actions = {
    
    // 分页查询订单
    getAllLeaveWord({commit},data){

      return new Promise((resolve,reject)=>{
          getAllLeaveWord(data).then(res=>{
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
    updateLeaveWord({commit},data){
      return new Promise((resolve,reject)=>{
        updateLeaveWord(data).then(res=>{
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
  
    // 删除订单
    deleteLeaveWord({commit},data){
      return new Promise((resolve,rejece)=>{
        deleteLeaveWord(data).then(res=>{
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
  
  