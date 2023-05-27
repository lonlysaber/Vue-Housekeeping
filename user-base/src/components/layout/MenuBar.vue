<template>
  <van-tabbar active-color="#42b983" :active="active" @change="onChange">
    <van-tabbar-item name="home" icon="wap-home">{{ type==='user'?'首页':'消息' }}</van-tabbar-item>
    <van-tabbar-item name="class" icon="bars">{{ type==='user'?'分类':'预约日历' }}</van-tabbar-item>
    <van-tabbar-item name="mine" icon="manager">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'MenuBar',
  data () {
    return {
      active: 'home',
      type:'user',
    }
  },
  onShow () {

    this.type = this.$store.getters.type || 'user'
  },
  components: {},
  methods: {
    onChange (e) {
      this.active = e.mp.detail
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-bar {
  border-top: 0.5px solid rgb(150, 150, 150);
}
</style>
