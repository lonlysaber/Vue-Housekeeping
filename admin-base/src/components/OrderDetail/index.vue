<template>
  <div class="inner">

    <el-dialog
      title="订单详情"
      :visible.sync="disOrderDetail"
      width="30%"
      :modal-append-to-body="false"
    >
      <el-form ref="updateform" :model="o" label-width="80px">
        <el-form-item label="用户姓名">
          {{ o.user.userName }}
        </el-form-item>
        <el-form-item label="服务人员">
          {{ o.keeper.keeperName }}
        </el-form-item>
        <el-form-item label="服务时间">
          {{ o.timeSlotObj.start | datefmt("YYYY-MM-DD HH:mm:ss")}}
        </el-form-item>
        <el-form-item label="评论详情">
          {{ o.evaluateDes}}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disOrderDetail = false">取 消</el-button>
        <el-button type="primary" @click="updateConfirm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "orderDetail",
  props: {
    o:{
      type:Object,
      default:{user:{},keeper:{},timeSloatObj:{}}
    }
  },
  created() {
    // this.o = JSON.parse(this.order)
    // this.disOrderDetail = this.disOrderDetail;
    // console.log(this.disOrderDetail)
  },
  mounted() {
    // this.$nextTick(function () {
    //   this.$on("handleDisOrder", function () {
    //     this.disOrderDetail = !this.disOrderDetail;
    //   });
    // });
  },
  methods: {
    // changeValFn(e) {
    //   this.$emit("update:msg", e.target.value);
    // },
    handleDis(order) {
      this.disOrderDetail = !this.disOrderDetail;
      this.o = order
      console.log(order)
    },
    updateConfirm(){
      this.disOrderDetail = !this.disOrderDetail;
    }
  },
  data() {
    return {
      disOrderDetail: false,
    };
  },
};
</script>

<style scoped>
</style>
