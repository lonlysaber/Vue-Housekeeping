<template>
  <div class="banner">
    <swiper interval="2500" duration="500" autoplay indicator-dots>
      <div v-for="(item,index) in list" :key="index">
        <swiper-item>
          <van-image width="100%" height="100%" fit="fill" :src="item.url" @click="onClick(item.commodityID)"/>
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>

export default {
  name: 'Banner',
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      items: [
        {
          poromotionID: '123',
          commodityID: '123',
          poster: 'https://img.yzcdn.cn/vant/cat.jpeg'
        }
      ]
    }
  },
  methods: {
    onClick (id) {
      this.$emit('click', id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
