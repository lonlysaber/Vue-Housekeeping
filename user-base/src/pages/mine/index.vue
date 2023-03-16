<template>
  <div class="mine">
    <Profile />
    <OrderMenu />
    <Cell />
  </div>
</template>

<script>
import Profile from '../../components/mine/Profile'
import OrderMenu from '../../components/mine/OrderMenu'
import Cell from '../../components/mine/Cell'

export default {
  data () {
    return {}
  },
  components: {
    Profile, OrderMenu, Cell
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.mine{
  background-color: #e5e5e5;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  overflow: auto;
  overscroll-behavior-y: contain;
}
</style>
