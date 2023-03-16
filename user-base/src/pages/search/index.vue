<template>
  <div class="cover">
    <SearchBar @on-confirm="onConfirm"/>
    <div class="hot">
      <div class="title">热门搜索</div>
      <div class="content">
        <div class="tag" v-for="(item,index) in hotTags" :key="index" @click="handleDetail(item.commodityID)">
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="history" v-if="historyTags.length!==0">
      <div class="title">历史搜索</div>
      <div class="content">
        <div class="tag" v-for="(item,index) in historyTags" :key="index" @click="handleSearch(item)">
          {{item}}
        </div>
      </div>
      <div class="clear" @click="clearHistory">清空历史记录</div>
    </div>
  </div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar'
import { index } from '../../api/search'
import { check } from '../../utils/check'

export default {
  components: { SearchBar },
  data () {
    return {
      hotTags: [],
      historyTags: []
    }
  },
  onShow () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      index().then(res => {
        const items = check(res.data.hotItems)
        if (items.length <= 10) {
          this.hotTags = items
        } else {
          this.hotTags = items.slice(0, 11)
        }
      }).catch(err => {
        console.log(err)
      })
      const history = mpvue.getStorageSync('history')
      this.historyTags = history
    },
    onConfirm (key) {
      console.log(key)
      const history = mpvue.getStorageSync('history')
      if (history) {
        if (history.includes(key)) {
          mpvue.redirectTo({url: `../list/main?key=${key}`})
        } else {
          history.push(key)
          mpvue.setStorage({
            key: 'history',
            data: history,
            success: () => {
              mpvue.redirectTo({url: `../list/main?key=${key}`})
            }
          })
        }
      } else {
        mpvue.setStorage({
          key: 'history',
          data: [key],
          success: () => {
            mpvue.redirectTo({url: `../list/main?key=${key}`})
          }
        })
      }
    },
    handleDetail (id) {
      console.log(id)
      mpvue.navigateTo({url: '../detail/main?id=' + id})
    },
    handleSearch (key) {
      mpvue.redirectTo({url: `../list/main?key=${key}`})
    },
    clearHistory () {
      mpvue.removeStorageSync('history')
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.cover {
  background-color: white;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  overflow: auto;
  overscroll-behavior-y: contain;
}
.title{
  padding: 10px;
  color: #a5a5a5;
}
.clear{
  padding: 10px;
  color: #4593ec;
}
.content{
  display: flex;
  .tag{
    background: #a5a5a5;
    color:white;
    border-radius: 20px;
    padding:4px 10px;
    margin:5px 10px;
  }
}
</style>
