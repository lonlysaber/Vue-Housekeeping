<template>
  <div>
    <LoginForm ref="loginform" :isFail="isFail" @keeperLogin="handleLogin"  @userLogin="handleLogin"></LoginForm>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import LoginForm from "../../components/base/LoginForm";
import Toast from "vant-weapp/dist/toast/toast";

export default {
  data() {
    return {
      isFail:false
    };
  },
  components: {
    LoginForm,
  },
  methods: {
    handleLogin(e) {
      this.$store.dispatch(e.url,e).then(res=>{
        console.log(res)
        if(res.code==200){
            Toast.success("登录成功!")  
            mpvue.switchTab({
              url: "../index/main",
            });
        }else if(res.code==400){
          this.isFail = true
          
          // Toast.fail("登录失败，请重试");
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
