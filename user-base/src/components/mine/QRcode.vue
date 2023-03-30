<template>
  <div class="QRcode-dialog">
    <van-dialog
      :async-close="true"
      use-slot
      title="服务二维码"
      :show="QRshow"
      @close="onClose"
    >
      <div class="QRcode-rate">
        <van-image
          width="200"
          height="200"
          :src="QRsrc"
        >
          <van-image use-loading-slot>
            <van-loading slot="loading" type="spinner" size="20" vertical />
          </van-image>
        </van-image>
      </div>
    </van-dialog>
  </div>
</template>
  
  <script>
export default {
  name: "QRcodeDialog",
  props: {
    QRshow: {
      type: Boolean,
      default: false,
    },
    QRsrc:{
        type:String,
        default:'#'
    }
  },
  data() {
    return {
      isShow:false
    };
  },
  
  methods: {
    onClose() {
      this.$emit("close");
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.QRcode-dialog {
  padding: 20px;
  .QRcode-rate {
    text-align: center;
    margin: 10px;
  }
}
</style>
  