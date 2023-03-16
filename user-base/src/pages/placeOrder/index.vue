<template>
  <div class="order">
    <div class="order-header">
      <div v-if="!order.serviceAddress">请填写个人信息</div>
      <div v-else>
        <div class="address">{{order.serviceAddress}}</div>
        <div>
          <span class="name">{{order.name}}</span>
          <span class="contact">{{order.contact}}</span>
        </div>
      </div>
    </div>
    <div class="order-profile">
      <van-cell-group>
        <van-cell is-link url="../setting/profile/main" title="姓名" :label="order.name" />
        <van-cell is-link url="../setting/profile/main" title="联系方式" :label="order.contact" />
        <van-cell is-link url="../setting/address/main" title="服务地址" :label="order.serviceAddress" />
        <van-cell is-link title="服务日期" :label="order.serviceDate" @click="calendarVisible=true" />
      </van-cell-group>
    </div>
    <div class="order-info">
      <van-cell-group>
        <van-cell use-label-slot title="订单信息">
          <div slot="label">
            <div class="item">
              <div class="item-label">产品编号</div>
              <div class="item-value">{{order.commodityID}}</div>
            </div>
            <div class="item">
              <div class="item-label">服务名称</div>
              <div class="item-value">{{order.commodityName}}</div>
            </div>
            <div class="item">
              <div class="item-label">类别</div>
              <div class="item-value">{{order.className}}</div>
            </div>
            <div class="item">
              <div class="item-label">价格</div>
              <div class="item-value">{{order.price}}￥</div>
            </div>
            <div class="item" v-if="order.promotionPrice!==''&&order.promotionPrice!==null">
              <div class="item-label">活动价</div>
              <div class="item-value">{{order.promotionPrice}}￥</div>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
    <van-submit-bar
      :price="order.promotionPrice!==''&&order.promotionPrice!==null?order.promotionPrice*100:order.price*100"
      button-type="primary"
      button-text="提交订单"
      decimal-length="2"
      @submit="onSubmit"
    />
    <van-popup :show="calendarVisible" position="bottom" custom-style="height: 35%;">
      <van-datetime-picker
        type="date"
        :value="selectDate"
        :min-date="minDate"
        @confirm="selectDate"
        @cancel="calendarVisible=false"
      />
    </van-popup>
    <van-toast id="van-toast" />
    <van-notify id="van-notify" />
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import { order, create } from '../../api/order'
import moment from 'moment'
import Toast from 'vant-weapp/dist/toast/toast'
import Notify from 'vant-weapp/dist/notify/notify'
import Dialog from 'vant-weapp/dist/dialog/dialog'

export default {
  components: {},
  data () {
    return {
      minDate: new Date().getTime(),
      commodityID: '',
      openid: '',
      order: {},
      calendarVisible: false
    }
  },
  onLoad (options) {
    this.commodityID = options.commodityID
    this.openid = options.openid
  },
  onShow () {
    this.fetchData(this.commodityID, this.openid)
  },
  methods: {
    fetchData (commodityID, openid) {
      order(commodityID, openid)
        .then(res => {
          this.order = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSubmit () {
      const data = { ...this.order }
      console.log(data)
      if (!this.order.serviceDate || this.order.name === '' || this.order.name === null || this.order.serviceAddress === '' || this.order.serviceAddress === null || this.order.contact === '' || this.order.contact === null) {
        Toast.fail('请输入个人联系信息')
      } else {
        Dialog.confirm({
          title: '等待支付',
          message: '是否立即支付订单?',
          asyncClose: true
        })
          .then(() => {
            this.order.status = '待服务'
            create(this.order).then(res => {
              Notify({ type: 'success', message: '支付成功' })
              setTimeout(() => {
                mpvue.redirectTo({url: '../order/main?tab=2'})
              }, 1000)
            }).catch(err => [
              console.log(err)
            ])
          })
          .catch(() => {
            this.order.status = '待支付'
            create(this.order).then(res => {
              Notify({ type: 'success', message: '下单成功' })
              setTimeout(() => {
                mpvue.redirectTo({url: '../order/main?tab=1'})
              }, 1000)
            }).catch(err => [
              console.log(err)
            ])
            Dialog.close()
          })
      }
    },
    selectDate (e) {
      const selectDate = e.mp.detail
      this.order.serviceDate = moment(selectDate).format('YYYY-MM-DD')
      this.calendarVisible = false
      return selectDate
    }
  }
}
</script>

<style lang="scss" scoped>
.order {
  background-color: #e5e5e5;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  overflow: auto;
  overscroll-behavior-y: contain;
  .order-header {
    background: #42b983;
    color: white;
    text-align: center;
    padding-bottom: 20px;
    .address {
      font-weight: 600;
    }
    .name {
      padding: 3px;
    }
    .contact {
      padding: 3px;
    }
  }
  .order-info {
    margin: 10px 0;
    .item {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
