<template>
    <div class="inner">
  
      <el-dialog
        title="订单详情"
        :visible.sync="disEvaluateDetail"
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
          <el-button @click="disEvaluateDetail = false">取 消</el-button>
          <el-button type="primary" @click="updateConfirm()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    name: "evaluateDetail",

    methods: {
      
      handleDis(evaluate) {
        this.disEvaluateDetail = !this.disEvaluateDetail;
          this.o = evaluate
        console.log(evaluate)
      },
    },
    data() {
      return {
        // o:{}
        disEvaluateDetail: false,
        o:{}
      };
    },
  };
  </script>
  
  <style scoped>
  </style>
  