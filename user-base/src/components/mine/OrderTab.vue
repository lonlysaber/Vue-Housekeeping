<template>
  <div class="mine-order-tab">
    <div>
      <div
        v-for="(item, index) in order.orderList"
        :key="index"
        style="margin: 10px 0"
      >
        <van-card
          :thumb="item.commodityAvatar"
          thumb-mode="fit"
          :price="item.money"
          :title="item.service.serviceSmallType + item.service.serviceBigType"
          :tag="item.statusDes"
        >
          <div slot="desc">
            <div class="order-detail">
              <span class="order-detail-label">姓名:</span>
              <span class="order-detail-value">{{ item.user.userName }}</span>
            </div>
            <div class="order-detail">
              <span class="order-detail-label">联系方式:</span>
              <span class="order-detail-value">{{ item.user.userPhone }}</span>
            </div>
            <div class="order-detail">
              <span class="order-detail-label">服务日期:</span>
              <span class="order-detail-value">{{ item.timeSlotObj.end }}</span>
              <!-- <span class="order-detail-value">{{  $mount(item.timeSlotObj.end).format('YYYY-MM-DD HH:mm:ss')}}</span> -->
            </div>
            <div class="order-detail">
              <span class="order-detail-label">服务地址:</span>
              <span class="order-detail-value">{{
                item.user.userAddress
              }}</span>
            </div>
            <div class="order-detail">
              <span class="order-detail-label">订单编号:</span>
              <span class="order-detail-value">{{ item.orderId }}</span>
            </div>
            <div class="order-detail">
              <span class="order-detail-label">下单日期:</span>
              <span class="order-detail-value">{{ item.createTime }}</span>
            </div>
          </div>
          <div class="footer" slot="footer">
            <van-button
              type="danger"
              class="button2"
              size="mini"
              v-if="type == 'user' && item.statusDes === '待支付'"
              @click="handleCancle(item)"
              >取消</van-button
            >
            <div
              class="buttonCell"
              v-for="(butt, idx) in clickEvantArr"
              :key="idx"
            >
              <van-button
                :type="butt.type"
                class="button1"
                size="mini"
                v-if="item.statusDes === butt.des"
                @click="butt.onClick(item)"
                >{{ butt.content }}</van-button
              >
            </div>
          </div>
        </van-card>
      </div>
    </div>
    <van-notify id="van-notify" />
    <!-- <EvaluateDialog
      ref="evaluateDialog"
      :show="show"
      :isLook="isLook"
      :orderId="orderId"
      :keeperId="keeperId"
      @close="show = false"
      @success="evaluateSuccess(orderId)"
    />
    <QRcode :QRshow="QRshow" :QRsrc="QRsrc" @close="QRshow = false"></QRcode> -->
  </div>
</template>
  
  <script>
import { update } from "../../api/order";

import Notify from "vant-weapp/dist/notify/notify";
import EvaluateDialog from "./EvaluateDialog";
import QRcode from "./QRcode";
export default {
  name: "OrderTab",
  components: { EvaluateDialog, QRcode },
  props: {
    order: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      type: "",
      show: false,
      QRshow: false,
      QRsrc: "",
      orderId: "",
      keeperId: "",
      isLook: false,
      clickEvantArr: [],
      keeperEvantArr: [
        {
          idx: 0,
          des: "待服务",
          onClick: (e) => this.handleLookQRcode(e),
          content: "生成二维码",
          type: "warning",
        },
        {
          idx: 1,
          des: "服务中",
          onClick: (e) => this.handleSuccess(e),
          content: "确认完成",
          type: "primary",
        },
        {
          idx: 2,
          des: "已评价",
          onClick: (e) => this.handleLookEvaluate(e),
          content: "查看评价",
          type: "primary",
        },
      ],
      userEvantArr: [
        {
          idx: 0,
          des: "待服务",
          onClick: (e) => this.handleStart(e),
          content: "确认",
          type: "warning",
        },
        {
          idx: 1,
          des: "服务中",
          onClick: (e) => this.handleSuccess(e),
          content: "完成",
          type: "primary",
        },
        {
          idx: 2,
          des: "待支付",
          onClick: (e) => this.handlePayment(e),
          content: "付款",
          type: "danger",
        },

        {
          idx: 3,
          des: "待评价",
          onClick: (e) => this.handleEvaluate(e),
          content: "评价",
          type: "",
        },
        {
          idx: 4,
          des: "已取消1",
          onClick: (e) => console.log(e),
          content: "",
          type: "",
        },
        {
          idx: 5,
          des: "已退款1",
          onClick: (e) => console.log(e),
          content: "",
          type: "",
        },
        {
          idx: 6,
          des: "已评价",
          onClick: (e) => this.handleLookEvaluate(e),
          content: "查看评价",
          type: "",
        },
      ],
    };
  },
  created() {
    this.changeType();
  },
  onShow() {
    this.changeType();
  },
  methods: {
    changeType() {
      this.type = this.$store.getters.type;
      if (this.type == "user") {
        this.clickEvantArr = this.userEvantArr;
      } else if (this.type == "keeper") {
        this.clickEvantArr = this.keeperEvantArr;
      } else {
        this.clickEvantArr = this.keeperEvantArr;
      }
    },
    onClick(e) {
      console.log(e);
    },
    handleStart(order) {
      console.log(order.orderId);
      const data = {
        orderId: order.orderId,
        status: 1,
      };
      // 调用摄像头api
      // xxxx(){}
      update(data)
        .then((res) => {
          this.$emit("fetchData");
          Notify({ type: "success", message: "开始服务" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handlePayment(order) {
      console.log(order.orderId);
      const data = {
        orderId: order.orderId,
        status: 3,
      };
      update(data)
        .then((res) => {
          this.$emit("fetchData");
          Notify({ type: "success", message: "支付成功" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCancel(order) {
      console.log(order.orderId);
      const data = {
        orderId: order.orderId,
        status: 4,
      };
      update(data)
        .then((res) => {
          this.$emit("fetchData");
          Notify({ type: "warning", message: "取消成功" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleRefund(order) {
      console.log(order.orderId);
      const data = {
        orderId: order.orderId,
        status: 5,
      };
      update(data)
        .then((res) => {
          this.$emit("fetchData");
          Notify("成功提交退款申请");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSuccess(order) {
      console.log(order.orderId);
      const data = {
        orderId: order.orderId,
        status: 2,
      };
      update(data)
        .then((res) => {
          this.$emit("fetchData");
          Notify({ type: "success", message: "交易成功" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleEvaluate(order) {
      this.$emit('handleEvaluate',order)
    },
    handleLookEvaluate(order) {
      this.$emit('handleLookEvaluate',order)
    },
    handleLookQRcode(order) {
      this.$emit('handleLookQRcode',order)
    },
    evaluateSuccess(order) {
      console.log(order.orderId);
      const data = {
        orderId: order.orderId,
        status: 6,
      };
      update(data)
        .then((res) => {
          this.$emit("fetchData");
          Notify({ type: "success", message: "评价成功" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
  
<style lang="scss" scoped>
.mine-order-tab {
  width: 100%;
  .page-order-none {
    color: white;
    text-align: center;
    padding: 70% 0;
  }
  .footer {
    display: flex;
    flex-direction: row-reverse;
  }
  .order-detail {
    display: flex;
    margin: 5px 0;
    .order-detail-label {
      width: 60px;
    }
    .order-detail-value {
      width: 160px;
    }
  }
}
</style>
  