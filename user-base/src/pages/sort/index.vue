<template>
  <div class="sort">
    <van-tree-select
      main-active-class="selected-tab"
      :items="items"
      :main-active-index="mainActiveIndex"
      @click-nav="onClickNav"
      @clickItem="onClickItem"
      >
      <!-- @click-nav="onClickNav($event)" -->
      <!-- @click="selectChange($event)" -->
      <div slot="content">
        {{ index }}
      </div>
      <div slot="content">
        <div v-if="children.length === 0" class="nodata">暂无数据</div>
        <CommodityCard v-else :items="children" />
      </div>
    </van-tree-select>
  </div>
</template>

<script>
import { classList, sortCommodity } from "../../api/commodity";
import { check } from "../../utils/check";
import CommodityCard from "../../components/base/CommodityCard";

export default {
  components: {
    CommodityCard,
  },
  data() {
    return {
      items: [],
      children: [],
      mainActiveIndex: 0,
      index:0,
    };
  },
  mounted() {
    this.fetchData();
  },
 
  methods: {
    // 获取分类数据
    fetchData() {
      classList()
        .then((res) => {
          const classList = check(res.data);
          this.items = classList.map((obj) => {
            const text = obj.serviceBigType;
            const key = obj.serviceId;
            const children = obj.serviceSmallType;
            return {
              text,
              disabled: false,
              key,
              children,
            };
          });
          // this.fetchList(this.items[0].text)
          this.children = this.items[0].children;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onClickNav(e) {
      this.index  = e.mp.detail
      console.log(e)
  
      console.log(this.children);
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
  height: 100%;
}
.sort .van-tree-select {
  height: 100% !important;
}
.nodata {
  text-align: center;
  margin-top: 50%;
}
</style>
