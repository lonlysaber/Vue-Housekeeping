<template>
  <div class="address">
    <div class="header">
      <van-cell-group>
        <van-cell :is-link="isEdit" title="省" :value="province" @click="editRegion" />
        <van-cell :is-link="isEdit" title="市" :value="city" @click="editRegion" />
        <van-cell :is-link="isEdit" title="区/县" :value="area" @click="editRegion" />
        <van-cell
          :use-label-slot="isEdit"
          title="详细地址"
          :value="place"
        >
          <div slot="label">
            <van-field :value="place" placeholder="请输入详细地址" @change="onChange" />
          </div>
        </van-cell>
      </van-cell-group>
    </div>
    <div v-if="!isEdit" class="body">
      <van-cell-group>
        <van-cell title="修改" is-link @click="isEdit=true" />
      </van-cell-group>
    </div>
    <div v-else class="buttom">
      <van-button size="large" class="bottom-button" @click="cancelEdit" block>取消</van-button>
      <van-button size="large" class="bottom-button" @click="handleEdit" block>确定</van-button>
    </div>
    <van-popup :show="show" position="bottom" custom-style="height: 40%;">
      <van-area
        :area-list="areaList"
        :columns-placeholder="['请选择', '请选择', '请选择']"
        @confirm="handleRegion"
        @cancel="show=false"
      />
    </van-popup>
    <van-toast id="van-toast" />
    <van-notify id="van-notify" />
  </div>
</template>

<script>
import areaList from '../../../utils/region'
import Toast from 'vant-weapp/dist/toast/toast'
import Notify from 'vant-weapp/dist/notify/notify'
import { updateAddress, query } from '../../../api/customer'

export default {
  data () {
    return {
      areaList: areaList,
      show: false,
      isEdit: false,
      province: '',
      city: '',
      area: '',
      place: '',
      address: ''
    }
  },
  onShow () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const openid = mpvue.getStorageSync('openid')
      query(openid).then(res => {
        this.address = res.data.serviceAddress
        const arr = this.address.split(' ')
        this.province = arr[0]
        this.city = arr[1]
        this.area = arr[2]
        this.place = arr[3]
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit () {
      if (this.province === '' || this.city === '' || this.area === '' || this.place === '') {
        Toast.fail('信息不能为空')
      } else {
        const address = `${this.province} ${this.city} ${this.area} ${this.place}`
        const openid = mpvue.getStorageSync('openid')
        updateAddress(openid, address).then(res => {
          Notify({ type: 'success', message: '修改成功' })
          this.isEdit = false
          // eslint-disable-next-line no-undef
          const pages = getCurrentPages()
          const currentUrl = pages[pages.length - 2].route
          if (currentUrl === 'pages/placeOrder/main') {
            this.$router.back()
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    onChange (e) {
      this.place = e.mp.detail
    },
    editRegion () {
      if (this.isEdit) { this.show = true }
    },
    handleRegion (e) {
      const select = e.mp.detail.values
      this.province = select[0].name
      this.city = select[1].name
      this.area = select[2].name
      this.show = false
    },
    cancelEdit () {
      this.isEdit = false
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
