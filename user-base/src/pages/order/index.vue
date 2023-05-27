<template>
  <div class="page-order">
    <van-tabs color="#42b983" :active="active">
      <van-tab v-for="(order,index) in orders" :name="order.name" :title="order.title" :key="index">
        <div v-if="order.orderList.length === 0" class="page-order-none">
          暂无数据
        </div>
        <OrderTab v-else @fetchData="fetchData" 
          @handleLookEvaluate="handleLookEvaluate" 
          @handleEvaluate="handleEvaluate"
          @handleLookQRcode="handleLookQRcode"
          :order="order"></OrderTab>
      </van-tab>
    </van-tabs>
    <EvaluateDialog
      ref="evaluateDialog" :show="show" :isLook="isLook"
      :orderId="orderId" :keeperId="keeperId"
      @close="show = false"
      @success="evaluateSuccess(orderId)"
    />
    <QRcode :QRshow="QRshow" :QRsrc="QRsrc" @close="QRshow = false"></QRcode>
  </div>
</template>

<script>
import { getUserOrder, getKeeperOrder } from '../../api/wechat'
import EvaluateDialog from "../../components/mine/EvaluateDialog";
import QRcode from "../../components/mine/QRcode.vue"
import OrderTab from '../../components/mine/OrderTab'
import { getQRcode } from "../../api/order";
import { check } from '../../utils/check'

export default {
  components: { OrderTab, EvaluateDialog, QRcode },
  data () {
    return {
      orderId: '',
      keeperId:'',
      active: 1,
      show: false,
      QRshow: false,
      userTab:[ 
              {status:'0',title:'待服务'},
              {status:'2',title:'待付款'},
              {status:'3',title:'待评价'},
              {status:'',title:'全部订单'}
              ],
      keeperTab:[
                {status:'0',title:'待服务'},
                {status:'1',title:'服务中'},
                {status:'6',title:'已评价'},
                {status:'',title:'全部订单'}
              ],
      orders:[],
      order1:{},
      order2:{},
      order3:{},
      order4:{},
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
    spliceData(res){
      this.orderList = check(res.data)
          this.orderList.forEach(obj=>{
            obj.createTime = this.$moment(obj.createTime).format('YYYY-MM-DD HH:mm:ss')
            obj.timeSlotObj.end = this.$moment(obj.timeSlotObj.end).format('YYYY-MM-DD HH:mm:ss')
          })
          this.orderList1 = []
          this.orderList2 = []
          this.orderList3 = []
          this.sortList(this.orderList)
    },
    fetchData () {
      const openid = this.$store.getters.token || 0
      const data = {
        userId:openid
      }
      console.log(this.$store.getters.type)
      if(this.$store.getters.type == 'user'){
        getUserOrder(openid).then(res => {
          this.spliceData(res)
        })
        .catch(err => {
          console.log(err)
        })
      }else if(this.$store.getters.type == 'keeper'){
        getKeeperOrder(openid).then(res=>{
          this.spliceData(res)
        })
      }
      
    },
    sortList (list) {
      let tabArr = []
      if(this.$store.getters.type == 'user'){
        tabArr = this.userTab
        list.forEach(obj => {
        if (obj.status == "0") {
          this.orderList1.push(obj)
        }
        if (obj.status == '2') {
          this.orderList2.push(obj)
        }
        if (obj.status == "3") {
          this.orderList3.push(obj)
        }
      })
      }else if(this.$store.getters.type == 'keeper'){
       tabArr = this.keeperTab
        list.forEach(obj => {
        if (obj.status == "0") {
          this.orderList1.push(obj)
        }
        if (obj.status == '1') {
          this.orderList2.push(obj)
        }
        if (obj.status == "6") {
          this.orderList3.push(obj)
        }
      })
    }
      this.order1={name:'1',title:tabArr[0].title,orderList:this.orderList1}
      this.order2={name:'2',title:tabArr[1].title,orderList:this.orderList2}
      this.order3={name:'3',title:tabArr[2].title,orderList:this.orderList3}
      this.order4={name:'4',title:tabArr[3].title,orderList:this.orderList}
      this.orders = [].concat(this.order1,this.order2,this.order3,this.order4)
    },
    handleEvaluate(order) {
      console.log(order.orderId);
      this.orderId = order.orderId;
      this.keeperId = order.keeperId;
      this.show = true;
      this.isLook = false;
    },
    handleLookEvaluate(order) {
      this.orderId = order.orderId;
      this.show = true;
      this.isLook = true;
      this.$refs.evaluateDialog.lookEvaluate(order.evaluateId);
    },
    handleLookQRcode(order) {
      this.orderId = order.orderId;
      const timeSlotObj = JSON.parse(order.timeSlot)
      const text = `${order.keeperId}.${timeSlotObj.start}.${timeSlotObj.end}`;
      getQRcode(text).then((res) => {
        this.QRsrc = `http://qr.api.cli.im/newqr/create?data=${text}&kid=cliim&key=c9ca98c9b7cb2e7678c9f5d1c9bfb0f3`;
        this.QRshow = true;
      });
    },
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
