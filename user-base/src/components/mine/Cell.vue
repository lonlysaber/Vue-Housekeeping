<template>
  <div class="cell">
    <div class="cell-group">
      <van-group>
      <van-cell title="个人信息" url="../setting/profile/main" is-link icon="friends"/>
      <van-cell title="服务地址" url="../setting/address/main" is-link icon="map-marked"/>
    </van-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cell',
  data () {
    return {}
  },
  components: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.cell{
  margin:10px 0;
  .cell-group{
    margin:10px 0
  }
}
</style>
