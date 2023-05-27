<template>
  <div class="leaveWord">
    <div class="add">
      <!-- <button @click="add">新增留言</button> -->
    </div>
    <div class="leaveWordList">
      <div
        class="leaveWordItem"
        v-for="(item, index) in leaveWordList"
        :key="index"
      >
        <div slot="label">
          <div class="top">
            <div class="type">{{ typeList[item.leaveWordType] }}</div>
            <div class="type" v-if="item.orderId">{{ item.orderId }}</div>
            <div class="time">{{ item.leaveWordTime }}</div>
          </div>
          <div class="buttom">
            <div class="detail">{{ item.leaveWordDetail }}</div>
            <div class="status">{{ statusList[item.leaveWordStatus] }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog">
      <!-- <van-dialog
        use-slot
        title="新增留言"
        :show="show"
        show-cancel-button
        confirm-button-open-type="getUserInfo"
        bind:close="onClose"
        bind:getuserinfo="getUserInfo"
      >
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </van-dialog> -->
    </div>
    <van-toast id="van-toast" />
    <van-notify id="van-notify" />
  </div>
</template>
  
  <script>
import Toast from "vant-weapp/dist/toast/toast";
import { timeFormat } from "../../../utils/time";
import Notify from "vant-weapp/dist/notify/notify";
import {
  createWord,
  listWord,
  queryWord,
  deleteWord,
} from "../../../api/leaveWord";

export default {
  data() {
    return {
      show: false,
      isEdit: false,
      name: "",
      contact: "",
      typeList: ["系统问题", "订单问题"],
      statusList: ["未解决", "正在解决", "已解决", "无法解决"],
      leaveWordList: [],
      show: false,
    };
  },
  onShow() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const openid = this.$store.getters.token || 10001;

      const data =
        this.$store.getters.type === "keeper"
          ? { keeperId: openid }
          : { userId: openid };
      listWord(data)
        .then((res) => {
          console.log(res);
          res.data.forEach((item) => {
            item.leaveWordTime = timeFormat(item.leaveWordTime);
          });
          this.leaveWordList = res.data;
        })
        .catch((err) => {
          Toast.fail(err);
        });
    },
    getUserInfo(event) {
      console.log(event.detail);
    },
    addLeaveWord() {},
    delete() {
      this.$store.dispatch("user/logout");
      mpvue.switchTab({
        url: "../../mine/main",
      });
    },
    add() {
      this.show = ture;
    },
  },
};
</script>
  
<style lang="scss" scoped>
.leaveWord {
  .leaveWordItem {
    margin: 10px;
    background-color: #dadadc;
    .top {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
    .buttom {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }
}
</style>
  