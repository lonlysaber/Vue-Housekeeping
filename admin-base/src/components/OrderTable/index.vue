<template>
<el-dialog
        title="搜索结果"
        :visible.sync="OrderTableShow"
        :modal-append-to-body="false"
      >
        <el-table
          :data="table"
          border
          highlight-current-row
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          style="width: 100%; margin-top: 8px; text-align: center"
        >
        <el-table-column prop="user.userName" label="用户名" width="80">
        </el-table-column>
        <el-table-column prop="keeper.keeperName" label="服务人员" width="80">
        </el-table-column>
        <el-table-column prop="statusDes" label="订单状态"> </el-table-column>
        <el-table-column prop="money" label="金额"> </el-table-column>
         
        </el-table>
      </el-dialog>
  </template>
  
  <script>
  export default {
    name: 'OrderTable',
    props: {
      OrderTableShow:{type:Boolean,default:false},
      table: { type: Array, required: false, default: [] }
    },
    data() {
      return {
        isEdit: this.edit,
        visible: this.dialogVisible
      }
    },

    methods: {
    }
  }
  </script>
  
  <style lang="scss" >
  .el-dialog{
    margin-top:8vh  !important;
  }
  
  .el-divider--horizontal{
    margin:16px 0 0 0;
  }
  
  .detail__title{
    font-size:18px;
  }
  
  .detail__name{
    margin:auto 0;
    font-size:16px;
    font-weight: 700;
    text-align: right;
    color:#92a89e ;
    display: inline-block;
    margin: 10px 10px;
    width:100px
  }
  
  .detail__value{
    font-size:16px;
    font-weight: 700;
    color:#444444 ;
  }
  </style>
  