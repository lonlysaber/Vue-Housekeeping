<template>
    <div>
      <Auth @getUserInfo="handleLogin"/>
      <van-toast id="van-toast" />
    </div>
</template>

<script>
import Auth from '../../components/base/Auth'
import { getUserInfo, login } from '../../api/wechat'
import Toast from 'vant-weapp/dist/toast/toast'

export default {
  data () {
    return {}
  },
  components: {
    Auth
  },
  methods: {
    handleLogin (e) {
      getUserInfo(
        (userInfo) => {
          login(userInfo,
            () => {
              console.log('登录成功')
              mpvue.switchTab({
                url: '../index/main'
              })
            },
            () => {
              Toast.fail('登录失败，请重试')
            })
        },
        (res) => {
          console.log(res)
          Toast.fail('获取用户信息失败')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
