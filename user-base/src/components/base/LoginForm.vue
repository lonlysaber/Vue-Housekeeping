<template>
  <div class="loginForm">
    <van-cell-group>
        <div>登录</div>
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
        @change="changePassword"
      />
      <div class="bottonCell">
        <button @userLogin="userLogin" @click="userLogin" open-type="userLogin" 
        class="login-confirm">登录</button>
      </div>
    </van-cell-group> 
    <!-- <p>loginForm</p> -->
  </div>
</template>

<script >

export default {
  name: "loginform",
  data() {
    return {
      phone: "",
      password:"",
    };
  },
  methods: {
    changePhone(event) {
      // event.mp.detail 为当前输入的值
      this.phone = event.mp.detail
    },
    changePassword(event){
      this.password = event.mp.detail
    },
    userLogin (e) {
        const data ={
            userPhone:this.phone,
            userPwd:this.password
        }
        console.log(data)
      this.$emit('userLogin', data)
    }
  },
};
</script>

<style scoped>
</style>
