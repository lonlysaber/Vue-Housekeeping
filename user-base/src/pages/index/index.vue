<template>
  <div>
    <SearchBar disabled @on-click="toSearch" :key="''"/>
    <Banner :list="promotionItems" @click="handleDetail"/>
    <Recommend v-if="hotItems.length!==0" title="热门产品" :items="hotItems" @click="handleDetail"/>
    <Recommend v-if="recommendItems.length!==0" title="为你推荐" :items="recommendItems" @click="handleDetail"/>
    <Recommend v-if="newItems.length!==0" title="最新推出" :items="newItems" @click="handleDetail"/>
    <Baseline />
  </div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar'
import Banner from '../../components/home/Banner'
import Recommend from '../../components/home/Recommend'
import Baseline from '../../components/base/Baseline'
import { getToken } from '../../utils/token'
import { list } from '../../api/promotion'
import { check } from '../../utils/check'
import { index } from '../../api/search'

export default {
  components: {
    SearchBar,
    Banner,
    Recommend,
    Baseline
  },
  data () {
    return {
      promotionItems: [],
      hotItems: [],
      recommendItems: [],
      newItems: []
    }
  },
  onShow () {
    this.isGetToken()
    this.fetchData()
  },
  methods: {
    toSearch (e) {
      this.$router.push('../search/main')
    },
    isGetToken () {
      const token = getToken()
      if (token.length === 0) {
        mpvue.redirectTo({url: '../login/main'})
      }
    },
    fetchData () {
      list().then(res => {
        this.promotionItems = check(res.data).filter(obj => {
          return obj.status === '已激活'
        })
        this.promotionItems.forEach(obj => {
          obj.url = obj.poster
        })
      }).catch(err => {
        console.log(err)
      })
      index().then(res => {
        this.recommendItems = check(res.data.recommendItems)
        this.hotItems = check(res.data.hotItems)
        this.newItems = check(res.data.newItems)
      }).catch(err => {
        console.log(err)
      })
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
