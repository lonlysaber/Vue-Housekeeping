<template>
  <div class="sort">
    
    <van-tree-select
      v-if="type == 'user'"
      :items="items "
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @clickNav="clickNav"
      @click-item="onClickItem"
    >
      <div slot="content">
        <div v-if="children.length === 0" class="nodata">暂无数据</div>
        <CommodityCard v-else :items="children" />
      </div>
    </van-tree-select>
    <Appointment v-else></Appointment>
  </div>
</template>

<script>
import { classList, sortCommodity } from "../../api/commodity";
import { check } from "../../utils/check";
import CommodityCard from "../../components/base/CommodityCard";
import Appointment from "../../components/base/Appointment";

export default {
  components: {
    CommodityCard,
    Appointment
  },
  data() {
    return {
      items: [],
      children: [],
      mainActiveIndex: 0,
      index:0,
      activeId:[],
      type:'user'
    };
  },
  mounted() {
    this.fetchData();
  },
  onShow(){
    this.type = this.$store.getters.type || 'user'
  },
  methods: {
    onClick(e){
      console.log(e,this.activeId)

    },
    // 获取分类数据
    fetchData() {
      classList().then((res) => {
          const classList = check(res.data);
          let idx = 1
          this.items = classList.map((obj) => {
            const text = obj.serviceBigType;
            const key = idx;
            const children = obj.serviceSmallType.map(item=>{
              let id = idx++;
              let title = item;
              return{
                id,title
              }
            });
            return {
              text,
              disabled: false,
              key,
              children,
            };
          });
          console.log(this.items)
          // this.fetchList(this.items[0].text)
          this.children = this.items[0].children;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clickNav(e) {
      this.index  = e.mp.detail.index
      this.mainActiveIndex = this.index
      this.children =  this.items[this.index].children
  
    },
    onClickItem() {
      console.log('clickitem')
      return null;
    },
    selectChange(e){
      console.log(e)
    }
  },
};
</script>

<style lang="scss">
.sort {
  height: 100vh;
  background-color: #fafafa;
}
.sort .van-tree-select {
  height: 100% !important;
}
.nodata {
  text-align: center;
  margin-top: 50%;
}
</style>
