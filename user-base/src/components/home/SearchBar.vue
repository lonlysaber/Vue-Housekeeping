<template>
  <div class="search-bar" @click="onClick">
    <div class="search-bar-wrapper">
      <van-icon name="search" class="search" size="16px" color="#858C96" />
      <input
        class="search-bar-input"
        placeholder-style="color:#ADB4BE"
        :placeholder="hotSearch===''?'搜索':hotSearch"
        :focus="focus"
        :disabled="disabled"
        :bindfocus="test"
        :maxlength="50"
        v-model="searchWord"
        confirm-type="search"
        @input="onChange"
        @confirm="onConfirm"
      />
      <van-icon
        v-if="searchWord!==''"
        name="clear"
        class="clear"
        size="16px"
        color="#858C96"
        @click="onClear"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    focus: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hotSearch: {
      type: String,
      default: ''
    },
    key: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchWord: ''
    }
  },
  watch: {
    key: function () {
      this.searchWord = this.key
    }
  },
  onShow () {
    if (this.key === '') { this.onClear() }
  },
  methods: {
    onClick (e) {
      this.$emit('on-click', e)
    },
    onClear () {
      this.searchWord = ''
      this.$emit('on-clear')
    },
    onChange (e) {
      const { value } = e.mp.detail
      this.$emit('on-change', value)
    },
    onConfirm (e) {
      const { value } = e.mp.detail
      this.$emit('on-confirm', value)
    },
    setWord (val) {
      this.searchWord = val
    },
    getWord () {
      return this.searchWord
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  padding: 15px 15.5px;
  background: #42b983;
  .search-bar-wrapper {
    display: flex;
    height: 40px;
    box-sizing: border-box;
    align-items: center;
    background: #f5f7f9;
    border-radius: 20px;
    padding: 12px 17px;
    .search-bar-input {
      flex: 1;
      margin: 12px 8px;
    }
    .search {
      display: flex;
      height: 100%;
      align-items: center;
    }
    .clear {
      display: flex;
      height: 100%;
      align-items: center;
    }
  }
}
</style>
