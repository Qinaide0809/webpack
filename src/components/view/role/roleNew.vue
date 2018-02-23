<template>
  <div class="">
    <div class="login-content padding-concnet">
      <el-form :model="form" status-icon :rules="rules2" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>


        <el-form-item label="角色编码" prop="code">
          <el-input v-model.number="form.code"></el-input>
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
        if (!value) {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };


      return {
        form: {
          name:'王天然',
          code: '',
          id:'',
          sz_token:JSON.parse(sessionStorage.getItem("szToken"))
        },
        code:'验证码',
        codeShow:true,
        rules2: {
          name: [
            { validator: vUserName, trigger: 'blur' }
          ],
          code: [
            { validator: checkAge, trigger: 'blur' }
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
            axios.post('enc/role/insertOrUpdateRole', qs.stringify(this.form))
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
