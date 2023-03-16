<template>
  <div class="recommend">
    <van-row>
      <van-col span="8">
        <div class="recommend-title">{{title}}</div>
      </van-col>
    </van-row>
    <van-row gutter="5">
      <van-col
        class="recommend-item"
        span="8"
        v-for="(item,index) in list"
        :key="index"
        @click="handleDetail(item.commodityID)"
      >
        <div>
          <van-image lazy-load height="90" width="90" fit="fill" :src="item.show" />
        </div>
        <div>
          <p class="recommend-item-name">{{item.name}}</p>
        </div>
      </van-col>
    </van-row>
    <van-row>
      <van-col class="recommend-bottom" offset="8" span="8">
        <van-button size="small" custom-style="border:0px;color:#42b983" @click="handleMore">查看更多</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'Recommend',
  props: {
    items: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {
    list: function () {
      const arr = this.items
      arr.forEach(obj => {
        const show = obj.show.split(',')[0]
        obj.show = show
      })
      if (arr.length > 3) {
        return arr.slice(0, 3)
      } else {
        return arr
      }
    }
  },
  methods: {
    handleDetail (id) {
      this.$emit('click', id)
    },
    handleMore (e) {
      this.$emit('more', this.title, this.items)
      mpvue.navigateTo({url: `../list/main?key=${this.title}`})
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  padding: 10px 0;
  .recommend-title {
    color: #42b983;
    font-size: 20px;
    padding: 12.5px 15px;
  }
  .recommend-item {
    text-align: center;
    padding-top:10px;
    .recommend-item-name {
      font-size: 13px;
      overflow: hidden;
    }
  }
  .recommend-bottom {
    text-align: center;
  }
}
</style>
