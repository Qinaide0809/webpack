<template>
  <el-header class="header">
    <!--<button class="sidebar-true" @click="sidebar()"><i class="fa fa-align-justify" ></i>社会治安综合治理信息平台</button>-->
    <router-link to="/view/index" class="logoin-text">社会治安综合治理信息平台</router-link >
    <!--<router-link to="/view/Index">主页</router-link>-->
     <!--<div class="personage">-->
       <!--<div class="person-anma" :class="{personanma:searchAn}">-->
         <!--<input v-model="search" placeholder="请输入内容" :class="{searcinput:searchAn}">-->
         <!--<button class="search-show" @click="searchShow()"  :class="{searchb1:searchAn}">-->
           <!--<i class="fa fa-search"></i>-->
           <!--<button class="search-hide"-->
                   <!--@click="searchHide($event)"-->
                   <!--:class="{searchb2:searchAn}">-->
                   <!--<i class="fa fa-times" ></i>-->
           <!--</button>-->
         <!--</button>-->
       <!--</div>-->
      <!--<el-dropdown  >-->
        <!--<span class="el-dropdown-link">-->
         <!--<img :src="userimg" class="user-img"> 个人中心-->
        <!--</span>-->
        <!--<el-dropdown-menu slot="dropdown">-->
          <!--<el-dropdown-item >-->
            <!--<router-link to="/">-->
            <!--<i class="fa fa-envelope-o"></i>-->
              <!--<el-badge :value="msg" class="item">-->
                <!--我的消息-->
              <!--</el-badge>-->
            <!--</router-link>-->
          <!--</el-dropdown-item>-->
          <!--<el-dropdown-item><span @click="resourceNew()"><i class="fa fa-gear"></i>资源权限配置</span></el-dropdown-item>-->
          <!--<el-dropdown-item><span @click="sessRemoveItem()"><i class="fa fa-gear"></i> 注销</span></el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->

     <!--</div>-->
    <el-col :span="6" class="flex-end fl-r">
      <div class="myinfo flex-end">
        <p class="flex-mid-center">
          <img :src="userData.userimg">
        </p>
        <p class="flex-mid-center">
          <label>{{userData.name}} <span>({{userData.role}})</span></label>
        </p>
        <p class="flex-mid-center message-icon">
          <span v-show="msg" class="flex-message-icon"></span><i class="icon-bell"></i>
        </p>
        <p class="flex-mid-center">
          <el-dropdown>
          <span class="el-dropdown-link">
               <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >
              <router-link to="/">
                <i class="fa fa-envelope-o"></i>
                <el-badge :value="msg" class="item">
                  我的消息
                </el-badge>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item><span @click="resourceNew()"><i class="fa fa-gear"></i>资源管理新增</span></el-dropdown-item>
            <el-dropdown-item><span @click="sessRemoveItem()"><i class="fa fa-gear"></i> 注销</span></el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>
        </p>
      </div>
    </el-col>
  </el-header>
</template>

<script>
	import axios from 'axios'
  import qs from 'qs';
  import Index from "../view/Index";
  import sidebar from "../modules/sidebar";
  import bus  from '@/assets/eventBus'

	export default {
    components: {Index,sidebar},
    data: function() {
      return {
        msg:'7',
        name:'测试组件',
        search:'',
        accessToken:'',
        solidTrue:false,
        searchAn:false,
        userData:{
          name:"",
          role:'admin',
          userimg:'../static/images/timg.gif',
        }
      };
    },
		mounted() {
        this.token();
        this.userName();
		},
		methods: {
      searchShow(){
        this.searchAn=true;
      },
      userName(){
        if(JSON.parse(sessionStorage.getItem("userDetails"))){
          let userDetails=JSON.parse(sessionStorage.getItem("userDetails"));
          this.userData.name=userDetails.username;
        }
      },
      searchHide(event){
        if ( event && event.stopPropagation ){
          event.stopPropagation();
          this.searchAn=false;
        }else{
          event.cancelBubble = true;
          this.searchAn=false;
        }
      },
      sidebar(){
         this.solidTrue=!this.solidTrue;
         bus.$emit("solidMenu",this.solidTrue)
      },
      token(){
        let sz_token=JSON.parse(sessionStorage.getItem("wholeTree"));
        if(sz_token){
          this.accessToken = sz_token.sz_token;
          this.logoinKeyGo();
        }
      },
      //获取sessionStorage
      logoinKeyGo(){
        let loginKen= JSON.parse(sessionStorage.getItem("szToken"));
        bus.$emit("loginKen",loginKen)
      },
      //清除sessionStorage
      sessRemoveItem(){
        let szToken={
          sz_token:JSON.parse(sessionStorage.getItem("szToken"))
        }
        axios.post('xueliang/user/logout', qs.stringify(szToken))
          .then(response => {
            if( response.data.message == '成功'){
              sessionStorage.removeItem("wholeTree");
              sessionStorage.removeItem("szToken");
              sessionStorage.removeItem("userDetails");
              let removeTrem='removeSess';
              bus.$emit("removeTrem",removeTrem)
              this.$message({
                message: response.data.message,
                type: 'success'
              });
              this.accessToken=''
              this.$router.push('/')
            }

          })
          .catch(err => {
            console.log(err);
          });

      },
      resourceNew(){
        this.$router.push('/view/resource/resourceNew')
      }
  }
	}
</script>

<style lang="scss">
  .el-header {
    color: #333;
    line-height: 64px;
    width: 100%;
  }
  .header{
    padding: 0 0px 0px 20px!important;
    border-bottom: 2px solid #3bbcff;
    height: 64px !important;
    background: #084dac;
    color: #fff;
    overflow: hidden;
    position: fixed;
    top: 0px;
    z-index: 1;
    .logoin-text{
      font-size: 20px;
      color: #fff;
    }
    .message-icon{
      position: relative;
      .flex-message-icon{
        width: 5px;
        height: 5px;
        background-color: #ff5722;
        display: inline-block;
        position: absolute;
        right: 3px;
        top: 20px;
        border-radius:50% ;
      }
    }

    .flex-end{
      height: 100%;
    }
    a,i{
      color: #fff;
      cursor: pointer;
    }
    .myinfo {
      height: 100%;
      background: #0059bb;
      width: 250px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: inline-block;
        padding: 11px 0px;
      }
      p {
        margin: 0 5px;
        font-size: 12px;
        line-height: 100%;
        i {
          font-size: 16px;
        }
        .icon-bell{
          font-size: 24px;
        }
        &:last-child {
          margin-right: 10px;
        }
      }
    }
  }

  .login{
    background: #4b8ee6;
    height: 36px;
    padding: 0px 18px;
    border: none;
    border-radius: 3px;
    color: #fff;
  }

  /*版本迭代*/

</style>
