<template>
  <div>
    <SearchBar v-if="type == 'user'" disabled @on-click="toSearch" :key="''"/>
    <!-- 轮播图 -->
    <Banner v-if="type == 'user'" :list="promotionItems" @click="handleDetail"/>
    <Recommend v-if="hotItems.length!==0" title="热门产品" :items="hotItems" @click="handleDetail"/>
    <Recommend v-if="recommendItems.length!==0" title="为你推荐" :items="recommendItems" @click="handleDetail"/>
    <Recommend v-if="newItems.length!==0" title="最新推出" :items="newItems" @click="handleDetail"/>
    <KeeperChart v-if="type == 'keeper'"></KeeperChart>
    <Baseline v-if="type == 'user'"/>
  </div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar'
import Banner from '../../components/home/Banner'
import Recommend from '../../components/home/Recommend'
import Baseline from '../../components/base/Baseline'
import KeeperChart from '../../components/home/Chart'
import { getToken } from '../../utils/token'
import { list } from '../../api/promotion'
import { check } from '../../utils/check'
import { index } from '../../api/search'

export default {
  components: {
    SearchBar,
    Banner,
    Recommend,
    Baseline,
    KeeperChart,
  },
  data () {
    return {
      promotionItems: [],
      hotItems: [],
      recommendItems: [],
      newItems: [],
      type:''
    }
  },
  onShow () {
    this.isGetToken()
    this.fetchData()
    this.type = this.$store.getters.type || 'user'
  },
  methods: {
    toSearch (e) {
      this.$router.push('../search/main')
    },
    isGetToken () {
      const token = this.$store.getters.token
      if (token.length === 0) {
        // mpvue.redirectTo({url: '../login/main'})
      }
    },
    fetchData () {
      // 获取主页轮播图
      // list().then(res => {
      //   this.promotionItems = check(res.data).filter(obj => {
      //     return obj.status === '已激活'
      //   })
      //   this.promotionItems.forEach(obj => {
      //     obj.url = obj.poster
      //   })
      // }).catch(err => {
      //   console.log(err)
      // })
      // index().then(res => {
      //   this.recommendItems = check(res.data.recommendItems)
      //   this.hotItems = check(res.data.hotItems)
      //   this.newItems = check(res.data.newItems)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    handleDetail (id) {
      mpvue.navigateTo({url: '../detail/main?id=' + id})
    }
  }
}
</script>

<style lang="scss" scoped>
.hello {
  color: red;
}
</style>
