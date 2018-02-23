<template>
  <el-row class=" padding-concnet">
    <el-col :span="6">
      <el-tree
        :default-expand-all=true
        :expand-on-click-node=false
        class="menu-tree"
        :data="permissionsTree"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick">
      </el-tree>
      </el-col>

      <el-col :span="18">
      <el-form :model="form" status-icon :rules="rules2" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="当前节点" prop="parentName">
          <el-input type="text" v-model="form.parentName" disabled></el-input>
        </el-form-item>
        <el-form-item label="资源名称" prop="name">
          <el-input type="text" v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

        <!--<el-form-item label="资源编码" prop="code">-->
          <!--<el-input v-model.number="form.code"></el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="父级ID" prop="userName">-->
          <!--<el-input type="text" v-model="form.parentId" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="等级" >//父级的等级-->
          <!--<el-input type="text" v-model="form.level"></el-input>-->
        <!--</el-form-item>-->

        <el-form-item label="Url">
          <el-input type="text" v-model="form.url" ></el-input>
        </el-form-item>
        <el-form-item label="请求方式"><!--请求方式 post，get-->
          <el-radio-group v-model="form.method">
            <el-radio label="post">post</el-radio>
            <el-radio label="get" >get</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序方式"><!--排序方式-->
          <el-input type="text" v-model="form.rank"></el-input>
        </el-form-item>
        <el-form-item label="资源类型"><!--资源类型：[1-菜单；2-页面；3-按钮-->
          <el-radio-group v-model="form.type">
            <el-radio label="1" >菜单</el-radio>
            <el-radio label="2" >页面</el-radio>
            <el-radio label="3" >按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="class"><!--class-->
          <el-input type="text" v-model="form.sign" ></el-input>
        </el-form-item>

        <el-form-item>
          {{form.parentId}}
          <el-button type="primary" @click="onSubmit('form')" >创建子节点</el-button>
          <el-button type="danger" @click="deleteNode" >删除当前节点</el-button>
          <!--<el-button type="danger" @click="deleteNode" >编辑当前节点</el-button>-->
        </el-form-item>
      </el-form>
        </el-col>
  </el-row>
</template>

<script>
  import bus  from '@/assets/eventBus'
  import axios from 'axios'
  import qs from 'qs';
  export default {
    data() {
      let th = this;
      let checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Code不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {

              callback();

          }
        }, 1000);
      };
      let vUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };

     return {
       //数据源
        permissionsTree: [],
        defaultProps: {
          children: 'child',
          label: 'name'
        },
        form: {
          parentName: '',
          name: '',//资源名称
          // code: '1',//权限编码
          parentId:'',//自带
          url:'',
          method:['post'],
          rank:'9',
          type:[1],
          sign:'ionic1',
          id:'',
          sz_token:JSON.parse(sessionStorage.getItem("szToken"))
        },
        codeShow:true,
        rules2: {
          userName: [
            { validator: vUserName, trigger: 'blur' }
          ],
          code: [
            { validator: checkAge, trigger: 'blur' }
          ]
        },
        // changed By zhangting
        selectedResource: ''
      };
    },
    methods: {
      onSubmit(formName) {
        let th = this;
        console.log(th.form);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('xueliang/resource/insertOrUpdateResource', qs.stringify(this.form))
              .then(response => {
                if(response.data.message=='成功'){
                  debugger
                  th.permissInit();
                }else{
                  this.$message({
                    message: response.data.message,
                    type: 'success'
                  });
                }

              })
              .catch(err => {
                this.$message({
                  message: "系统错误....",
                  type: 'success'
                });
              });
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //权限树
      permissInit(){
        let th= this;
        let tokin={
          sz_token:JSON.parse(sessionStorage.getItem("szToken"))
        }
        axios.post('xueliang/resource/loadALLMenu',qs.stringify(tokin)).then(response=>{
          th.permissionsTree = [response.data.value];
          th.form.parentName = response.data.value.name;
          th.form.parentId = response.data.value.id;
          //存储删除当前节点Id
          th.selectedResource = response.data.value.id;

          th.$message({
            message: response.data.message,
            type: 'success'
          });
        }).catch(err=>{
          this.$message({
            message: "系统错误....",
            type: 'success'
          });
        }
        )
      },
      //点击当前节点
      handleNodeClick(data) {
        // changed By zhangting
        if(data.parentId!= 0){
          this.form.parentName = data.name;
          this.selectedResource = data.parentId;
        }
      },
      deleteNode () {
        if(this.selectedResource !=4 ){
          let tokin={
            sz_token:JSON.parse(sessionStorage.getItem("szToken")),
            id: this.selectedResource
          }
          console.log(tokin);
          axios.post('xueliang/resource/deleteResource',qs.stringify(tokin)).then(response=>{
            if( response.data.message == "删除成功"){
              this.$message({
                message: response.data.message,
                type: 'success'
              });
              this.permissInit();
            }
          }).catch(err=>{
              this.$message({
                message: "系统错误....",
                type: 'success'
              });
            }
          )
        }
      }
    },
    mounted(){
        this.permissInit();
    }
  }
</script>

<style scoped>
  .login{
    width: 100%;
    float: left;
  }

  .login-content{
    width: 400px;

  }
  .submint{
    width: 302px;
  }



  /*--上传组件--*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 56px;
    height: 56px;
    line-height: 56px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
