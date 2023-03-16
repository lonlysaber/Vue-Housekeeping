<template>
  <div class="evaluate-dialog">
    <van-dialog :async-close="true" use-slot title="评价" :show="show" show-cancel-button @confirm="handleEvaluate" @close="onClose">
      <div class="evaluate-rate">
        <van-rate :value="form.score" @change="onChange"/>
      </div>
      <div class="evaluate-textarea">
        <textarea v-model="form.evaluate" placeholder="请输入评价"/>
      </div>
    </van-dialog>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Toast from 'vant-weapp/dist/toast/toast'
import { create } from '../../api/evaluate'

export default {
  name: 'EvaluateDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      form: {
        score: '',
        evaluate: ''
      }
    }
  },
  methods: {
    onChange (e) {
      this.form.score = e.mp.detail
    },
    handleEvaluate () {
      if (this.form.score === '' || this.form.evaluate === '') {
        Toast.fail('评分或评价不能为空')
      } else {
        const openid = mpvue.getStorageSync('openid')
        create(this.id, openid, this.form.score, this.form.evaluate).then(res => {
          this.show = false
          this.$emit('success', this.id)
          this.score = ''
          this.evaluate = ''
        }).catch(err => {
          console.log(err)
        })
      }
    },
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.evaluate-dialog{
  padding: 20px;
  .evaluate-rate{
    text-align: center;
    margin:10px
  }
  .evaluate-textarea{
    background: #e4e4e4;
    margin:10px 30px;
    padding:10px;
  }
}
</style>
