<template>
  <div>
    <div style="margin:5px 0" v-for="(item,index) in items" :key="index">
      <van-card
        lazy-load
        :price="item.price"
        :origin-price="item.promotionPrice"
        :tag="item.promotionPrice===''||item.promotionPrice===null?'':'促销中'"
        :desc="item.className"
        :title="item.name"
        :thumb="item.show"
        thumb-mode="fit"
      >
        <div slot="footer">
          <van-button type="primary" size="mini" @click="handleDetail(item.commodityID)">查看详情</van-button>
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
    return {}
  },
  computed: {
    list () {
      const arr = this.items
      if (arr.length !== 0) {
        arr.forEach(obj => {
          obj.show = obj.show.split(',')[0]
        })
      }
      return arr
    }
  },
  methods: {
    handleDetail (id) {
      mpvue.navigateTo({url: '../detail/main?id=' + id})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
