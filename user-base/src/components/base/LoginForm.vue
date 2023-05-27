<template>
  <div class="loginForm">
    <div class="login">
      <van-cell-group>
        <div class="topCell">
          <h1>登录</h1>
        </div>
        <van-field
          :value="phone"
          label="手机号码"
          placeholder="请输入手机号码"
          @change="changePhone"
        />
        <van-field
          :value="password"
          label="登录密码"
          type="password"
          password
          @change="changePassword"
        />
        <div class="bottonCell">
          <button
            @userLogin="userLogin"
            @click="userLogin"
            open-type="userLogin"
            class="login-confirm"
          >
            登录
          </button>
        </div>
        <div class="bottomCell">
          <p>注册</p>
        </div>
      </van-cell-group>
    </div>
    <div class="dialog">
      <van-dialog
        :async-close="true"
        use-slot
        v-if="isFail"
        title="登录失败，请重试 :("
        :show="isFail"
        @close="onClose"
      >
        <div class="evaluate-rate">
          <button @click="reLogin" class="login-confirm">重新登录</button>
        </div>
        <div class="evaluate-textarea">
          <button
            @keeperLogin="keeperLogin"
            @click="keeperLogin"
            class="login-confirm"
          >
            我是服务人员
          </button>
        </div>
      </van-dialog>
    </div>
    <van-toast id="van-toast" />
    <!-- <p>loginForm</p> -->
  </div>
</template>

<script >
export default {
  name: "loginform",
  props: {
    isFail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  onShow(){
    this.reLogin()

  },
  methods: {
    changePhone(event) {
      // event.mp.detail 为当前输入的值
      this.phone = event.mp.detail;
    },
    changePassword(event) {
      this.password = event.mp.detail;
    },
    userLogin(e) {
      const data = {
        userPhone: this.phone,
        userPwd: this.password,
        url:'user/userLogin'
      };
      
      this.$emit("userLogin", data);
    },
    onClose() {
      this.$emit("close");
    },
    reLogin() {
      this.phone = "";
      this.password = "";
      this.isFail = false;
    },
    keeperLogin() {
      const data = {
        keeperPhone: this.phone,
        keeperPwd: this.password,
        url:'user/keeperLogin'
      };
      this.$emit("keeperLogin", data);
    },
  },
};
</script>

<style scoped>
.loginForm {
  height: 100vh;
}
.loginForm .topCell {
  text-align: center;
  font-size: 24px;
  margin: 5px;
}
.loginForm .bottomCell {
  position: fixed;
  bottom: 0px;
  width: 100%;
}
.loginForm .bottomCell p {
  width: 80%;
  margin: 10px auto;
  text-align: center;
}
</style>
