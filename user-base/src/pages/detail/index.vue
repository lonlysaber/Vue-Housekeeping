<template>
  <div>
    <Banner :list="list" />
    <div class="body">
      <van-cell-group>
        <van-cell>
          <div class="info-title" slot="title">{{item.name}}</div>
          <div>
            <div v-if="item.promotionPrice!==''&&item.promotionPrice!==null">
              <div class="info-price">{{item.promotionPrice}}￥</div>
              <div class="info-oriPrice">原价:{{item.price}}￥</div>
            </div>
            <div v-else class="info-price">{{item.price}}￥</div>
          </div>
        </van-cell>
        <van-cell title="产品描述" :label="item.describe" />
        <van-cell use-label-slot title="评价">
          <div slot="label" class="body-evaluates">
            <!-- <Evaluate :list="items" /> -->
            <div>
              <div v-if="items.length===0" style="text-align:center">目前没有评论</div>
              <div v-else>
                <van-cell-group>
                  <div v-for="(obj,index) in items" :key="index">
                    <van-cell use-label-slot>
                      <div slot="title" class="title">
                        <div>
                          <van-image round width="30" height="30" :src="obj.avatar" />
                        </div>
                        <div class="title-label">
                          <p>{{obj.nickName}}</p>
                        </div>
                      </div>
                      <div slot="label" class="label">
                        <div class="label-content">{{obj.content}}</div>
                        <div
                          v-if="obj.feedback!==''&&obj.feedback!==null"
                          class="label-feedback"
                        >商家回复:{{obj.feedback}}</div>
                      </div>
                    </van-cell>
                  </div>
                </van-cell-group>
              </div>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
    <Baseline />
    <div class="bottom">
      <van-goods-action safe-area-inset-bottom>
        <van-goods-action-button block color="#42b983" text="立即下单" @click="onOrder" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import { queryCommodity } from '../../api/commodity'
import { list } from '../../api/evaluate'
import { check } from '../../utils/check'
import Banner from '../../components/home/Banner'
import Evaluate from '../../components/base/Evaluate'
import Baseline from '../../components/base/Baseline'

export default {
  components: {
    Banner,
    Evaluate,
    Baseline
  },
  data () {
    return {
      id: '',
      list: [],
      items: [],
      item: {}
    }
  },
  onLoad (options) {
    this.id = options.id
  },
  mounted () {
    console.log(this.fetchData)
    this.fetchData(this.id)
    this.fetchList()
  },
  onUnLoad () {
    this.items = []
  },
  methods: {
    fetchData (id) {
      queryCommodity(id)
        .then(res => {
          this.item = res.data
          this.list = this.item.show.split(',').map(val => {
            return { url: val }
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchList () {
      list(this.id)
        .then(res => {
          this.items = check(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    onOrder () {
      const openid = mpvue.getStorageSync('openid')
      mpvue.navigateTo({url: `../placeOrder/main?commodityID=${this.id}&openid=${openid}`})
    }
  }
}
</script>

<style lang="scss" scoped>
.info-title {
  font-size: 25px;
}
.info-price {
  color: rgb(255, 187, 0);
  font-size: 25px;
  font-weight: 600;
}
.info-oriPrice {
  font-size: 16px;
  text-decoration: line-through;
}
.title {
  display: flex;
  vertical-align: middle;
  .title-label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 5px;
  }
}
.label {
  .label-content {
    padding: 10px;
  }
  .label-feedback {
    padding: 10px;
    background: rgb(219, 219, 219);
    color: white;
    margin-left: 40px;
  }
}
</style>
