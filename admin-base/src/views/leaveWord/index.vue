<template>
  <div class="content-box">
    <div class="container">
      <!-- 根据条件搜索客户 -->
      <el-row>
        <el-input
          class="input"
          placeholder="请输入编号"
          v-model="searchID"
          clearable
        >
        </el-input>
        <el-button @click="queryClientById(searchID)">搜索编号</el-button>
        &nbsp;&nbsp;
        <el-select v-model="searchName" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-button @click="queryClientByName(searchName)">搜索类型</el-button>
      </el-row>
      <!-- 客户信息 -->
      <el-table
        :data="
          clientData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        border
        highlight-current-row
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        row-class-name="tableRowClassName"
        style="margin-top: 8px; text-align: center"
      >
        <el-table-column prop="leaveWordId" label="留言编号"> </el-table-column>
        <el-table-column label="留言人">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              {{
                scope.row.userId !== null
                  ? scope.row.user.userName
                  : scope.row.keeper.keeperName
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="问题类型">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              {{ typeList[scope.row.leaveWordType] }}</span
            >
            <p style="margin-left: 10px" v-if="scope.row.leaveWordType === '1'">
              {{ scope.row.orderId }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="问题状态">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              {{ statuList[scope.row.leaveWordStatus] }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="leaveWordDetail" label="问题描述" width="180">
        </el-table-column>
        <el-table-column label="留言时间" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              {{
                scope.row.leaveWordTime | datefmt("YYYY-MM-DD HH:mm:ss")
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="状态修改时间" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              {{
                scope.row.leaveWordTime | datefmt("YYYY-MM-DD HH:mm:ss")
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <!-- 修改客户信息 -->
            <el-button @click="updataClient(scope.row)" size="small"
              >修改</el-button
            >&nbsp;
            <el-dialog
              title="修改状态"
              :visible.sync="dialogVisible"
              width="30%"
              :modal-append-to-body="false"
            >
              <el-form
                ref="updateform"
                :model="update_Client"
                label-width="80px"
              >
                <el-form-item label="留言状态">
                  <el-select
                    v-model="newSatus"
                    :placeholder="statuList[update_Client.leaveWordStatus]"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateConfirm(update_Client)"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
            <!-- 删除 -->
            <el-button @click="delClient(scope.row)" type="danger" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="size_change"
        @current-change="current_change"
        :current-page="currentPage"
        :page-sizes="[9, 20, 30]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="clientData.length"
      >
      </el-pagination>
      <OrderTable :OrderTableShow="OrderTableShow" :table="table"></OrderTable>
    </div>
  </div>
</template>
    
    <script>
import OrderTable from "@/components/OrderTable";
export default {
  components: {
    OrderTable,
  },
  data() {
    return {
      searchID: "",
      newSatus: "",
      searchName: "",
      searchPhone: "",
      searchClient: [],
      clientData: [],
      myhouseData: [],
      typeList: ["系统问题", "订单问题"],
      statuList: ["未解决", "正在解决", "已解决", "无法解决"],
      OrderTableShow: false,
      table: [],
      purchaseData: [],
      clientId: "",
      total: 0, //总条目数
      pagesize: 9, //每页显示条目个数
      currentPage: 1, //当前页数
      update_Client: {
        keeperName: "",
        keeperPwd: "",
        keeperPhone: "",
      },
      options1: [
        {
          value: "0",
          label: "系统问题",
        },
        {
          value: "1",
          label: "订单问题",
        },
      ],
      options: [
        {
          value: "0",
          label: "未解决",
        },
        {
          value: "1",
          label: "正在解决",
        },
        {
          value: "2",
          label: "已解决",
        },
        {
          value: "3",
          label: "无法解决",
        },
      ],
      dialogSearchVisible: false, //客户查询结果弹出框
      dialogTableVisible: false, //房源查询弹出框
      dialogTableVisible1: false, //订单查询弹出框
      dialogVisible: false, //修改表单弹出框
    };
  },
  created() {
    this.getAllLeaveWord();
  },
  methods: {
    //监听 pagesize 改变的事件
    size_change(newSize) {
      this.pagesize = newSize;
    },
    //监听 页码值 改变的事件
    current_change(newPage) {
      this.currentPage = newPage;
    },
    //获取客户信息
    getAllLeaveWord(params) {
      let data = params || {};

      data.currentPage = this.currentPage;
      data.pageSize = this.pageSize;
      this.$store
        .dispatch("leaveWord/getAllLeaveWord", data)
        .then((res) => {
          //   console.log(res);
          this.clientData = res.data.data;
        })
        .catch((err) => {});
    },
    queryCondition(params) {
      if (Object.values(params)[0] == "") {
        this.$message({
          showClose: true,
          message: "请输入查询值！",
          type: "error",
        });
        return;
      }
      this.getAllLeaveWord(params);
    },
    //根据ID搜索客户
    queryClientById() {
      const params = { leaveWordId: this.searchID };
      this.queryCondition(params);
      this.searchID = "";
    },

    //根据姓名搜索客户
    queryClientByName() {
      const params = { leaveWordType: this.searchName };
      this.queryCondition(params);
      this.searchName = "";
    },

    //根据手机号搜索客户
    queryClientByPhone() {
      const params = { leaveWordDetail: this.searchPhone };
      this.queryCondition(params);
      this.searchPhone = "";
    },

    //查询用户预约
    queryMyHouse(client) {
      this.clientId = client.clientId;
      this.$axios({
        url: "/client/queryMyHouse", //请求的后台接口
        method: "get", //get请求方式
        data: {
          clientId: this.clientId,
        },
      })
        .then((response) => {
          this.myhouseData = response.data.data;
          this.dialogTableVisible = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //查询用户订单
    queryPurchase(client) {
      this.$store.dispatch("keeper/getOrder", client.keeperId).then((res) => {
        this.OrderTableShow = true;
        this.table = res.data;
      });
    },

    // 通过弹出框进行数据的提交修改
    updataClient(client) {
      this.update_Client = client;
      this.dialogVisible = true;
    },

    //修改提交
    updateConfirm(row) {
      const data = {
        leaveWordId: row.leaveWordId,
        leaveWordStatus: this.newSatus,
      };
      //   console.log(this.newSatus,row)
      this.$store
        .dispatch("leaveWord/updateLeaveWord", data)
        .then((res) => {
            this.getAllLeaveWord();

        //   console.log(res);
          //   this.clientData = res.data.data;
        })
        .catch((err) => {});
      this.dialogVisible = false;
    },

    //删除客户
    delClient(client) {
      this.clientId = client.leaveWordId;
      this.$confirm("此操作将永久删除该留言, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.$store
            .dispatch("leaveWord/deleteLeaveWord", this.clientId)
            .then((request) => {
              this.$message({
                showClose: true,
                type: "success",
                message: "删除成功!",
              });
              this.getAllLeaveWord();
            })
            .catch((error) => {
              this.$message({
                showClose: true,
                message: "删除失败，该留言问题还未解决",
                type: "warning",
              });
            });
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
    
    <style>
.content-box .el-table .warning-row {
  background: rgb(242 191 167);
}

.content-box .el-table .warning-row :hover {
  /* background: rgb(242 191 167); */
}
.content-box .el-table .success-row {
  background: #f0f9eb;
}
.content-box .input {
  width: 200px;
}
</style>