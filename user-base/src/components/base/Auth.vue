<template>
  <div class="auth-wrapper">
    <div class="auth-block">
      <div class="auth-logo">
        <van-image round width="100" height="100" src="/static/icon/logo.png" />
      </div>
      <div class="auth-info">小洛家政将会获取您的个人信息</div>
      <button @getuserinfo="getUserInfo" open-type="getUserInfo" class="auth-confirm">确认授权</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data () {
    return {}
  },
  components: {},
  methods: {
    getUserInfo (e) {
      this.$emit('getUserInfo', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #e4e4e4;
  .auth-block {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    background: white;
    margin: 50% 40px;
    border-radius: 30px;
    .auth-info {
      margin-bottom: 40px;
    }
    .auth-confirm {
      display: flexbox;
      width: 100%;
      text-align: center;
      background: #42b983;
      color: white;
      border-radius: 0  ;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
    }
  }
}
</style>
