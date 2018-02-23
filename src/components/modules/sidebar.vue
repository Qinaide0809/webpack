<template>
  <el-row class="tac sidebar o-y">
    <div class="sideLeft">
      <div class="weather">
        <h4 class="days">{{today}}</h4>
        <p class="times">{{week}} {{time}}</p>
        <p class="winfo flex-center"><label class="weth">20°C</label><label class="wind">西南风微风</label> </p>
      </div>
      <el-tree
        :default-expand-all=true
        :expand-on-click-node=false
        class="br-menu"
        :data="wholeTree"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick">
      </el-tree>

    </div>
  </el-row>

</template>

<script>
  import bus  from '@/assets/eventBus' //中央线程
    export default {
        name: "sidebar",
        data(){
          return{
            //新版本
            screenWidth: "",
            today: "",
            week: "",
            time: "",
             //数据源
            wholeTree: [],
            defaultProps: {
              children: 'children',
              label: 'text'
            },
          }
        },
        methods: {
          handleNodeClick(data) {
            if(data.id == 2 && data.text=='用户新增'){
              this.$router.push('/view/user/userNew');
            }else if(data.id == 3  && data.text=='用户列表'){
              this.$router.push('/view/user/userList');
            }else if(data.id ==11  && data.text=='角色管理'){
              this.$router.push('/view/role/roleList');
            }else if(data.id == 6  && data.text=='资源管理'){
              this.$router.push('/view/resource/resourceList');
            }
          },
          renderContent(h, {node, data, store}) {
            return h('span', {
              class: "flex-start"
            }, [
              h('i', {
                class: node.icon,
                style: {
                  marginRight: '8px'
                }
              }),
              h('span',{
                class: "flex-mid-center",
              }, node.label)
            ]);
          },
          dataTree(){
            let wholeTreeData=JSON.parse(sessionStorage.getItem("wholeTree"));
            if(wholeTreeData){
              if(wholeTreeData.sz_menu != null){
                this.wholeTree =[ wholeTreeData.sz_menu];
              }else{
                this.wholeTree =wholeTreeData;
              }
            }else{
              this.wholeTree=[];
            }
          },
          //动态获取时间
          getTodayDate() {
            let myDate = new Date();
//        this.today=myDate.toLocaleDateString().replace(/\//g,'-');
            let today = myDate.getFullYear() + "年" + this.sup(myDate.getMonth() + 1) + "月" + this.sup(myDate.getDate())+"日";
            let time = this.sup(myDate.getHours()) + ":" + this.sup(myDate.getMinutes());
            this.today = today;
            this.time = time;
            switch (myDate.getDay()) {
              case 0:
                this.week = "星期日";
                break;
              case 1:
                this.week = "星期一";
                break;
              case 2:
                this.week = "星期二";
                break;
              case 3:
                this.week = "星期三";
                break;
              case 4:
                this.week = "星期四";
                break;
              case 5:
                this.week = "星期五";
                break;
              case 6:
                this.week = "星期六";
                break
            }
          },
          sup(n) {
            return (n < 10) ? '0' + n : n;
          }
        },
        mounted() {
          this.dataTree();
          let _self = this;
          _self.getTodayDate();
          setInterval(function () {
            _self.getTodayDate();
          }, 60000);
          //登陆进行树刷新
          bus.$on('loginKen', loginKen => {
            if (loginKen) {
              this.dataTree();
            }
            }
          );
          bus.$on('removeTrem', removeTrem => {
              if (removeTrem) {
                this.dataTree();
              }
            }
          );
          bus.$on('userAgainTree', usetTrue => {
              if (usetTrue) {
                this.dataTree();
              }
            }
          );
        }
    }
</script>

<style lang="scss">
 .sidebar{
   overflow-y: auto;
   position: fixed;
   width: 230px;
   height: 100%;
   background: #2f3337;
 }
 .el-menu{
   border-right:0px ;
 }
 .br-menu{
   color: #c1c1c1;
   float: left;
   width: 100%;
   background: #182f4b;
 }

 .weather {
   float: left;
   width: 100%;
   text-align: center;
   background: -moz-linear-gradient(top, #1464d3 0%, #1b8dd0 100%);
   background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #1464d3), color-stop(100%, #1b8dd0));
   background: -webkit-linear-gradient(top, #1464d3 0%, #1b8dd0 100%);
   background: -o-linear-gradient(top, #1464d3 0%, #1b8dd0 100%);
   background: -ms-linear-gradient(top, #1464d3 0%, #1b8dd0 100%);
   background: linear-gradient(to bottom, #1464d3 0%, #1b8dd0 100%);
   color: #fff;
   .days {
     font-size: 20px;
     font-weight: normal;
     padding: 6px 0;
   }
   .times {
     font-size: 14px;
   }
   .winfo{
     margin: 12px 0;
     line-height: 20px;
     .weth{
       background: url("../../../static/images/clound.png") left center no-repeat;
       background-size: 24px;
       text-indent: 30px;
       font-size: 12px;
       margin-right: 12px;
     }
     .wind{
       height: 20px;
       background: url("../../../static/images/wind.png") left center no-repeat;
       background-size: 16px;
       text-indent: 22px;
       font-size: 12px;
     }
   }

 }


 .sideLeft {
   position: relative;
   .el-tree {
     background: transparent;
   }

   .el-tree-node__content {
     background: #363b41;
     color: #ffffff;
     height: 40px;
     position: relative;
     &:after {
       content: "";
       width: 100%;
       height: 1px;
       background: #555;
       position: absolute;
       bottom: 0;
     }
     &:before {
       content: "";
       width: 100%;
       height: 1px;
       background: #252b31;
       position: absolute;
       bottom: 1px;
     }
   }
   .el-tree-node:focus > .el-tree-node__content, .el-tree-node__content:hover {
     background-color: #363b41;
   }
   .el-tree-node__children {
     .el-tree-node__content {
       background: #2f3337;
       border-bottom: 0;
       padding-left: 40px !important;
       &:after, &:before {
         content: "";
         height: 0;
       }
     }
     .el-tree-node:focus, .el-tree-node:hover {
       background: -moz-linear-gradient(left, #1466d3 0%, #1889d3 100%);
       background: -webkit-gradient(linear, left top, right top, color-stop(0%, #1466d3), color-stop(100%, #1889d3));
       background: -webkit-linear-gradient(left, #1466d3 0%, #1889d3 100%);
       background: -o-linear-gradient(left, #1466d3 0%, #1889d3 100%);
       background: -ms-linear-gradient(left, #1466d3 0%, #1889d3 100%);
       background: linear-gradient(to right, #1466d3 0%, #1889d3 100%);
       position: relative;
       &:after {
         content: "";
         width: 5px !important;
         height: 100% !important;
         background: #ffcc5c;
         position: absolute;
         left: 0;
         top: 0;
       }
     }
     .el-tree-node:focus > .el-tree-node__content, .el-tree-node__content:hover {
       background-color: transparent;
     }
   }
   [class^="icon-"], [class*=" icon-"] {
     font-size: 30px;
     width: 26px;
     display: inline-block;
   }
   .icon-icon1 {
     font-size: 26px;
   }
   .icon-icon7 {
     font-size: 22px;
   }
 }

</style>
