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
        <el-form-item label="用户密码">
          {{ o.timeSloatObj.start }}
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
//   props: ["order"],
//   model: {
//     prop: "order",
//   },
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
  },
  data() {
    return {
      // o:{}
      disOrderDetail: false,
      o:{}
    };
  },
};
</script>

<style scoped>
</style>
