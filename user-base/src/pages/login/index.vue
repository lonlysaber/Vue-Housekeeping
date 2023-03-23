<template>
  <div>
    <!-- <Auth @getUserInfo="handleLogin"/> -->
    <!-- <van-toast id="van-toast" /> -->
    <LoginForm @userLogin="handleLogin"></LoginForm>
  </div>
</template>

<script>
import Auth from "../../components/base/Auth";
import LoginForm from "../../components/base/LoginForm";
import { getUserInfo, login } from "../../api/wechat";
import Toast from "vant-weapp/dist/toast/toast";
import Notify from "vant-weapp/dist/notify/notify";

export default {
  data() {
    return {};
  },
  components: {
    Auth,
    LoginForm,
  },
  methods: {
    handleLogin(e) {
      // console.log(e)
      login(e)
        .then((res) => {
          console.log("登录成功");
          mpvue.setStorage({
            key: "token",
            data: res.data.userId,
          });
          mpvue.switchTab({
            url: "../index/main",
          });
        })
        .catch((err) => {
          Toast.fail("登录失败，请重试");
        });
    },
    // ) }
  },
};
</script>

<style lang="scss" scoped>
</style>
