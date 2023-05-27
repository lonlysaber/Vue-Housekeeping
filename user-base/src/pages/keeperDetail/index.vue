<template>
  <div>
    <div class="keeperInfo">
      <div class="itembox">
        <div>
          <img class="recommendImg" :src="keeper.keeperAvatar" alt="" />
        </div>
        <div class="item-right">
          <div class="name">姓名：{{ keeper.keeperName }}</div>
          <div class="service">服务：{{ keeper.service.serviceBigType }}-{{ keeper.service.serviceSmallType }}</div>
          <div class="star">星级：{{ keeper.star }}</div>
          <!-- <div class="price">价位：{{ keeper.price }}</div> -->
        </div>
      </div>
      <van-tabs :active="active" @change="onChange">
        <van-tab title="人员简介">
          <div class="dec-box">
            <p class="dec">性别：{{ keeper.keeperGender }}</p>
            <p class="dec">普通话： 一般 </p>
            <p class="dec">籍贯：{{ keeper.nativePlace }}</p>
            <p class="dec">性格：{{ keeper.feature }}</p>
            <p class="dec">就业时间：{{ keeper.years }}年</p>
            <p class="dec">服务经验：{{ keeper.introduce }}</p>
          </div>
        </van-tab>
        <van-tab title="人员评价">
          
          <div class="evaluates">
            <div
              class="evaluate-item"
              v-for="(item, index) in evaluates"
              :key="index"
            >
              <div class="eva-top">
                <div class="user">
                  {{ item.user.userName }}
                </div>
                <div class="time">
                  {{ item.evaluateTime }}
                </div>
              </div>
              <div class="cutline"></div>
              <div class="eva-bottom">
                <div class="star">
                  <van-rate
                    readonly
                    :value="item.evaluateStar"
                    allow-half
                    void-icon="star"
                    void-color="#eee"
                  />
                  <div class="star-text">({{ item.evaluateStar }}星)</div>
                </div>
                <div class="eva-detail">
                  {{ item.evaluateDetail  }}
                </div>
              </div>
            </div>
          </div>
          <div class="noData" v-if="evaluates.length===0">
            <p style="text-align: center;">暂无数据</p>
          </div>
        </van-tab>
      </van-tabs>
      <div class="bottom-box">
        <div class="box">
            <div class="tohome">
              <button @click="toHome">回到首页</button>
            </div>
            <div class="appointment">
              <button @click="appointment">我要预约</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { list } from '../../api/evaluate'
import {queryKeeperById} from '../../api/wechat'
import {timeFormat} from '../../utils/time'
export default {
  components: {},
  data() {
    return {
      active: 0,
      keeperId:'10001',
      keeper: {},
      evaluates: [],
    };
  },
  onShow() {},
  onLoad (options) {
    this.keeperId = options.id
    this.getKeeperInfo()
    this.getEvaluates()
      // console.log(options)
  },
  methods: {
    onChange(event) {
      // console.log(event);
    },
    // 获取服务人员身份信息
    getKeeperInfo(){
      queryKeeperById(this.keeperId).then(res=>{
        this.keeper = res.data
      }).catch(error=>{
        console.log(error)
      })
    },
    // 获取评论信息
    getEvaluates(){
      let data = {keeperId:this.keeperId}
      list(data).then(res=>{
        res.data.forEach(item=>{
          item.evaluateTime = timeFormat(item.evaluateTime)
        })
        this.evaluates = res.data
        
      }).catch(error=>{
        console.log(error)
      })
    },

    toHome() {
        wx.switchTab({
            url: '../index/main',
          })
    },
    appointment() {
        this.$router.push('../appointment/main?id='+this.keeperId)
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.keeperInfo {
  .itembox {
    padding-top: 10px;
    background-color: azure;
    margin: 5px 0;
    padding: 5px;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .recommendImg {
      width: 80px;
      height: 80px;
    }

    .item-right {
      margin-left: 20px;
      flex-grow: 1;
    }

    .recommend-item-name {
      font-size: 13px;
      overflow: hidden;
    }
  }

  .dec-box {
    padding: 10px;
  }
  .evaluates {
    padding: 10px;
    .evaluate-item {
      border: 1px solid;
      margin: 10px 0;
      // padding: 5px;
      border-radius: 5px;
      .cutline {
        width: 100%;
        height: 0.2rpx;
        background-color: black;
      }
      .eva-top {
        display: flex;
        flex-direction: row;
        margin: 5px;
        justify-content: space-between;
      }
      .eva-bottom {
        margin: 5px;
        .star {
          display: flex;
          flex-direction: row;
        }
      }
    }
  }
  .bottom-box {
    position: fixed;
    bottom: 0px;
    width: 100%;
    text-align: center;
    .box{
        width: 80%;
        margin: auto;
        display: flex;
        flex-direction: row;
        height: 50px;
        justify-content: space-evenly;
    }
    // text-align: center;
  }
}

.hello {
  color: red;
}
</style>
  