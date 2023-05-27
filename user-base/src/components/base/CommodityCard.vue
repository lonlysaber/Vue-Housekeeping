<template>
  <div>
    <div style="margin:5px 0" v-for="(item,index) in items" :key="index">
      <van-card
        :title="item.title"
        >
        <div slot="footer">
          <van-button type="primary" size="mini" @click="handleDetail(item.id)">查看详情</van-button>
        </div>
      </van-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommodityCard',
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      
    }
  },
  computed: {
    list () {
      const arr = this.items
      return arr
    }
  },
  watch:{
    children:{
      handler(){
        // this.items = this.children
      },
      deep:true,
      immediate:true
      
    }
  },
  methods: {
    handleDetail (id) {
      // console.log(parseInt(id)+10000 )
      this.$router.push("../keeperList/main?id=" + (parseInt(id)+10000 ));
      // mpvue.navigateTo({url: '../detail/main?id=' + id})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
