<template>
  <div>
    <van-tree-select main-active-class="selected-tab" :items="items" :main-active-index="mainActiveIndex" @clickNav="onClickNav">
      <div slot="content">
        <div v-if="children.length===0" class="nodata">暂无数据</div>
        <CommodityCard v-else :items="children" />
      </div>
    </van-tree-select>
  </div>
</template>

<script>
import { classList, sortCommodity } from '../../api/commodity'
import { check } from '../../utils/check'
import CommodityCard from '../../components/base/CommodityCard'

export default {
  components: {
    CommodityCard
  },
  data () {
    return {
      items: [],
      children: [],
      mainActiveIndex: 0
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      classList()
        .then(res => {
          const classList = check(res.data)
          this.items = classList.map(obj => {
            const text = obj.className
            const key = obj.key
            return {
              text,
              disabled: false,
              key
            }
          })
          this.fetchList(this.items[0].text)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchList (className) {
      sortCommodity(className)
        .then(res => {
          this.children = check(res.data)
          this.children.forEach(obj => {
            obj.show = obj.show.split(',')[0]
          })
          console.log()
        })
        .catch(err => {
          console.log(err)
        })
    },
    onClickNav (e) {
      const { index } = e.mp.detail
      const className = this.items[index].text
      this.fetchList(className)
    },
    onClickItem () {}
  }
}
</script>

<style lang="scss" scoped>
.nodata{
  text-align: center;
  margin-top:50%;
}
</style>
