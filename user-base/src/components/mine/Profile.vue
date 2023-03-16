<template>
  <div class="profile-background">
    <div class="profile-avatar">
      <van-image round width="80" height="80" fit="cover" :src="src" />
    </div>
    <div class="profile-info">
      <div class="profile-name">{{nickName}}</div>
      <div class="profile-account">{{account}}</div>
    </div>
  </div>
</template>

<script>
import { query } from '../../api/customer'
export default {
  name: 'Profile',
  data () {
    return {
      src: 'https://img.yzcdn.cn/vant/cat.jpeg',
      nickName: '',
      account: ''
    }
  },
  components: {},
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const openid = mpvue.getStorageSync('openid')
      query(openid).then(res => {
        this.src = res.data.avatar
        this.nickName = res.data.nickName
        this.account = res.data.customerID
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-background {
  display: flex;
  padding: 40px 30px;
  background: #42b983;
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
