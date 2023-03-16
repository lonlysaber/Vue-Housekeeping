<template>
  <div class="address">
    <div class="header">
      <van-cell-group>
        <van-cell
          :use-label-slot="isEdit"
          title="姓名"
          :value="name"
        >
          <div slot="label">
            <van-field :value="name" placeholder="请输入姓名" @change="nameChange" />
          </div>
        </van-cell>
        <van-cell
          :use-label-slot="isEdit"
          title="联系电话"
          :value="contact"
        >
          <div slot="label">
            <van-field :value="contact" placeholder="请输入联系电话" @change="contactChange" />
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
    <van-toast id="van-toast" />
    <van-notify id="van-notify" />
  </div>
</template>

<script>
import Toast from 'vant-weapp/dist/toast/toast'
import Notify from 'vant-weapp/dist/notify/notify'
import { updateProfile, query } from '../../../api/customer'

export default {
  data () {
    return {
      show: false,
      isEdit: false,
      name: '',
      contact: ''
    }
  },
  onShow () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const openid = mpvue.getStorageSync('openid')
      query(openid).then(res => {
        this.name = res.data.name
        this.contact = res.data.contact
      }).catch(err => {
        Toast.fail(err)
      })
    },
    handleEdit () {
      if (this.name === '' || this.contact === '' || this.name === null || this.contact === null) {
        Toast.fail('信息不能为空')
      } else {
        const openid = mpvue.getStorageSync('openid')
        updateProfile(openid, this.name, this.contact).then(res => {
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
    nameChange (e) {
      this.name = e.mp.detail
    },
    contactChange (e) {
      this.contact = e.mp.detail
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
