<template>
  <div class="orderVue">
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
        <el-tab-pane name="first" label="所有订单">
          <span slot="label"> 所有订单 </span>
        </el-tab-pane>
        <el-tab-pane name="0" label="待支付">
          <span slot="label"> 待支付 </span>
        </el-tab-pane>
        <!-- <el-tab-pane name="待发货">
                  <span slot="label"> 待发货 </span>
              </el-tab-pane>
              <el-tab-pane name="待收货">
                  <span slot="label"> 待收货 </span>
              </el-tab-pane> -->
        <el-tab-pane name="1" label="待评价">
          <span slot="label"> 待评价 </span>
        </el-tab-pane>
        <el-tab-pane name="3" label="已评价">
          <span slot="label"> 已完成 </span>
        </el-tab-pane>
        <el-tab-pane name="4">
          <span slot="label"
            ><i class="el-icon-delete-solid"></i> 订单回收站
          </span>
        </el-tab-pane>
      </el-tabs>
      <div class="orderTar">
        <div class="headerFirst">服务</div>
        <div class="maindiv">用户</div>
        <div class="maindiv">服务人员</div>
        <div class="maindiv">评论状态</div>
        <div class="maindiv">实付款</div>
        <div class="maindiv">支付状态</div>
        <div class="maindiv">交易操作</div>
      </div>
      <div v-if="isDefault == false">
        <div
        class="product"
        v-for="o in orderList"
        :key="o.orderId"
        :style="
          o.status != '3'
            ? 'border: 2px #daf3ff solid;'
            : 'border: 2px #f1f1f1 solid;'
        "
      >
        <div
          class="header"
          :style="
            o.status != '已收货'
              ? 'background-color: #eaf8ff;'
              : 'background-color: #f1f1f1;'
          "
        >
          <div style="font-weight: 600">
            创建时间：{{ o.createTime | datefmt("YYYY-MM-DD HH:mm:ss") }}
          </div>
          <div>订单号：{{ o.orderId }}</div>
        </div>
        <div class="main">
          <div class="headerFirst">
            <!-- <img :src="o.productDto.img.img1" alt=""> -->
            <div class="firstClom">
              <div class="smallBlock">
                <p>
                  服务类型：<b>{{ o.service.serviceBigType }}</b>
                </p>
                <p>
                  具体服务：<b>{{ o.service.serviceSmallType }}</b>
                </p>
              </div>
              <div class="smallBlock">
                <p>
                  开始时间：<b>{{
                    o.timeSlotObj.start | datefmt("HH:mm:ss")
                  }}</b>
                </p>
                <p>
                  结束时间：<b>{{ o.timeSlotObj.end | datefmt("HH:mm:ss") }}</b>
                </p>
              </div>
            </div>
          </div>
          <div class="maindiv">
            {{ o.user.userName }}
          </div>
          <div class="maindiv">
            {{ o.keeper.keeperName }}
          </div>
          <div class="maindiv">
            <a href="#">{{ o.evaluateDes }}<br /></a>
          </div>
          <div class="maindiv">￥{{ o.money }}</div>
          <div class="maindiv">
            {{ o.statusDes }}
            <!-- <a href="#">交易成功<br/></a>
                      <a href="#">订单详情<br/></a>
                      <a href="#">查看物流</a> -->
          </div>
          <div class="maindiv">
            <el-button type="primary" size="mini" v-if="o.statusDes != '已收货'"
              >确认收货</el-button
            >
            <el-button size="mini" v-if="o.statusDes == '已收货'"
              >评价</el-button
            ><br />
            <a href="#" v-if="o.statusDes == '已收货'">申请开票</a>
          </div>
        </div>
        </div>
      </div>
      <div v-else>
        <div style="text-align:center;">
          <p>暂无数据</p>
        </div>
      </div>
    </div>
      
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script >
import axios from "axios";
export default {
  data() {
    return {
      activeName: "first",
      orderList: [],
      currentPage: 1,
      pageSize: 5,
      count: 0,
      status: null,
      isDefault: false,
    };
  },
  methods: {
    // 分页方法
    handleSizeChange(data) {
      this.pageSize = data;
      this.getMyOrder();
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.getMyOrder();
    },
    handleClick(tab, event) {
      this.status = parseInt(this.activeName);
      if (this.activeName == "first") this.status = null;
      this.getMyOrder();
      // console.log(this.activeName ,tab, event);
    },
    getMyOrder() {
      const data = {
        status: this.status,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      };
      this.$store
        .dispatch("order/getAllOrder", data)
        .then((res) => {
          console.log(res);
          if(res.data.count==0)
            this.isDefault = true;
          else
            this.isDefault = false;
          this.orderList = res.data.data;
          this.count = res.data.count;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getMyOrder();
  },
};
</script>

<style scoped>
.orderVue {
  width: 100%;
}
.orderVue .content {
  width: 100%;
}
.orderVue .content .headerFirst {
  width: 40%;
  text-align: center;
  float: left;
}
.orderVue .content span {
  font-weight: 600;
  font-size: 16px;
}

.orderVue .content .orderTar {
  width: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
}
.orderVue .content .product {
  border: 2px #daf3ff solid;
  overflow: hidden;
  margin-top: 20px;
  font-size: 14px;
}
.orderVue .content .product:hover {
  border: 2px #409eff solid !important;
}
.orderVue .content .product .firstClom p {
  margin-block-start: 0em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.orderVue .content .orderTar .maindiv {
  float: left;
  width: 10%;
  line-height: 36px;
  font-size: 12px;
}
.orderVue .content .product .main .maindiv {
  float: left;
  width: 10%;
  line-height: 20px;
  /* font-size: 12px; */
}
.orderVue .content .product .header {
  overflow: hidden;
  height: 40px;
  background-color: #eaf8ff;
}
.orderVue .content .product .header div {
  float: left;
  margin-left: 10px;
  font-size: 12px;
  line-height: 40px;
}
.orderVue .content .product .firstClom {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}
.orderVue .content .product .main {
  padding: 10px;
  overflow: hidden;
  border-top: 2px #daf3ff solid;
}
.orderVue .content .product .main img {
  width: 80px;
  height: 80px;
}
.orderVue .content .product .main a {
  text-decoration: none;
  color: #000;
}
.orderVue .content .product .main a:hover {
  color: #ff4442;
}
</style>
