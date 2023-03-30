<template>
  <div class="profile-background">
    <div class="profile-avatar">
      <van-image round width="80" height="80" fit="cover" :src="src" />
    </div>
    <div class="profile-info"> 
      <div class="profile-name" @click="toMyDetail">{{nickName}}</div>
      <div class="profile-account">{{account}}</div>
    </div>
  </div>
</template>

<script>
import { query } from '../../api/customer'
import { getToken } from '../../utils/token'
export default {
  name: 'Profile',
  data () {
    return {
      src: 'https://img.yzcdn.cn/vant/cat.jpeg',
      nickName: '登录/注册',
      account: ''
    }
  },
  components: {},
  mounted () {
    this.fetchData()
  },
  onShow(){
    this.fetchData()
    // console.log('onshow')
  },
  beforeUpdate(){
    // this.fetchData()
    // console.log('onbeforeUpdate')

  },
  methods: {
    toMyDetail(){
      const token = this.$store.getters.token
      if(token==""){
        // 登录/注册
        mpvue.navigateTo({url: `../login/main`})
        this.fetchData()
      }else{
        mpvue.navigateTo({url: `../setting/profile/main`})
      }
    },
    fetchData () {
      const openid = this.$store.getters.token
      this.nickName = this.$store.getters.name
      this.account = this.$store.getters.phone
    },
  }
}
</script>

<style lang="scss" scoped>
.profile-background {
  display: flex;
  padding: 40px 30px;
  background: #3f4d8c;
  .profile-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    margin-left: 20px;
    font-size: 18px;
    font-weight: 800;
    .profile-name{
      margin-bottom: 6px;
    }
    .profile-account{
      width:150px;
      text-overflow:ellipsis;
      overflow: hidden;
      margin-top: 6px;
    }
  }
}
</style>
