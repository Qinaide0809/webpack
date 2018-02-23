<template>
  <div class="">
    <div class="login-content padding-concnet">
      <el-form :model="form" status-icon :rules="rules2" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="form.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordPass">
          <el-input type="password" v-model="form.passwordPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证姓名" prop="name">
          <el-input type="text" v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input type="text" v-model="form.idCard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input type="text" v-model="form.mobile" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="验证码">
          <el-col :span="15">
            <el-input v-model.trim="form.code"></el-input>
          </el-col>
          <el-col :span="8" class="fl-r">
            <el-button type="primary" @click="authCode" style="width: 100%;" :disabled="codeShow">{{code}}</el-button>
          </el-col>
        </el-form-item>

        <el-form-item label="头像" >
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/static/image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.avetorUrl" :src="form.avetorUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')" class="submint">创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import bus  from '@/assets/eventBus'
  import axios from 'axios'
  import qs from 'qs';
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
      //密码
      let vPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (th.form.password !== '') {
            th.$refs.form.validateField('passwordPass');
          }
          callback();
        }
      };
      let vPasswordPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== th.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      //身份证号码验证
      let vIdCard = (rule, value, callback) => {
        let code=value
        let  city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        setTimeout(() => {
          if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
            callback(new Error('身份证号格式错误'));
          }
          else if(!city[code.substr(0,2)]){
            callback(new Error('地址编码错误'));
          }
          else{
            if(code.length == 18){
              code = code.split('');
              //∑(ai×Wi)(mod 11)
              //加权因子
              var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
              //校验位
              var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
              var sum = 0;
              var ai = 0;
              var wi = 0;
              for (var i = 0; i < 17; i++)
              {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
              }
              var last = parity[sum % 11];
              if(parity[sum % 11] != code[17]){
                callback(new Error('校验位错误'));
              }else{
                callback();
              }
            }
          }
        }, 1000);
      };
      //手机号验证
      let vMobile = (rule, value, callback) => {
        // if (!value) {
        //   return callback(new Error('年龄不能为空'));
        // }
        let mobile = value;
        let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        setTimeout(() => {
          th.codeShow =true;
          if(mobile.length!=11)
          {
            callback(new Error('请输入有效的手机号码!'));
          }else if(!myreg.test(mobile)){
            callback(new Error('请输入格式正确的手机号码!'));
          }else{
            callback();
            th.codeShow =false;
          }
        }, 1000);
      };
      return {
        form: {
          userName: '王二狗',
          password: '123456',
          passwordPass:'123456',
          name:'王天然',
          idCard:'361024198912139655',
          mobile:'15272282370',
          avetorUrl:'../static/image/dev.jpg',
          sz_token:JSON.parse(sessionStorage.getItem("szToken"))
        },
        code:'验证码',
        codeShow:true,
        rules2: {
          userName: [
            { validator: vUserName, trigger: 'blur' }
          ],
          password: [
            { validator: vPassword, trigger: 'blur' }
          ],
          passwordPass: [
            { validator: vPasswordPass, trigger: 'blur' }
          ],
          idCard: [
            { validator: vIdCard, trigger: 'blur' }
          ],
          mobile: [
            { validator: vMobile, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      onSubmit(formName) {
        let th = this;
        th.dataMessage = '';
        this.$refs[formName].validate((valid) => {
          console.log(valid);
          if (valid) {
            axios.post('enc/user/insertOrUpdateUser', qs.stringify(this.form))
              .then(response => {

                  this.$message({
                    message: response.data.message,
                    type: 'success'
                  });

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
      getRandNum() { //随机6位数
        var Num="";
        for(var i=0;i<6;i++)
        {
          Num+=Math.floor(Math.random()*10);
        }
        return Num;
      },
      authCode(){
        let th = this;
        th.code = 60;
        setTimeout(function () {
          th.form.code = th.getRandNum()
        },3000)
        let setTime = setInterval(function () {
          th.code--;
          if(th.form.code){
            th.timeTrue=false;
            th.code="获取验证码";
            clearInterval(setTime)
          }
          if(th.code == 0){
            th.timeTrue=false;
            th.code="获取验证码"
            clearInterval(setTime)
          }
        },1000)
      },
      //获取当前返回上传url
      handleAvatarSuccess(res, file) {
        let th =this;
        th.form.avetorUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'images/jpeg';
        const isPNG = file.type === 'images/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG ) {

          this.$message.error('上传头像图片只能是 JPG或PNG格式!');
        }

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        console.log("已经执行完成");
        return (isJPG || isPNG) && isLt2M;
      }
    },
    mounted(){

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
