<template>
  <div class="appointment">
    <van-tabs :active="active">
      <van-tab
        v-for="(item, index) in dateList"
        :title="item.dayTime"
        :key="index"
      >
        <div class="hourTime">
            <van-radio
              name="hourIndex"
              v-for="(hourItem, hourIndex) in item.hourTime"
              :key="hourIndex"
            >
            <div class="hourItem" @click="clickHourItem(index,hourIndex)">
              <div class="start">{{ hourItem.start }}</div>
              <div class="end">{{ hourItem.end }}</div>
              <div class="check">{{ current==hourIndex?'√':' ' }}</div>
            </div>
              
            </van-radio>

        </div>
      </van-tab>
    </van-tabs>
    <div class="bottom-box">
        <div class="box">

            <div class="appointment">
              <button @click="appointment">我要预约</button>
            </div>
        </div>
      </div>
      <van-toast id="van-toast" />
  </div>
</template>
  
<script>
  import Toast from "vant-weapp/dist/toast/toast";
  import {createAppointment} from '../../api/appointment'
  import { create } from "../../api/order";
export default {
  components: {},
  data() {
    return {
      current:0,
      radio: 1,
      active: 0,
      keeperId: "10001",
      dateList: [
        {
          dayTime: "5-21",
          hourTime: [
            { start: "9:00", end: "13:00",timeSlot:{start: "1684630800", end: "1684645200"}, type: "保姆" },
            { start: "14:00", end: "17:00",timeSlot:{start: "1684648800", end: "1684659600"}, type: "保姆" },
          ],
        },
        {
          dayTime: "5-22",
          hourTime: [
            { start: "9:00", end: "11:00",timeSlot:{start: "1684717200", end: "1684724400"}, type: "保姆" },
            { start: "14:00", end: "17:00",timeSlot:{start: "1684735200", end: "1684746000"}, type: "保姆" },
          ],
        },
      ],
    };
  },
  onLoad(options) {
    this.keeperId = options.id;
    // this.getKeeperInfo()
    // this.getEvaluates()
    console.log(options);
  },
  methods: {
    onReady() {
      wx.scanQRCode({
        desc: "请对准二维码", // 扫一扫工具提示语
        needResult: 1, // 返回扫描结果
        success: function (res) {
          var result = res.resultStr; // 获取扫描结果
          alert("扫描成功，扫描结果为：" + result); // 使用alert弹窗显示扫描结果
        },
      });
    },
    onChange(e) {
      console.log(e);
    },
    onClick(e) {
      console.log(e);
    },
    clickHourItem(index,hourIndex){
      this.active = index
      this.current = hourIndex
    },
    appointment(){

      let time = this.dateList[this.active].hourTime[this.current].timeSlot

      let data = {
        orderId:null,
        userId:this.$store.getters.token || 10001,
        keeperId:this.keeperId,
        timeSlot:JSON.stringify(time),
        status:0,
        appointmentTime:(new Date).getTime()
      }
      let order ={
        userId:this.$store.getters.token || 10001,
        keeperId:this.keeperId,
        createTime:(new Date).getTime(),
        money:'220',
        serviceId:'10018',
        timeSlot:JSON.stringify(time),
        status:0,
        payTime:null,
        evaluateId:null,
        evaluateTime:null,
      }
      
      createAppointment(data).then(res=>{
        console.log(res)
        Toast.success("预约成功!") 
        create(order).then(res=>{
          mpvue.switchTab({
              url: "../index/main",
            });
        console.log(res)
      })
      }).catch(error=>{
        Toast.success("预约失败!") 
        console.log(error)
      })
    }
  },
};
</script>
  
  <style lang="scss" >
.hello {
  color: red;
}
.appointment{
  .hourTime{
    .hourItem{
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
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
</style>
  