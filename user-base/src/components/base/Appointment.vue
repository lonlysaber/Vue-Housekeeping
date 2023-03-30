<template>
  <div class="appointment">
    <div class="calen">
      <van-calendar
        :show="true"
        type="multiple"
        :show-title="false"
        :show-confirm="true"
        :show-subtitle="false"
        :row-height="30"
        :default-date="defaultDate"
        color="#7596dd"
        :poppable="false"
        class="calendar"
        @close="onClose"
        @confirm="confirm"
      />
    </div>

    <div class="textCell">
      <div class="none-array" v-if="appointment.length == 0">本日暂无预约</div>
      <div v-else>
        <div class="count">共{{ appointment.length }}天可预约</div>
        <div class="appointList">
          <div v-for="(item, index) in appointment" :key="index" class="appointItem" >
            <div class="dayTime">{{item.dayTime}}</div>
            <div class="houTime">
                <div class="houTimeItem" v-for="(hItem,idx) in item.hourTime"
                 :key="idx">
                    
                    <div class="timeSlot">
                        <div class="service" @click="showService(index,idx)">
                            {{ hItem.type }}
                        </div>
                        <div class="start" @click="onPick(hItem.start,index,idx)">
                            {{ hItem.start }}
                        </div>
                        &nbsp;~&nbsp;
                        <div class="end">{{ hItem.end }}</div>&nbsp;
                        <div class="delete"><p  @click="deleteItem(index,idx)">X</p></div>
                    </div>
                </div>
                <div class="handle">
                   <div class="add" @click="add(index)">+添加时间段</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nothing"></div>
    <div class="handleCell">
        <button class="noCache" @click="noCache">不保存</button>
        <button class="cache" @click="cache">保存</button>
    </div>
    <van-action-sheet
        :show="showType"
        :actions="actions"
        @close="showType = false"
        @select="onSelect"
    />
    <van-action-sheet
        :show="showPick"
        @close="onClose"
    >
    <van-datetime-picker
       type="time"
       :value="pickDate"
       :min-hour="minHour"
       :max-hour="maxHour"
       @input="onInput"
       @confirm="onConfirm"
       @cancel="showPick = false"
    />
    </van-action-sheet>
    
  </div>
</template>
  
  <script>
import { queryKeeperById } from "../../api/wechat";
export default {
  name: "Appointment",
  data() {
    return {
      show: false,
      text: "",
      keeperId: "",
      appointment: [
        {dayTime:'2023年3月30日',
        hourTime:[{start:'9:00',end:'13:00',type:'保姆'},{start:'14:00',end:'17:00',type:'保姆'}]},
        {dayTime:'2023年3月31日',
        hourTime:[{start:'9:00',end:'11:00',type:'保姆'},{start:'14:00',end:'17:00',type:'保姆'}]},
      ],
      actions: [{ name: '保姆'}],
      defaultDate: [1680105600000, 1680192000000],
      timeObj: {start:'9:00',end:'11:00'},
      showPick:false,
      showType:false,
      minHour: 10,
      maxHour: 20,
      pickDate: '12:00',
      index1:0,
      index2:0
    };
  },
  created() {
    this.getAppointment();
  },
  methods: {
    timeFormat(e){
        let oneHoue = 1000*60*60
        let hour = parseInt(e/oneHoue)
        let minute = parseInt((e % oneHoue)/1000/60) 
        return `${hour}:${minute}`
    },
    showService(index,idx){
        this.showType = true
    },
    formatTime(arr){
        arr.map(item=>{
            item.dayTime = this.$moment(item.dayTime).format('YYYY-MM-DD')
        })
        return 
    },
    add(index){
        this.appointment[index].hourTime.push(this.timeObj)
    },
    deleteItem(index,idx){
        console.log(index,idx)
        this.appointment[index].hourTime.splice(idx,1)
        console.log(this.appointment)
    },
    onPick(e,index,idx){
        this.showPick = true
        this.pickDate = e
        this.index1 = index
        this.index2 = idx
    },
    onSelect(event) {
        console.log(event.mp.detail);
    },
    onDisplay() {
      this.show = true;
    },
    confirm(event) {
      console.log(event);
      console.log(event.mp.detail.map((a) => a.getTime()));
      this.show = false;
      this.text = `选择了 ${event.mp.detail.length} 个日期`;
    },
    onConfirm(){
        this.showPick = false
    },
    onInput(event) {
        this.appointment[this.index1].hourTime[this.index2].start = event.mp.detail
        console.log(event.mp.detail)
    },
    getAppointment() {
      this.keeperId = this.$store.getters.token || 10001;
      queryKeeperById(this.keeperId).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
  
<style lang="scss" scoped>
.appointment {
  background-color: #dadadc;
  height: 100%;
  .calen{
    padding: 10px;
    height: 50vh;
  }
  .calendar {
    --calendar-height: 50vh;
  }

  .textCell {
    .none-array {
      text-align: center;
      background-color: #fff;
      margin: 0 10px;
      height: 30px;
    }
    .count {
      text-align: center;
      margin: 10px 10px 0 10px;
      background-color: #fff;
      padding: 10px;

    }
    .appointItem {
      text-align: center;
      margin: 10px;
      background-color: #fff;
      padding: 10px;
      .timeSlot{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
      }
    }
  }
  .nothing{
    height: 60px;
  }
  .handleCell{
    position: fixed;
    bottom: 0;
    display: flex;
    margin: 0 10px;
    justify-content: center;
    width: 95%;
    flex-direction: row;

    .noCache{
        background-color:#f14f1d;
        color:#fff;
        width: 50%;

    }
    .cache{
        background-color: #6666f4;
        color:#fff;
        width: 50%;

    }
  }
}
</style>
  