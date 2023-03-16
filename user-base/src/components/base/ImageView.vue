<template>
  <van-image 
    lazy-load
    :round="round"
    width="100"
    height="100"
    :src="src"
    :fit="fit"
    @click="onClcik"
  >
  </van-image>
</template>

<script>
export default {
  name: '',
  props: {
    src: {
      type: String,
      default: 'https://img.yzcdn.cn/vant/cat.jpeg'
    },
    round: {
      type: Boolean,
      default: true
    },
    fit: {
      type: String,
      default: 'fill'
    }
  },
  data () {
    return {}
  },
  components: {},
  methods: {
    onClcik (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
