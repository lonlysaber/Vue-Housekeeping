<template>
  <div class="keeper-list">
    <Recommend
      v-if="recommendItems.length !== 0"
      title=""
      :items="recommendItems"
      @click="serviceDetail"
    />
    <div class="noData" v-else>
        <p style="text-align: center;">暂无数据</p>
    </div>
  </div>
</template>
  
<script>
import Recommend from "../../components/home/Recommend";
import { keeperList } from "../../api/wechat";
export default {
  components: {
    Recommend,
  },
  data() {
    return {
      recommendItems: [],
      keeperType:''
    };
  },
  onShow() {
    
  },
  onLoad (options) {
    this.keeperType = options.id
    console.log(options)
    this.getUserRec({keeperType:this.keeperType});
  },
  methods: {
    getUserRec(data) {
        keeperList( data )
        .then((res) => {
          this.recommendItems = res.data;
          console.log(res);
        })
        .catch((error) => {
          console.log(error, "getUserRecError");
        });
    },
    serviceDetail(id) {
      mpvue.navigateTo({ url: "../keeperDetail/main?id=" + id });
    },
  },
};
</script>
  
<style lang="scss" scoped>
.keeper-list {
  padding: 10px;
}
.hello {
  color: red;
}
</style>
