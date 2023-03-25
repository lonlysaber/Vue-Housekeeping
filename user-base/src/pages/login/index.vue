<template>
  <div>
    <LoginForm @userLogin="handleLogin"></LoginForm>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import LoginForm from "../../components/base/LoginForm";
import Toast from "vant-weapp/dist/toast/toast";

export default {
  data() {
    return {};
  },
  components: {
    LoginForm,
  },
  methods: {
    handleLogin(e) {
      this.$store.dispatch('user/login',e).then(res=>{
        console.log(res)
        if(res.code==200){
            Toast.success("登录成功!")  
            mpvue.switchTab({
              url: "../index/main",
            });
          }else if(res.code==400){
            Toast.fail("登录失败，请重试");
          }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
