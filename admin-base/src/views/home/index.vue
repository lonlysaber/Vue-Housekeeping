<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{hourArr[hour]}}好！ {{ name }}</div>
    
  </div>
</template>
  
<script>
    import { mapGetters } from "vuex";

export default {
  name: "home",
  date(){
    return{
        hourArr:[],
        hour:""
    }
  },
  created(){
    this.hourArr = ["凌晨","早上","下午","晚上"]
    this.hour = (new Date()).getHours()
    this.hour = parseInt(this.hour/6)
  },
  computed: {
    ...mapGetters(["name"]),
    
  },
};
</script>
  
  <style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
  