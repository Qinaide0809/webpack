<template>
  <div class="sideLeft">
    <div class="weather">
      <h4 class="days">{{today}}</h4>
      <p class="times">{{week}} {{time}}</p>
      <p class="winfo flex-center"><label class="weth">20°C</label><label class="wind">西南风微风</label> </p>
    </div>
    <el-tree :data="data" :props="defaultProps"  :render-content="renderContent" @node-click="handleNodeClick"></el-tree>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        screenWidth: "",
        today: "",
        week: "",
        time: "",
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data.url);
        if(data.url){
          this.$router.push(data.url)
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
      let _self = this;
      _self.getTodayDate();
      setInterval(function () {
        _self.getTodayDate();
      }, 1000);

      this.$ajax({
        type:"get",
        url:"../static/json/sidebar.json",
        dataType:"json"
      }).then(function (res) {
        _self.data=res.data;
      })
    }
  }
</script>
<style lang="scss">
  .sideLeft {
    position: relative;
    .el-tree{
      background: transparent;
    }
    .weather {
      height: 94px;
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
    .el-tree-node__content {
      background: #363b41;
      color: #ffffff;
      height: 40px;
      position: relative;
      &:after{
          content: "";
          width:100%;
          height: 1px;
          background: #555;
          position: absolute;
          bottom:0;
        }
      &:before{
        content: "";
        width:100%;
        height: 1px;
        background: #252b31;
        position: absolute;
        bottom:1px;
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
      .el-tree-node:focus,.el-tree-node:hover{
        background: -moz-linear-gradient(left, #1466d3 0%, #1889d3 100%);
        background: -webkit-gradient(linear, left top, right top, color-stop(0%, #1466d3), color-stop(100%, #1889d3));
        background: -webkit-linear-gradient(left, #1466d3 0%, #1889d3 100%);
        background: -o-linear-gradient(left, #1466d3 0%, #1889d3 100%);
        background: -ms-linear-gradient(left, #1466d3 0%, #1889d3 100%);
        background: linear-gradient(to right, #1466d3 0%, #1889d3 100%);
        position: relative;
        &:after{
          content: "";
          width: 5px !important;
          height: 100% !important;
          background: #ffcc5c;
          position: absolute;
          left: 0;
          top:0;
        }
      }
      .el-tree-node:focus > .el-tree-node__content, .el-tree-node__content:hover {
        background-color: transparent;
      }
    }
    [class^="icon-"], [class*=" icon-"]{
      font-size: 30px;
      width:26px;
      display:inline-block;
    }
    .icon-icon1{
      font-size: 26px;
    }
    .icon-icon7{
      font-size: 22px;
    }
  }

</style>
