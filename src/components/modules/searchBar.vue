<template>
  <div class="searchBar">
    <i class="el-icon-search"></i>
    <input type="text" :placeholder="placeholder" @blur="onBlur" v-model="value"/>
  </div>
</template>

<script>
  export default {
    name: "search-bar",
    props: ['placeholder'],
    data () {
      return {
        value: ''
      }
    },
    methods: {
      onBlur () {
        this.$emit('onBlur', this.value);
      }
    }
  }
</script>

<style>
  .searchBar{
    display: inline-block;
    padding-right: 15px;
    height:30px;
    border-radius: 15px;
    border: 1px solid #ddd;
    background: #fff;
    line-height: 30px;
    min-width: 150px;
  }
  .searchBar i{
    position: absolute;
    margin-top: 6px;
    margin-left: -4px;
    font-size: 20px;
    color:#c7c7c7;
  }
  .searchBar input{
    margin-left: 40px;
    border: none;
    display: block;
    outline: none;
    height:30px;
    font-size: 14px;
    color:#666;
    width:160px;
  }
</style>
