<template>
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
              <div class="title-label"><p>{{obj.nickName}}</p></div>
            </div>
            <div slot="label" class="label">
              <div class="label-content">{{obj.content}}</div>
              <div v-if="obj.feedback!==''&&obj.feedback!==null" class="label-feedback">商家回复:{{obj.feedback}}</div>
            </div>
          </van-cell>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Evaluate',
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.title{
  display: flex;
  vertical-align: middle;
  .title-label{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left:5px;
  }
}
.label{
  .label-content{
    padding: 10px;
  }
  .label-feedback{
    padding:10px;
    background:rgb(219, 219, 219);
    color: white;
    margin-left:40px;
  }
}
</style>
