<template>
  <div>
    <!-- <SearchBar v-if="type == 'user'" disabled @on-click="toSearch" :key="''"/> -->
    <!-- <Recommend v-if="hotItems.length!==0" title="热门产品" :items="hotItems" @click="handleDetail"/> -->
    <div class="bottom">
      <HotCategory v-if="type == 'user'" :items="hotCategory" @click="categoryDetail" />
      <Recommend
        v-if="type == 'user'&&recommendItems.length !== 0"
        title="为你推荐"
        :items="recommendItems"
        @click="serviceDetail"
      />
      <!-- <Recommend v-if="newItems.length!==0" title="最新推出" :items="newItems" @click="handleDetail"/> -->
      <KeeperChart v-if="type == 'keeper'"></KeeperChart>
      <!-- <Baseline v-if="type == 'user'"/> -->
    </div>
  </div>
</template>

<script>
import SearchBar from "../../components/home/SearchBar";
import Banner from "../../components/home/Banner";
import HotCategory from "../../components/home/HotCategory";
import Recommend from "../../components/home/Recommend";
import Baseline from "../../components/base/Baseline";
import KeeperChart from "../../components/home/Chart";
import { hotRec } from "../../api/recommend";
import { userRec } from "../../api/recommend";
import { getToken } from "../../utils/token";
import { list } from "../../api/promotion";
import { check } from "../../utils/check";
import { index } from "../../api/search";

export default {
  components: {
    SearchBar,
    Banner,
    HotCategory,
    Recommend,
    Baseline,
    KeeperChart,
  },
  data() {
    return {
      promotionItems: [],
      hotCategory: [],
      hotItems: [],
      recommendItems: [
        {
          commodityID: 10001,
          show: "https://img.yzcdn.cn/vant/cat.jpeg",
          name: "王",
          service: "大扫除新",
          star: 5,
          price: "150",
        },
        {
          commodityID: 10002,
          show: "https://img.yzcdn.cn/vant/cat.jpeg",
          name: "王",
          service: "大扫除新",
          star: 5,
          price: "150",
        },
        {
          commodityID: 2,
          show: "https://img.yzcdn.cn/vant/cat.jpeg",
          name: "王",
          service: "大扫除新",
          star: 5,
          price: "150",
        },
        {
          commodityID: 3,
          show: "https://img.yzcdn.cn/vant/cat.jpeg",
          name: "王",
          service: "大扫除新",
          star: 5,
          price: "150",
        },
        {
          commodityID: 4,
          show: "https://img.yzcdn.cn/vant/cat.jpeg",
          name: "王",
          service: "大扫除新",
          star: 5,
          price: "150",
        },
      ],
      newItems: [],
      type: "",
      userId: 10001,
    };
  },
  onShow() {
    this.isGetToken();
    this.fetchData();
    this.type = this.$store.getters.type || "user";
    this.getHotRec();
    this.getUserRec(this.userId);
  },
  methods: {
    toSearch(e) {
      this.$router.push("../search/main");
    },
    isGetToken() {
      const token = this.$store.getters.token;
      if (token.length === 0) {
        // mpvue.redirectTo({url: '../login/main'})
      }
    },
    fetchData() {
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
    categoryDetail(id) {
      this.$router.push("../keeperList/main?id=" + id);
      console.log("tokeeperlist");
      // mpvue.navigateTo({url: '../keeperList/main?id=' + id})
    },
    serviceDetail(id) {
      mpvue.navigateTo({ url: "../keeperDetail/main?id=" + id });
    },
    getHotRec() {
      hotRec({})
        .then((res) => {
          this.hotCategory = res.data;
        })
        .catch((error) => {
          console.log(error, "getHotError");
        });
    },
    getUserRec(userId) {
      userRec({ userId })
        .then((res) => {
          this.recommendItems = res.data;
          // console.log(res);
        })
        .catch((error) => {
          console.log(error, "getUserRecError");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom {
  padding: 10px;
}
.hello {
  color: red;
}
</style>
