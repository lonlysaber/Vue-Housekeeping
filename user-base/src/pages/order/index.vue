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
              :price="item.money"
              :title="item.service.serviceSmallType + item.service.serviceBigType"
              :tag="item.statusDes"
            >
              <div slot="desc">
                <div class="order-detail">
                  <span class="order-detail-label">姓名:</span>
                  <span class="order-detail-value">{{item.user.userName}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">联系方式:</span>
                  <span class="order-detail-value">{{item.user.userPhone}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">服务日期:</span>
                  <span class="order-detail-value">{{  item.timeSlotObj.end}}</span>
                  <!-- <span class="order-detail-value">{{  $mount(item.timeSlotObj.end).format('YYYY-MM-DD HH:mm:ss')}}</span> -->
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">服务地址:</span>
                  <span class="order-detail-value">{{item.user.userAddress}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">订单编号:</span>
                  <span class="order-detail-value">{{item.orderId}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">下单日期:</span>
                  <span class="order-detail-value">{{item.createTime }}</span>
                </div>
              </div>
              <div slot="footer">
                <van-button
                  type="primary"
                  v-if="item.statusDes==='待支付'"
                  size="mini"
                  @click="handlePayment(item.orderId)"
                >付款</van-button>
                <van-button
                  type="danger"
                  v-if="item.statusDes==='待支付'"
                  size="mini"
                  @click="handleCancel(item.orderId)"
                >取消</van-button>
                <van-button
                  type="warning"
                  v-if="item.statusDes==='待服务'"
                  size="mini"
                  @click="handleRefund(item.orderId)"
                >申请退款</van-button>
                <van-button
                  type="primary"
                  v-if="item.statusDes==='服务中'"
                  size="mini"
                  @click="handleSuccess(item.orderId)"
                >确认完成</van-button>
                <van-button
                  v-if="item.statusDes==='待评价'"
                  size="mini"
                  @click="handleEvaluate(item.orderId,item.keeperId)"
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
              :price="item.money"
              :title="item.service.serviceSmallType + item.service.serviceBigType"
              :tag="item.statusDes"
            >
              <div slot="desc">
                <div class="order-detail">
                  <span class="order-detail-label">姓名:</span>
                  <span class="order-detail-value">{{item.user.userName}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">联系方式:</span>
                  <span class="order-detail-value">{{item.user.userPhone}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">服务日期:</span>
                  <span class="order-detail-value">{{ item.timeSlotObj.end}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">服务地址:</span>
                  <span class="order-detail-value">{{item.user.userAddress}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">订单编号:</span>
                  <span class="order-detail-value">{{item.orderId}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">下单日期:</span>
                  <span class="order-detail-value">{{item.createTime }}</span>
                </div>
              </div>
              <div slot="footer">
                <van-button
                  type="primary"
                  v-if="item.statusDes==='待支付'"
                  size="mini"
                  @click="handlePayment(item.orderId)"
                >付款</van-button>
                <van-button
                  type="danger"
                  v-if="item.statusDes==='待支付'"
                  size="mini"
                  @click="handleCancel(item.orderId)"
                >取消</van-button>
                <van-button
                  type="warning"
                  v-if="item.statusDes==='待服务'"
                  size="mini"
                  @click="handleRefund(item.orderId)"
                >申请退款</van-button>
                <van-button
                  type="primary"
                  v-if="item.statusDes==='服务中'"
                  size="mini"
                  @click="handleSuccess(item.orderId)"
                >确认完成</van-button>
                <van-button
                  v-if="item.statusDes==='待评价'"
                  size="mini"
                  @click="handleEvaluate(item.orderId,item.keeperId)"
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
              :price="item.money"
              :title="item.service.serviceSmallType + item.service.serviceBigType"
              :tag="item.statusDes"
            >
              <div slot="desc">
                <div class="order-detail">
                  <span class="order-detail-label">姓名:</span>
                  <span class="order-detail-value">{{item.user.userName}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">联系方式:</span>
                  <span class="order-detail-value">{{item.user.userPhone}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">服务日期:</span>
                  <span class="order-detail-value">{{ item.timeSlotObj.end}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">服务地址:</span>
                  <span class="order-detail-value">{{item.user.userAddress}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">订单编号:</span>
                  <span class="order-detail-value">{{item.orderId}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">下单日期:</span>
                  <span class="order-detail-value">{{item.createTime }}</span>
                </div>
              </div>
              <div slot="footer">
                <van-button
                  type="primary"
                  v-if="item.statusDes==='待支付'"
                  size="mini"
                  @click="handlePayment(item.orderId)"
                >付款</van-button>
                <van-button
                  type="danger"
                  v-if="item.statusDes==='待支付'"
                  size="mini"
                  @click="handleCancel(item.orderId)"
                >取消</van-button>
                <van-button
                  type="warning"
                  v-if="item.statusDes==='待服务'"
                  size="mini"
                  @click="handleRefund(item.orderId)"
                >申请退款</van-button>
                <van-button
                  type="primary"
                  v-if="item.statusDes==='服务中'"
                  size="mini"
                  @click="handleSuccess(item.orderId)"
                >确认完成</van-button>
                <van-button
                  v-if="item.statusDes==='待评价'"
                  size="mini"
                  @click="handleEvaluate(item.orderId,item.keeperId)"
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
              :price="item.money"
              :title="item.service.serviceSmallType + item.service.serviceBigType"
              :tag="item.statusDes"
            >
              <div slot="desc">
                <div class="order-detail">
                  <span class="order-detail-label">姓名:</span>
                  <span class="order-detail-value">{{item.user.userName}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">联系方式:</span>
                  <span class="order-detail-value">{{item.user.userPhone}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">服务日期:</span>
                  <span class="order-detail-value">{{ item.timeSlotObj.end}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">服务地址:</span>
                  <span class="order-detail-value">{{item.user.userAddress}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">订单编号:</span>
                  <span class="order-detail-value">{{item.orderId}}</span>
                </div>
                <div class="order-detail">
                  <span class="order-detail-label">下单日期:</span>
                  <span class="order-detail-value">{{item.createTime }}</span>
                </div>
              </div>
              <div slot="footer">
                <van-button
                  type="primary"
                  v-if="item.statusDes==='待支付'"
                  size="mini"
                  @click="handlePayment(item.orderId)"
                >付款</van-button>
                <van-button
                  type="danger"
                  v-if="item.statusDes==='待支付'"
                  size="mini"
                  @click="handleCancel(item.orderId)"
                >取消</van-button>
                <van-button
                  type="warning"
                  v-if="item.statusDes==='待服务'"
                  size="mini"
                  @click="handleRefund(item.orderId)"
                >申请退款</van-button>
                <van-button
                  type="primary"
                  v-if="item.statusDes==='服务中'"
                  size="mini"
                  @click="handleSuccess(item.orderId)"
                >确认完成</van-button>
                <van-button
                  v-if="item.statusDes==='待评价'"
                  size="mini"
                  @click="handleEvaluate(item.orderId,item.keeperId)"
                >评价</van-button>
                <van-button
                  v-if="item.statusDes==='已评价'"
                  size="mini"
                  @click="handleLookEvaluate(item.orderId)"
                >查看评价</van-button>
              </div>
            </van-card>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <van-notify id="van-notify" />
    <EvaluateDialog ref="evaluateDialog" 
    :show="show" :isLook="isLook" :orderId="orderId" :keeperId="keeperId" 
    @close="show=false" @success="evaluateSuccess(orderId)"/>
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
      orderId: '',
      keeperId:'',
      isLook:false,
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
      const openid = mpvue.getStorageSync('token')
      const data = {
        userId:openid
      }
      query(data)
        .then(res => {
          this.orderList = check(res.data)
          this.orderList.forEach(obj=>{
            obj.createTime = this.$moment(obj.createTime).format('YYYY-MM-DD HH:mm:ss')
            obj.timeSlotObj.end = this.$moment(obj.timeSlotObj.end).format('YYYY-MM-DD HH:mm:ss')
          })
          console.log(this.orderList)
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
        if (obj.status == "2") {
          this.orderList1.push(obj)
        }
        if (obj.status == '0') {
          this.orderList2.push(obj)
        }
        if (obj.status == "3") {
          this.orderList3.push(obj)
        }
      })
    },
    handlePayment (id) {
      console.log(id)
      const data  ={
        orderId:id,
        status:3
      }
      update(data)
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
      const data  ={
        orderId:id,
        status:4
      }
      update(data)
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
      const data  ={
        orderId:id,
        status:5
      }
      update(data)
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
      const data  ={
        orderId:id,
        status:2
      }
      update(data)
        .then(res => {
          this.fetchData()
          Notify({ type: 'success', message: '交易成功' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleEvaluate (orderId,keeperId) {
      console.log(orderId)
      this.orderId = orderId
      this.keeperId = keeperId
      this.show = true
      this.isLook = false
    },
    handleLookEvaluate (orderId){
      this.orderId = orderId
      console.log(this.orderId)
      this.show = true
      this.isLook = true
      this.$refs.evaluateDialog.lookEvaluate(this.orderId)
    },
    evaluateSuccess (id) {
      console.log(id)
      const data  ={
        orderId:id,
        status:6
      }
      update(data)
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
