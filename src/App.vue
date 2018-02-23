<template>
	<div id="app">
    <router-view name="headers"></router-view>
    <el-container class="app-view">
      <el-aside width="230px" :class="{'silid-left':solidTrue,'silid-right':!solidTrue}">
        <sidebar></sidebar>
      </el-aside>
      <el-main >
        <router-view></router-view>
      </el-main>
    </el-container>
    <myfotter></myfotter>
    <!--<anmation></anmation>-->
	</div>
</template>

<script>
	import headers  from './components/header/Header'
	import myfotter  from './components/fotter/Fotter'
  import sidebar  from './components/modules/sidebar'
  import anmation  from '@/components/modules/anmation'
  import bus  from '@/assets/eventBus' //中央线程
  import qs from 'qs';
  export default {
		name: 'app',
    data(){
        return{
          solidTrue:false
        }
    },
    mounted(){
		  let th = this;
      bus.$on('solidMenu',solid=>{
            this.solidTrue=solid;
        }
      ),
        window.onbeforeunload = onbeforeunload_handler;
      window.onunload = onunload_handler;
      function onbeforeunload_handler()
      {
        var warning="确认退出?";
        th.sessRemoveItem();
        return warning;
      }

      function onunload_handler()
      {
        var warning="谢谢光临";
        th.sessRemoveItem();
        alert(warning);
      }
    },
    methods:{
      sessRemoveItem(){
        let szToken= JSON.parse(sessionStorage.getItem("szToken"));
        console.log(szToken);
        axios.post('enc/member/logout.do', qs.stringify(szToken))
          .then(response => {
            let removeTrem='removeSess';
            bus.$emit("removeTrem",removeTrem)
            this.$message({
              message: response.data.message,
              type: 'success'
            });
            this.$router.push('/')


          })
          .catch(err => {
            console.log(err);
          });
      }
    },
		components:{headers,myfotter,sidebar,anmation}
	}
</script>

<style lang="scss">
	#app {
    /*font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;*/
    color: #23374e;
		margin-top: 0px;
    font-size: 14px;
    padding: 0px;
	}
  .app-view{
    margin-top: 64px;
    float: left;
    width: 100%;
  }
  .silid-left{
    margin-left: -230px;
    transition: all 0.5s ease-in-out;
  }
  .silid-right{
    margin-left: 0px;
    transition: all 0.5s ease-in-out;
  }
  body{
    padding: 0px;
    margin: 0px;
  }
  ul{
    padding: 0px;
    margin: 0px;
  }
  li{
    list-style: none;
  }
  a{
    cursor: pointer;
  }
  .el-main{
    padding: 0px;
  }
</style>
