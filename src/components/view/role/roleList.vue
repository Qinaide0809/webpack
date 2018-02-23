<template>
  <div class="user-list">
    <el-row :gutter="20">
      <div class="people_title"><span class="blue_circle "><i class="fa fa-cog blue-icon-i1"></i></span>全部角色
        <el-button type="success" @click="roleNew()" size="small" class="people_out btn_normal btn_yellow">添加</el-button>
        <div class="searchBar fl-r">
          <i class="el-icon-search"></i>
          <input type="text"   v-model="searchList.id" v-on:input="roleInit()" />
          <!--<el-button type="primary" @click="onSubmit()" >搜索</el-button>-->
        </div>
      </div>
    </el-row>

      <!--<el-row :gutter="20" class="m-b-10">-->
        <!--<el-col :span="3" class="l-h-40">用户名</el-col>-->
        <!--<el-col :span="8">-->
          <!--<el-input-->
            <!--placeholder="请输入用户名"-->
            <!--v-model="searchList.name"-->
            <!--clearable>-->
          <!--</el-input>-->
        <!--</el-col>-->
        <!--<el-col :span="3" class="l-h-40">身份证号码</el-col>-->
        <!--<el-col :span="8">-->
          <!--<el-input-->
            <!--placeholder="请输入身份证"-->
            <!--v-model="searchList.idCard"-->
            <!--clearable>-->
          <!--</el-input>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row :gutter="20"  class="m-b-10">-->
        <!--<el-col :span="3" class="l-h-40">身份证姓名</el-col>-->
        <!--<el-col :span="8">-->
          <!--<el-input-->
            <!--placeholder="请输入姓名"-->
            <!--v-model="searchList.userName"-->
            <!--clearable>-->
          <!--</el-input>-->
        <!--</el-col>-->
        <!--<el-col :span="3" class="l-h-40">手机号</el-col>-->
        <!--<el-col :span="8">-->
          <!--<el-input-->
            <!--placeholder="请输入手机号"-->
            <!--v-model="searchList.mobile"-->
            <!--clearable>-->
          <!--</el-input>-->
        <!--</el-col>-->
      <!--</el-row>-->
        <!--<el-col :span="4"><el-button type="primary" @click="roleInit()" >搜索</el-button></el-col>-->
      <!--<el-col :span="4">-->
      <!--<el-button-->
        <!--type="success"-->
        <!--@click="roleNew()">新增角色</el-button>-->
      <!--</el-col>-->


  <el-table
    v-loading="loading"
    :data="tableData5"
    style="width: 100%">
    <el-table-column
      label="Id"
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
      label="版本更新时间"
      prop="version">
    </el-table-column>
    <el-table-column label="操作" >
      <template slot-scope="scope" style="width: 120px">
        <el-button
          size="mini"
          type="danger"
          @click="reovueRole(scope.$index, scope.row)">删除</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="roleResource(scope.$index, scope.row)">关联权限</el-button>
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
          userName:'',
          name:'',
          idCard:'',
          mobile:'',
          sz_token:JSON.parse(sessionStorage.getItem("szToken"))
        },
        loading: ''
      }
    },
    mounted(){
       this.roleInit();
    },
    methods:{
      //初始加载数据
      roleInit(){
        let th = this;
        th.loading = true;
        axios.post('xueliang/role/queryRoleList', qs.stringify(this.searchList))
          .then(response => {
            if(response.data.message = "成功"){
              th.tableData5= [];
              th.tableData5 = response.data.value.list;
              th.loading = false;
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
      },
      reovueRole(index,row){
        let th = this;
        th.tableData5 = [];
        let data={
          id:row.id,
          sz_token:JSON.parse(sessionStorage.getItem("szToken"))
        }
        axios.post('xueliang/role/deleteUser', qs.stringify(data))
          .then(response => {
            if(response.data.message = "刪除成功"){
              th.tableData5 = [];
              th.roleInit();
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
      roleResource(index,row){
        let roleList=row
        if(roleList!=undefined){
          localStorage.setItem("roleResource",JSON.stringify(roleList));
          this.$router.push('/view/role/roleResource');
        }
      },
      roleNew(){
          this.$router.push('/view/role/roleNew');

      }


    }
  }
</script>
