<template>
  <div class="login">
    <div class="login-content">
      <el-form :model="form" status-icon :rules="rules2" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')" class="submint">登陆</el-button>
          <!--<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>-->
        </el-form-item>
        <!--<el-form-item label="" >-->

          <!--<router-link to="/view/userRegister" >注册</router-link>-->


        <!--</el-form-item>-->
      </el-form>
    </div>
  </div>
</template>

<script>
  import bus  from '@/assets/eventBus'
  import axios from 'axios'
  import qs from 'qs';
  import {setCookie,getCookie} from '../../assets/js/cookie.js'
  export default {
    data() {
      let th = this;
      let vUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      let vPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };

      return {
        form: {
          username: 'xn67744',//bob
          password: '123456',
          loginType: '0'
        },
        rules2: {
          username: [
            { validator: vUserName, trigger: 'blur' }
          ],
          password: [
            { validator: vPassword, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      onSubmit(formName) {
        let th = this;
        th.dataMessage = '';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('xueliang/user/login', qs.stringify(this.form))
              .then(response => {
                  if(response.data.message == '成功'){
                  this.$message({
                    message: response.data.message,
                    type: 'success',
                    duration:1000
                  });
                    //用户账户和密码
                    let userDetails = JSON.stringify(this.form);
                    sessionStorage.setItem('userDetails', userDetails);
                    let szToken = JSON.stringify(response.data.value.sz_token);
                    //全部szToken暂时没有
                    sessionStorage.setItem('szToken', szToken);
                    let weleTreeData=[
                      {
                        text:"后台管理",
                        icon:"icon-icon6",
                        children:[
                          {
                            id:'3',
                            text:"用户列表",
                            icon:"icon-icon1",
                          },
                          {
                            id:'5',
                            text:"角色管理",
                            icon:"icon-icon1",
                          },
                          {
                            id:'6',
                            text:"资源管理",
                            icon:"icon-icon1",
                          }
                        ]
                      }
                    ];
                  //如果返回字符串
                  if(response.data.value != null){
                    if(response.data.value.sz_menu!=null){
                      let wholeTree = JSON.stringify(response.data.value);
                      sessionStorage.setItem('wholeTree', wholeTree);
                    }else{
                      let wholeTree = JSON.stringify(weleTreeData);
                      sessionStorage.setItem('wholeTree', wholeTree);
                    }
                    this.$router.push('/view/Index')
                  }else{//当前没有数据
                    let wholeTree = JSON.stringify(weleTreeData);
                    sessionStorage.setItem('wholeTree', wholeTree);
                    this.$router.push('/view/Index')
                  }
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
          } else {
            this.$message({
              message: response.data.message,
              type: 'success'
            });
            return false;
          }
        });
      }
    },
    mounted(){

    }
  }
</script>

<style scoped>
  .login{
    width: 100%;
    position: absolute;
    height: 100%;
    float: left;
    margin: 0px;
    left: 0px;
    top: 0px;
    background: linear-gradient(45deg,#3a33f1 0,#112644 100%);
    color: #fff;
    font-size:18px ;
    padding: 0px;
  }

  .login:after{
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("../../../static/images/login.png") repeat center center;
    opacity: .4;
  }
  .login-content{
    width: 400px;
    padding: 30px 20px 20px 10px;
    background: #fff;
    box-shadow: 0px 0px 20px #112644;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -106px 0px 0px -215px;
    border-radius: 4px;
    z-index: 3;
  }
  .submint{
    width: 302px;
  }


</style>
