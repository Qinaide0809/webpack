<template>
  <div class="padding-concnet">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          placeholder="请输入内容"
          v-model="searchList.id"
          clearable>
        </el-input>
      </el-col>
        <el-col :span="4"><el-button type="primary" @click="onSubmit()" >搜索</el-button></el-col>
      <el-col :span="4">
        <el-button
          type="success"
          @click="resourceNew()">新增资源</el-button>
      </el-col>
    </el-row>

  <el-table
    v-loading="loading"
    :data="tableData5"
    style="width: 100%">
    <el-table-column
      label="I"
      prop="id">
    </el-table-column>
    <el-table-column
      label="名称"
      prop="name">
    </el-table-column>

    <el-table-column
      label="创建时间"
      prop="createDate">
    </el-table-column>
    <el-table-column
      label="修改人"
      prop="createUser">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="reovueResoure(scope.$index, scope.row)">删除</el-button>
        <!--<el-button-->
          <!--size="mini"-->
          <!--type="success"-->
          <!--@click="userDetails(scope.$index, scope.row)">查看详情</el-button>-->
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-button--mini, .el-button--mini.is-round {
    padding: 7px 15px;
    width: 100%;
    margin: 5px 0px !important;
  }

</style>

<script>
  import bus  from '@/assets/eventBus'
  import axios from 'axios'
  import qs from 'qs';
  export default {
    data() {
      return {
        tableData5: [],
        searchList:{
          id:'',
          sz_token:JSON.parse(sessionStorage.getItem("szToken"))
        },
        loading: ''
      }
    },
    mounted(){

          this.initResource();
    },
    methods:{
      onSubmit(){
        let th = this;
        if(th.searchList.id != ''){
          th.tableData5=[];
          th.loading = true;
          axios.post('xueliang/resource/queryResource', qs.stringify(this.searchList))
            .then(response => {
              if(response.data.message =="成功"){
                if(response.data.value !=null){
                  th.tableData5.push(response.data.value);
                  th.loading = false;
                }else{
                  this.$message({
                    message: "暂无资源",
                    type: 'success',
                    duration:500
                  });
                  th.loading = false;
                }

              }else{
                this.$message({
                  message: response.data.message,
                  type: 'success',
                  duration:500
                });
              }
            })
            .catch(err => {
              this.$message({
                message:  '系统错误请等待.....',
                type: 'warning',
                duration:500
              });
              th.loading = false;
            });
        }else{
          this.$message({
            message:  '请输入查询条件.....',
            type: 'warning',
            duration:500
          });
        }

      },
      //初始方法没有半毛钱关系
      initResource(){
        let th = this;
        th.loading = true;
        axios.post('xueliang/resource/loadALLMenu.do', qs.stringify(this.searchList))
          .then(response => {
            if(response.data.message = "成功"){
              th.tableData5 = response.data.value.child;
              th.loading = false;
            }
          })
          .catch(err => {
            th.loading = false;
          });
      },
      reovueResoure(index,row){
        let th = this;
        let data={
          id:row.id,
          sz_token:JSON.parse(sessionStorage.getItem("szToken"))
        }
        axios.post('xueliang/resource/deleteResource', qs.stringify(data))
          .then(response => {
            if(response.data.message = "刪除成功"){
              th.tableData5 = [];
              //获取登陆删除一下
              //当前进行接口请求获取左侧菜单
              let user = JSON.parse(sessionStorage.getItem("userDetails"))
              axios.post('xueliang/user/login', qs.stringify(user))
                .then(response => {
                  if(response.data.message == '成功'){
                    //先清除原有树
                    sessionStorage.removeItem("wholeTree");
                    this.$message({
                      message: response.data.message,
                      type: 'success',
                      duration:1000
                    });
                    //重新赋值树 ，树进行渲染
                    let userTrue = true;
                    let wholeTree = JSON.stringify(response.data.value);
                    //左侧菜单列表
                    sessionStorage.setItem('wholeTree', wholeTree);
                    bus.$emit("userAgainTree",userTrue)
                  }else{
                    this.$message({
                      message: response.data.message,
                      type: 'success',
                      duration:1500
                    });
                  }
                })
                .catch(err => {
                  console.log(err);
                });
              //请求结束
              // th.initUser();
              this.$message({
                message: response.data.message,
                type: 'success',
                duration:500
              });
            }else{
              this.$message({
                message: response.data.message,
                type: 'success',
                duration:500
              });
            }
          })
          .catch(err => {
            this.$message({
              message:  '系统错误请等待.....',
              type: 'warning',
              duration:500
            });
          });
      },
      resourceNew(){
        this.$router.push('/view/resource/resourceNew');
      }


    }
  }
</script>
