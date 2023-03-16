<template>
  <div class="mine-order-menu">
    <van-grid>
      <van-grid-item  border="false" icon="gold-coin" text="待付款" url="../order/main?tab=1"/>
      <van-grid-item  border="false" icon="point-gift" text="待服务" url="../order/main?tab=2"/>
      <van-grid-item  border="false" icon="star" text="待评价" url="../order/main?tab=3"/>
      <van-grid-item  border="false" icon="column" text="全部订单" url="../order/main?tab=4"/>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'OrderMenu',
  data () {
    return {}
  },
  methods: {
    onClick (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
