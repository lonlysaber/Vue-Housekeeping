<template>
  <div class="chart">
    <div class="message-box">
      <div class="title">
        <div class="money">预约消息</div>
      </div>
      <div class="message-item" v-if="keeperId==10001">
        <div class="time">
          <div class="start">开始时间：2023-5-21 14:00</div>
          <div class="end">结束时间：2023-5-21 17:00</div>
        </div>
        <div class="user">
          客户：张进哲
        </div>
      </div>
      <div class="no-item" v-else>
        暂无新预约
      </div>
    </div>
    <div class="top">
      <div class="title">
        本月收入(元)
        <div class="money">￥{{ count }}</div>
      </div>
    </div>
    <!-- <div class="middle">
      <div class="dateLine">
        <img :src="chart" alt="">
      </div>
    </div> -->
    <div class="bottom">
      <div class="orderList">
        <div class="orderItem" v-for="(item, index) in orderList" :key="index">
          <div class="service">
            {{ item.service.serviceBigType }}-{{
              item.service.serviceSmallType
            }}
          </div>
          <div class="date">
            {{ item.day }}
          </div>
          <div class="money">￥{{ item.money }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { queryCondition } from '../../api/order';
export default {
  name: "KeeperChart",
  data() {
    return {
      count: 0,
      keeperId:10001,
      chart: require('../../../static/chart.png'), 
      orderList: [
      ],
    };
  },
  created(){
    // this.fetchData()
    console.log('c')
    this.keeperId = this.$store.getters.token || 10001
    // this.fetchData()
    this.getKeeperOrder()
  },
  onShow(){
    // this.count = 0
    // this.fetchData()
    console.log('s')

  },
  methods: {
    getKeeperOrder(){
      queryCondition({keeperId:this.keeperId}).then(res=>{
        this.orderList = res.data
        this.fetchData()
        console.log(res)
      }).catch(error=>{
        console.log(error,'queryConditionError')
      })
    },
    fetchData(){
        let tmp = []
        this.orderList.forEach(item=>{
            if(item.status=='3'||item.status=='6'){
                tmp.push(item)
                this.count += item.money
            }
        })
        this.orderList = tmp
    },
    onClick(id) {
      this.$emit("click", id);
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.chart {
  background-color: #dadadc;
  padding: 10px;
  height: 100vh;
  .message-box{
    padding: 5px 10px;
    margin:5px 0;
    background-color: #fff;
    
    .money{
      font-size: 25px;
    }

  }
  .top{
    padding: 5px 10px;
    margin:5px 0;
    background-color: #fff;
    .title .money {
    font-size: 50px;
    }
  }
  .middle{
    padding: 5px 10px;
    background-color: #fff;
    .dateLine img{
        width: 100%;
    }
  }
  .bottom{
    .orderItem{
        padding: 5px 10px;
        margin:5px 0;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    
  }
  
}
</style>
  