<template>
  <div class="recommend">
    <van-row>
      <van-col span="8">
        <div class="recommend-title" v-if="title !== ''">{{ title }}</div>
      </van-col>
    </van-row>
    <van-row gutter="5">
      <div class="recommend-item" v-for="(item, index) in list" 
      :key="index" @click="handleDetail(item.keeperId)">
        <div class="itembox">
          <div>
            <img class="recommendImg" :src="item.keeperAvatar" alt="">
            <!-- <van-image  height="90" width="90" fit="fill" :src="item.show" /> -->
          </div>
          <div class="item-right">
            <div class="box-top">
              <div class="name">姓名：{{ item.keeperName }}</div>
              <div class="star">星级：{{ item.star }}</div>
            </div>
            <div class="box-bottom">
              <div class="service">服务：{{ item.service.serviceBigType }}</div>
              <div class="service">-{{ item.service.serviceSmallType }}</div>
              <!-- <div class="price">价位：{{ item.price }}</div> -->
            </div>
          </div>
        </div>
      </div>

    </van-row>
    <van-row>
      <div class="recommend-bottom">
        <!-- <van-button size="small" custom-style="border:0px;color:#42b983" @click="handleMore">查看更多</van-button> -->

      </div>

    </van-row>
  </div>
</template>

<script>
export default {
  name: 'Recommend',
  props: {
    items: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    list: function () {
      const arr = this.items

      // if (arr.length > 5) {
      //   return arr.slice(0, 5)
      // } else {
      //   return arr
      // }
      return arr
    }
  },
  methods: {
    handleDetail(id) {
      this.$emit('click', id)
    },
    handleMore(e) {
      this.$emit('more', this.title, this.items)
      mpvue.navigateTo({ url: `../list/main?key=${this.title}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  padding: 10px 0;

  .recommend-title {
    color: #42b983;
    font-size: 20px;
    padding: 12.5px 0px;
  }

  .recommend-item {
    // display: inline-block;
    display: block;

    .itembox {

      text-align: center;
      padding-top: 10px;
      display: flex;
      flex-direction: row;
      background-color: azure;
      margin: 5px 0;
      padding: 5px;
      border-radius: 3px;
      .recommendImg {
        width: 40px;
        height: 40px;
      }
      .item-right{
        margin-left: 20px;
        flex-grow: 1;
        .box-top {
          display: flex;
          flex-direction: row;
          // justify-content:space-between;
          .name{
            width: 50%;
            text-align: left;
          }
        }
  
        .box-bottom {
          display: flex;
          flex-direction: row;
          // justify-content: space-between;
          .star{
            width:50%;
            text-align: left;
          }
        }
      }

      .recommend-item-name {
        font-size: 13px;
        overflow: hidden;
      }
    }
  }

  .recommend-bottom {
    // text-align: center;
  }

  ._van-button {
    position: relative;
    left: 45%;
    transform: translateX(-50%);
    color: #42b983;
  }
}</style>
