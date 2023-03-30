<template>
  <div class="evaluate-dialog">
    <van-dialog
      :async-close="true"
      use-slot
      v-if="!isLook"
      title="评价"
      :show="show"
      show-cancel-button
      @confirm="handleEvaluate"
      @close="onClose"
    >
      <div class="evaluate-rate">
        <van-rate :value="form.score" @change="onChange" />
      </div>
      <div class="evaluate-textarea">
        <textarea v-model="form.evaluate" placeholder="请输入评价" />
      </div>
    </van-dialog>
    <van-dialog
      :async-close="true"
      use-slot
      v-if="isLook"
      title="评价"
      :show="show"
      @close="onClose"
    >
      <div class="evaluate-rate">
        <van-rate :value="form.score" @change="onChange" />
      </div>
      <div class="evaluate-textarea">
        <textarea v-model="form.evaluate" placeholder="请输入评价1" />
      </div>
    </van-dialog>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Toast from "vant-weapp/dist/toast/toast";
import { create, query } from "../../api/evaluate";

export default {
  name: "EvaluateDialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    isLook: {
      type: Boolean,
      default: false,
    },
    orderId: {
      type: String,
      default: "",
    },
    keeperId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      form: {
        score: "",
        evaluate: "",
      },
    };
  },
  watch:{
    show:{
      handler:(newVal,oldVal)=>{
        console.log(newVal,oldVal)
        // this.isShow = newVal
      },
      immediate:true
    }
  },
  methods: {
    onChange(e) {
      this.form.score = e.mp.detail;
    },
    handleEvaluate() {
      if (this.form.score === "" || this.form.evaluate === "") {
        Toast.fail("评分或评价不能为空");
      } else {
        const openid = mpvue.getStorageSync("token");
        const data = {
          userId: openid,
          orderId: this.orderId,
          keeperId: this.keeperId,
          evaluateStar: this.form.score,
          evaluateDetail: this.form.evaluate,
          evaluateTime: new Date().getTime(),
        };
        console.log(data);
        create(data)
          .then((res) => {
            this.show = false;
            this.$emit("success", this.orderId);
            this.score = "";
            this.evaluate = "";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    lookEvaluate(id) {
      query(id).then((res) => {
        this.form.score = res.data.evaluateStar
        this.form.evaluate = res.data.evaluateDetail
      });
    },
    onClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.evaluate-dialog {
  padding: 20px;
  .evaluate-rate {
    text-align: center;
    margin: 10px;
  }
  .evaluate-textarea {
    background: #e4e4e4;
    margin: 10px 30px;
    padding: 10px;
  }
}
</style>
