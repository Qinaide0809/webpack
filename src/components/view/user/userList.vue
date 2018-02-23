<template>
  <div class="user-list">
    <el-row :gutter="20">
      <div class="people_title"><span class="blue_circle "><i class="fa fa-cog blue-icon-i1"></i></span>全部人口
        <el-button type="success" @click="userNew()" size="small" class="people_out btn_normal btn_yellow">添加</el-button>
        <div class="searchBar fl-r">
          <i class="el-icon-search"></i>
          <input type="text"   v-model="searchList.id" v-on:input="onSubmit()" />
          <!--<el-button type="primary" @click="onSubmit()" >搜索</el-button>-->
        </div>
      </div>
    </el-row>

    <!--换一种方式-->
    <el-row class="people_line">
      <el-checkbox style="left: 11px;"
                   v-model="allSelected" @change="handleAllSelect" class="people_allChecked">
        全选
      </el-checkbox>
      <span>删除</span>
      <el-pagination
        class="people_page"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="20"
        layout="prev, pager, next, jumper"
        :total="tableData.length"
        :prev-text="'上一页'"
        :next-text="'下一页'"
      >
      </el-pagination>
    </el-row>
    <table class="people_table" cellspacing="0">
          <tr class="people_table_line people_table_head">
                  <td style="text-align: center ;text-indent: 0px;">
                    <el-checkbox style="    width: 12px;"
                                 v-model="allSelected" @change="handleAllSelect" class="people_allChecked">

                    </el-checkbox>
                  </td>

                  <td v-for="head in headTitle">
                  {{head}}
                </td>
          </tr>
          <tr class="people_table_line" v-for="(item, index) in tableData" :key="index">
            <td style="text-indent: 0px; "><el-checkbox  v-model="item.checked" ></el-checkbox></td>
            <td>{{item.userName}}</td>
            <td>{{item.name}}</td>
            <td>{{item.idCard}}</td>
            <td>{{item.mobile}}</td>
            <td>{{item.createDate}}</td>
            <!--<i class="icon-edit"></i>-->
            <td><i class="icon-delete" @click="reovueUser(item)"></i><a  @click="userDetails(item)">详情</a></td>
          </tr>
    </table>
    <!--换种方式结束-->



    <!--新增用户-->
    <el-dialog
      title="用户新增"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="680px">
      <!--内嵌错误提示-->
      <el-dialog
        width="30%"
        title="错误提示"
        :visible.sync="innerVisible"
        append-to-body>
        <p>{{innerTitle}}</p>
      </el-dialog>
      <!--有点坑的东西-->
      <span class="blue_circle blue-icon"><i class="fa fa-cog blue-icon-i"></i></span>

      <el-form :model="form" status-icon :rules="rules2" ref="form" label-width="100px" class="demo-ruleForm">

        <el-row >
          <el-col :span="12">
            <el-form-item label="用户名" prop="userName" >
              <el-input type="text" v-model="form.userName" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证姓名" prop="name">
              <el-input type="text" v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row >
          <el-col :span="12">
            <el-form-item label="身份证号码" prop="idCard">
              <el-input type="text" v-model="form.idCard" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model.number="form.age"></el-input>
            </el-form-item>
          </el-col>
        </el-row >

        <el-row >
          <el-col :span="12">
            <el-form-item label="员工号" prop="mobile">
              <el-input type="text" v-model="form.mobile" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="mobile">
              <el-input type="text" v-model="form.mobile" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row >

        <el-row >
          <el-col :span="12">
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="员工类型" prop="mobile">
              <el-input type="text" v-model="form.mobile" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row >

        <el-row >
          <el-col :span="12">
              <el-form-item label="地址" prop="mobile">
                <el-input type="text" v-model="form.mobile" auto-complete="off"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input type="text" v-model="form.email" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row >
        <el-row >
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码" prop="passwordPass">
              <el-input type="password" v-model="form.passwordPass" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row >
      </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="userOnSubmit('form')">新增</el-button>
           <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<style  lang="scss" scoped>
  .people_line{
  margin-left: 6px !important;
  }
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
  import searchBar from '@/components/modules/searchBar'
  import bus  from '@/assets/eventBus'
  import axios from 'axios'
  import qs from 'qs';
  export default {
    data() {
      //年龄校验
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
              callback();
          }
        }, 1000);
      };
      //用户新增校验
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
        tableData: [],
        tableDataList:false,
        searchList:{
          id:'',
          sz_token:JSON.parse(sessionStorage.getItem("szToken"))
        },
        loading: '',
        //新添加
        dataLength: 2,//分页
        startIndex: 0,
        multipleSelection: [],
        currentPage: 1,
        allSelected: false,
        dialogVisible:false,
        headTitle:["用户名","身份证姓名","身份证号码","手机号","创建时间","操作"],
        //用户新增
        form: {
          userName: '王二狗',
          password: '123456',
          passwordPass:'123456',
          name:'王天然',
          idCard:'361024198912139655',
          age:'',
          mobile:'15272282370',
          sex:'1',
          email:'',
          avetorUrl:'../static/image/dev.jpg',
          sz_token:JSON.parse(sessionStorage.getItem("szToken"))
        },
        innerVisible:false,
        innerTitle:'',
        codeShow:true,
        rules2: {
          userName: [
            { validator: vUserName, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
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
      }
    },
    mounted(){
        this.initUser();
    },
    components: {
      searchBar
    },
    methods:{
      onSubmit(){
        setTimeout(()=>{
          let th = this;
          if(th.searchList.id != ''){
            th.loading = true;
            axios.post('xueliang/user/queryUser', qs.stringify(this.searchList))
              .then(response => {
                if(response.data.message == '成功'){
                  th.tableData = [];
                  th.tableData.push(response.data.value);
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
          }else{
            th.initUser();
          }
        },500)


      },
      //初始
      initUser(){
        let th = this;
        th.loading = true;
        axios.post('xueliang/user/queryUserList', qs.stringify(this.searchList))
          .then(response => {
            if(response.data.message = "成功"){
              th.tableData = [];
              for(let i=0;i<response.data.value.list.length;i++){
                response.data.value.list[i].checked=false;
                th.tableData.push(response.data.value.list[i]);
              }
            th.loading = false;
            }
          })
          .catch(err => {
            th.loading = false;
          });
      },
      reovueUser(row){
        let th = this;
        let data={
          id:row.id,
          sz_token:JSON.parse(sessionStorage.getItem("szToken"))
        }
        axios.post('xueliang/user/deleteUser', qs.stringify(data))
          .then(response => {
            if(response.data.message = "刪除成功"){
              th.tableData = [];
               th.initUser();
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
      userDetails(row){
        let userList=row
        if(userList!=undefined){
          localStorage.setItem("userDetails",JSON.stringify(userList));
          this.$router.push('/view/user/userDetails');
        }
      },
      //新版本
      handleAllSelect () {
        this.tableData.forEach(item => {
          item.checked = this.allSelected;
        })
      },
      handleCurrentChange (val) {
        this.allSelected = false;
        this.tableData.forEach(item => {
          item.checked = false;
        });
        this.startIndex = (val - 1) * this.dataLength;
      },
      handleSingleSelect () {
        let index = 0;
        debugger
        this.tableData.forEach(item => {
          !item.checked && index++
        });
        this.allSelected = index === 0;
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      userNew(){
        this.dialogVisible = true;
        // this.$router.push('/view/user/userNew');
      },
      //用户新增
      userOnSubmit(formName) {
        let th = this;
        this.$refs[formName].validate((valid) => {
          console.log(th.form,valid);
          if (valid) {
            axios.post('xueliang/user/insertOrUpdateUser', qs.stringify(th.form))
              .then(response => {
                if(response.data.message == "保存成功"){
                  this.$message({
                    message: response.data.message,
                    type: 'success'
                  });
                  this.initUser();
                  this.dialogVisible = false;
                }else{
                  this.innerVisible = true;
                  this.innerTitle = response.data.message;
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




    }
  }
</script>
