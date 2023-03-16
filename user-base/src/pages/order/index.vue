<template>
  <div class="page-order">
    <van-tabs color="#42b983" :active="active">
      <van-tab name="1" title="待付款">
        <div v-if="orderList1.length===0" class="page-order-none">暂无该类型订单</div>
        <div v-else>
          <div v-for="(item,index) in orderList1" :key="index" style="margin:10px 0">
            <van-card
              :thumb="item.commodityAvatar"
              thumb-mode="fit"
              :price="item.amount"
              :title="item.commodityName"
              :tag="item.status"
            >
              <div slot="desc">
                <div class="order-detail">
                  <span class="order-detail-label">姓名:</span>
                  <span class="order-detail-value">{{item.customerName}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">联系方式:</span>
                  <span class="order-detail-value">{{item.contact}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">服务日期:</span>
                  <span class="order-detail-value">{{item.serviceDate}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">服务地址:</span>
                  <span class="order-detail-value">{{item.serviceAddress}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">订单编号:</span>
                  <span class="order-detail-value">{{item.orderID}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">下单日期:</span>
                  <span class="order-detail-value">{{item.orderDate}}</span>
                </div>
              </div>
              <div slot="footer">
                <van-button
                  type="primary"
                  v-if="item.status==='待支付'"
                  size="mini"
                  @click="handlePayment(item.orderID)"
                >付款</van-button>
                <van-button
                  type="danger"
                  v-if="item.status==='待支付'"
                  size="mini"
                  @click="handleCancel(item.orderID)"
                >取消</van-button>
                <van-button
                  type="warning"
                  v-if="item.status==='待服务'"
                  size="mini"
                  @click="handleRefund(item.orderID)"
                >申请退款</van-button>
                <van-button
                  type="primary"
                  v-if="item.status==='服务中'"
                  size="mini"
                  @click="handleSuccess(item.orderID)"
                >确认完成</van-button>
                <van-button
                  v-if="item.status==='待评价'"
                  size="mini"
                  @click="handleEvaluate(item.orderID)"
                >评价</van-button>
              </div>
            </van-card>
          </div>
        </div>
      </van-tab>
      <van-tab name="2" title="待服务">
        <div v-if="orderList2.length===0" class="page-order-none">暂无该类型订单</div>
        <div v-else>
          <div v-for="(item,index) in orderList2" :key="index" style="margin:10px 0">
            <van-card
              :thumb="item.commodityAvatar"
              thumb-mode="fit"
              :price="item.amount"
              :title="item.commodityName"
              :tag="item.status"
            >
              <div slot="desc">
                <div class="order-detail">
                  <span class="order-detail-label">姓名:</span>
                  <span class="order-detail-value">{{item.customerName}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">联系方式:</span>
                  <span class="order-detail-value">{{item.contact}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">服务日期:</span>
                  <span class="order-detail-value">{{item.serviceDate}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">服务地址:</span>
                  <span class="order-detail-value">{{item.serviceAddress}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">订单编号:</span>
                  <span class="order-detail-value">{{item.orderID}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">下单日期:</span>
                  <span class="order-detail-value">{{item.orderDate}}</span>
                </div>
              </div>
              <div slot="footer">
                <van-button
                  type="primary"
                  v-if="item.status==='待支付'"
                  size="mini"
                  @click="handlePayment(item.orderID)"
                >付款</van-button>
                <van-button
                  type="danger"
                  v-if="item.status==='待支付'"
                  size="mini"
                  @click="handleCancel(item.orderID)"
                >取消</van-button>
                <van-button
                  type="warning"
                  v-if="item.status==='待服务'"
                  size="mini"
                  @click="handleRefund(item.orderID)"
                >申请退款</van-button>
                <van-button
                  type="primary"
                  v-if="item.status==='服务中'"
                  size="mini"
                  @click="handleSuccess(item.orderID)"
                >确认完成</van-button>
                <van-button
                  v-if="item.status==='待评价'"
                  size="mini"
                  @click="handleEvaluate(item.orderID)"
                >评价</van-button>
              </div>
            </van-card>
          </div>
        </div>
      </van-tab>
      <van-tab name="3" title="待评价">
        <div v-if="orderList3.length===0" class="page-order-none">暂无该类型订单</div>
        <div v-else>
          <div v-for="(item,index) in orderList3" :key="index" style="margin:10px 0">
            <van-card
              :thumb="item.commodityAvatar"
              thumb-mode="fit"
              :price="item.amount"
              :title="item.commodityName"
              :tag="item.status"
            >
              <div slot="desc">
                <div class="order-detail">
                  <span class="order-detail-label">姓名:</span>
                  <span class="order-detail-value">{{item.customerName}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">联系方式:</span>
                  <span class="order-detail-value">{{item.contact}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">服务日期:</span>
                  <span class="order-detail-value">{{item.serviceDate}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">服务地址:</span>
                  <span class="order-detail-value">{{item.serviceAddress}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">订单编号:</span>
                  <span class="order-detail-value">{{item.orderID}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">下单日期:</span>
                  <span class="order-detail-value">{{item.orderDate}}</span>
                </div>
              </div>
              <div slot="footer">
                <van-button
                  type="primary"
                  v-if="item.status==='待支付'"
                  size="mini"
                  @click="handlePayment(item.orderID)"
                >付款</van-button>
                <van-button
                  type="danger"
                  v-if="item.status==='待支付'"
                  size="mini"
                  @click="handleCancel(item.orderID)"
                >取消</van-button>
                <van-button
                  type="warning"
                  v-if="item.status==='待服务'"
                  size="mini"
                  @click="handleRefund(item.orderID)"
                >申请退款</van-button>
                <van-button
                  type="primary"
                  v-if="item.status==='服务中'"
                  size="mini"
                  @click="handleSuccess(item.orderID)"
                >确认完成</van-button>
                <van-button
                  v-if="item.status==='待评价'"
                  size="mini"
                  @click="handleEvaluate(item.orderID)"
                >评价</van-button>
              </div>
            </van-card>
          </div>
        </div>
      </van-tab>
      <van-tab name="4" title="全部订单">
        <div v-if="orderList.length===0" class="page-order-none">暂无该类型订单</div>
        <div v-else>
          <div v-for="(item,index) in orderList" :key="index" style="margin:10px 0">
            <van-card
              :thumb="item.commodityAvatar"
              thumb-mode="fit"
              :price="item.amount"
              :title="item.commodityName"
              :tag="item.status"
            >
              <div slot="desc">
                <div class="order-detail">
                  <span class="order-detail-label">姓名:</span>
                  <span class="order-detail-value">{{item.customerName}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">联系方式:</span>
                  <span class="order-detail-value">{{item.contact}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">服务日期:</span>
                  <span class="order-detail-value">{{item.serviceDate}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">服务地址:</span>
                  <span class="order-detail-value">{{item.serviceAddress}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">订单编号:</span>
                  <span class="order-detail-value">{{item.orderID}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">下单日期:</span>
                  <span class="order-detail-value">{{item.orderDate}}</span>
                </div>
              </div>
              <div slot="footer">
                <van-button
                  type="primary"
                  v-if="item.status==='待支付'"
                  size="mini"
                  @click="handlePayment(item.orderID)"
                >付款</van-button>
                <van-button
                  type="danger"
                  v-if="item.status==='待支付'"
                  size="mini"
                  @click="handleCancel(item.orderID)"
                >取消</van-button>
                <van-button
                  type="warning"
                  v-if="item.status==='待服务'"
                  size="mini"
                  @click="handleRefund(item.orderID)"
                >申请退款</van-button>
                <van-button
                  type="primary"
                  v-if="item.status==='服务中'"
                  size="mini"
                  @click="handleSuccess(item.orderID)"
                >确认完成</van-button>
                <van-button
                  v-if="item.status==='待评价'"
                  size="mini"
                  @click="handleEvaluate(item.orderID)"
                >评价</van-button>
              </div>
            </van-card>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <van-notify id="van-notify" />
    <EvaluateDialog :show="show" :id="id" @close="show=false" @success="evaluateSuccess(id)"/>
  </div>
</template>

<script>
import { query, update } from '../../api/order'
import Notify from 'vant-weapp/dist/notify/notify'
import EvaluateDialog from '../../components/mine/EvaluateDialog'
import { check } from '../../utils/check'

export default {
  components: { EvaluateDialog },
  data () {
    return {
      show: false,
      id: '',
      active: 1,
      orderList1: [],
      orderList2: [],
      orderList3: [],
      orderList: []
    }
  },
  mounted () {
    this.active = this.$mp.query.tab
    this.fetchData()
  },
  methods: {
    fetchData () {
      const openid = mpvue.getStorageSync('openid')
      query(openid)
        .then(res => {
          this.orderList = check(res.data)
          this.orderList1 = []
          this.orderList2 = []
          this.orderList3 = []
          this.sortList(this.orderList)
        })
        .catch(err => {
          console.log(err)
        })
    },
    sortList (list) {
      list.forEach(obj => {
        if (obj.status === '待支付') {
          this.orderList1.push(obj)
        }
        if (obj.status === '待服务') {
          this.orderList2.push(obj)
        }
        if (obj.status === '待评价') {
          this.orderList3.push(obj)
        }
      })
    },
    handlePayment (id) {
      console.log(id)
      update(id, '待服务')
        .then(res => {
          this.fetchData()
          Notify({ type: 'success', message: '支付成功' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleCancel (id) {
      console.log(id)
      update(id, '已取消')
        .then(res => {
          this.fetchData()
          Notify({ type: 'warning', message: '取消成功' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleRefund (id) {
      console.log(id)
      update(id, '退款中')
        .then(res => {
          this.fetchData()
          Notify('成功提交退款申请')
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSuccess (id) {
      console.log(id)
      update(id, '待评价')
        .then(res => {
          this.fetchData()
          Notify({ type: 'success', message: '交易成功' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleEvaluate (id) {
      console.log(id)
      this.id = id
      this.show = true
    },
    evaluateSuccess (id) {
      console.log(id)
      update(id, '已评价')
        .then(res => {
          this.fetchData()
          Notify({ type: 'success', message: '评价成功' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-order {
  background-color: #e5e5e5;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  overflow: auto;
  overscroll-behavior-y: contain;
  .page-order-none {
    color: white;
    text-align: center;
    padding: 70% 0;
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
