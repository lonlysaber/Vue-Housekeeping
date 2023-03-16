<template>
  <div class="cover">
    <SearchBar :key="key" disabled @on-click="toSearch" />
    <div>
      <CommodityCard :items="items"/>
    </div>
    <div class="none" v-if="items.length===0">
      没有与搜索词相关的服务产品
    </div>
  </div>
</template>

<script>
import { index } from '../../api/search'
import { search } from '../../api/commodity'
import { check } from '../../utils/check'
import { sort } from '../../utils/sort'
import SearchBar from '../../components/home/SearchBar'
import CommodityCard from '../../components/base/CommodityCard'

export default {
  components: {SearchBar, CommodityCard},
  data () {
    return {
      key: '',
      items: []
    }
  },
  onLoad (options) {
    this.key = options.key
  },
  onShow () {
    this.fetchData()
  },
  methods: {
    toSearch () {
      this.$router.push('../search/main')
    },
    fetchData () {
      if (this.key === '热门产品' || this.key === '为你推荐' || this.key === '最新推出') {
        index().then(res => {
          this.items = this.key === '热门产品' ? check(res.data.hotItems)
            : this.key === '为你推荐' ? check(res.data.recommendItems)
              : check(res.data.newItems)
        }).catch(err => {
          console.log(err)
        })
      } else {
        search(this.key).then(res => {
          this.items = sort(this.key, res.data)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cover{
  background-color: #e5e5e5;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  overflow: auto;
  overscroll-behavior-y: contain;
  .none{
    color: white;
    text-align: center;
    margin-top:50%;
  }
}
</style>
