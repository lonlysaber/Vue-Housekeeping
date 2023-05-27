<template>
  <div class="hot-category">
    <div
      class="hot-category-item"
      v-for="(item, index) in list"
      :key="index"
      @click="handleDetail(item.serviceId)"
    >
      <div class="hot-category-item-namebox">
        <p class="hot-category-item-name">{{ item.serviceSmallType }}</p>
      </div>
    </div>
  </div>
</template>
  
<script>
import { getTextIcon } from "../../api/order";
export default {
  name: "HotCategory",
  props: {
    items: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  computed: {
    list: function () {
      const arr = this.items;
      if (arr.length > 4) {
        return arr.slice(0, 4)
      } else {
        return arr
      }
    },
  },
  methods: {
    handleDetail(id) {
      this.$emit("click", id);
    },
  },
};
</script>
  
<style lang="scss" scoped>
.hot-category {
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  .hot-category-item {
    // text-align: center;
    // padding-top: 10px;
    .hot-category-item-namebox {
      margin: auto;
      width: 45px;
      height: 45px;
      background-color: antiquewhite;
      border-radius: 5px;
    }
    .hot-category-item-name {
      font-size: 16px;
      width: 35px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      // background-color: antiquewhite;
      overflow: hidden;
    }
  }

  .hot-category-bottom {
    text-align: center;
  }
}
</style>
