<template>
  <div class="user-list">
    <el-row :gutter="20">
      <div class="people_title"><span class="blue_circle "><i class="fa fa-file-text-o blue-icon-i1"></i></span>用户详情
      </div>
    </el-row>
    <div class="user-details">
        <ul class="user-left">
          <li><label>用户名：</label><span>{{userDetails.userName}}</span></li>
          <li><label>身份证姓名：</label><span>{{userDetails.name}}</span></li>
          <li><label>身份证号码：</label><span>{{userDetails.idCard}}</span></li>
          <li><label>手机号：</label><span>{{userDetails.mobile}}</span></li>
          <li><label>用户头像：</label><span>{{userDetails.avetorUrl}}</span></li>
          <li><label>用户状态：</label><span>{{userDetails.status}}</span></li>
          <li><label>创建人ID：</label><span>{{userDetails.createUid}}</span></li>
          <li><label>创建时间：</label><span>{{userDetails.createTime}}</span></li>
          <li><label>修改时间：</label><span>{{userDetails.updateTime}}</span></li>
        </ul>
        <div class="user-right">
          <ul>
          <p class="title">全部角色</p>
          <button v-for="(role ,key) in roleDate"
                  :class="{
                      'userli-back':role.sign%2!=0,
                      'userliDis':!roleBtTrue,
                      'user-b-true':role.sign%2!=0 && !roleBtTrue,
                      'user-b-false':role.sign%2==0 && !roleBtTrue
                    }"
                  @click="roleSign(role.id)"
                  :disabled="roleBtTrue">
            {{role.name}}
          </button>
          </ul>
          <button class="b-false" v-if="!roleBtTrue" @click="roleRemove()">确定</button>
        </div>
      <div class="b-bottom">
        <button class="b-false" @click="roleRemove()">取消</button>
        <button class="b-true" @click="testRole()">关联角色</button>
      </div>
    </div>

    <!--<el-button-->
      <!--@click="userEdit()">编辑</el-button>-->
    <el-button
      @click="userRole()">用户角色管理</el-button>

    <el-dialog
      title="用户关联角色"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="30%">

      <!--内层弹窗-->
      <el-dialog
        width="30%"
        title="消息提示"
        :visible.sync="roleVisible"
        append-to-body>

        <p>请勾选角色，角色不能为空！</p>

      </el-dialog>


      <el-checkbox-group v-model="form.type" v-for='(item,index) in roleDate' :key="index">
        <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="userNewRole(form.type)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs';
    export default {
        name: "user-details",
        data(){
          return{
            user:JSON.parse(localStorage.getItem("userDetails")),
            userDetails:'',
            roleDate:[],
            form: {
              type: [],
            },
            dialogVisible:false,
            roleVisible:false,
            roleList:[],
            roleBtTrue:true

          }
        },
        mounted(){
          this.userDetaList();
          this.userRoleList();
        },
        methods:{
          //模拟添加角色
          userRoleList(){
            let th=this;
            th.roleList = [];

            let listRole = [{
              name:'系统',
              id:'1',
              number:1
            },{
              name:'领导',
              id:'2',
              number:2
            }];
            for(let i=0;i<listRole.length;i++){
              listRole[i].sign = 0;
              let j=listRole[i]
              th.roleList.push(j);
              if(th.roleList[i].number==1){
                th.roleList[i].sign+=1;
              }
            }
          },
          testRole(){
            this.roleBtTrue = false;
          },
          roleRemove(){
            this.roleBtTrue = true;
            this.userRoleList();
          },
          roleSign(signid){
            let th = this;
            for(let i=0;i<th.roleList.length;i++){
              if(th.roleList[i].id==signid){
                th.roleList[i].sign+=1;
              }
            }
          },
          //初始获取用户信息
          userDetaList(){
            let th = this;
            let userDeta={
              id:th.user.id,
              sz_token:JSON.parse(sessionStorage.getItem("szToken"))
            }
            axios.post('xueliang/user/queryUser', qs.stringify(userDeta))
              .then(response => {
                this.userDetails = response.data.value;
              })
              .catch(err => {
                this.$message({
                  message:  '系统错误请等待.....',
                  type: 'warning',
                  duration:500
                });
              });
          },
          //用户获取角色列表
          userRole(){
            this.roleDate=[];
            let roleToken ={
              sz_token:JSON.parse(sessionStorage.getItem("szToken"))
            }
            if(roleToken.sz_token ){
              let  th = this;
              axios.post('xueliang/role/queryRoleList', qs.stringify(roleToken))
                .then(response => {
                    //获取角色列表 让用户与管理的角色进行勾选
                    for(let i=0;i<response.data.value.list.length;i++){
                      response.data.value.list[i].sign=0;
                      this.roleDate.push(response.data.value.list[i])
                    }
                    if(response.data.value.list.length>0){
                      let userRole={
                        id:th.user.id,
                        sz_token:JSON.parse(sessionStorage.getItem("szToken"))
                      }
                      axios.post('xueliang/user/queryUserRole', qs.stringify(userRole))//用户有多少角色
                        .then(response => {
                          if(response.data.message == '成功'){
                            //这里来绑定显示不显示
                            th.form.type = [];
                            for(var i=0;i< response.data.value.length;i++){
                              th.form.type.push(response.data.value[i].roleId);
                            }
                            //这里放弹窗
                            this.dialogVisible=true;
                          }else{
                            this.$message({
                              message: response.data.message,
                              type: 'success',
                              duration:500
                            });
                          }
                        })
                        .catch(err => {
                         console.log(err);
                        });
                    }else{

                      let userRole={
                        id:th.user.id,
                        sz_token:JSON.parse(sessionStorage.getItem("szToken"))
                      }
                      axios.post('xueliang/user/queryUserRole', qs.stringify(userRole))//用户有多少角色
                        .then(response => {
                          if(response.data.message == '成功'){

                            this.dialogVisible=true;
                          }else{
                            this.$message({
                              message: response.data.message,
                              type: 'success',
                              duration:500
                            });
                          }

                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }

                })
                .catch(err => {
                  console.log(err);
                });
              //
            }
          },

          //获取角色列表之后用户角色新增
          userNewRole(roleList) {
            let th = this;
            if (roleList.join(",") == '') {
               th.roleVisible = true;
            } else {
              let userNewRole = {
                userId: this.user.id,
                roleIds: roleList.join(","),
                sz_token: JSON.parse(sessionStorage.getItem("szToken"))
              }
              axios.post('xueliang/user/insertUserRole', qs.stringify(userNewRole))
                .then(response => {
                  if (response.data.message == '保存成功') {
                    this.$message({
                      message: response.data.message,
                      type: 'success',
                      duration: 500
                    });
                    th.dialogVisible = false
                  } else {
                    this.$message({
                      message: response.data.message,
                      type: 'success',
                      duration: 500
                    });
                  }
                  // this.userDetails = response.data;
                })
                .catch(err => {
                  this.$message({
                    message: '系统错误请等待.....',
                    type: 'warning',
                    duration: 500
                  });
                });
            }
          }
        }
    }
</script>

<style scoped>
.user-details{
  float: left;
  width: 100%;
  margin-bottom: 10px;
  display: flex;
}
.user-left{
  width:70% ;
  float: left;
  padding: 3%;
}

.user-left li{
  float: left;
  width: 50%;
  margin: 5px 0px;
}
.user-left label{
  width: 98px;
  display: inline-block;
  float: left;
  text-align: right;
  margin-right: 4px;
}
  .user-right{
    position: fixed;
    right: 0px;
    height: 100%;
    background: #f2f5f9;
    float: right;
    max-width: 260px;
    min-width: 260px;
    width: 26%;
    border-left: solid 1px #e1e5eb;
    text-align: center;
  }

.user-right ul button{
  width: 243px;
  height: 30px;
  border-radius: 2px;
  margin:0px auto 9px;
  background: #ccc;
  color: #fff;
  text-align: center;
  line-height: 30px;
  display: inline-block;
  border: none;
  transition: all 0.25s ease;
}
.userli-back{
  background-color: #ffc545 !important;
}
  .user-b-true{
    background-color: rgb(245, 175, 20);
    box-shadow: 3px 3px 10px #969292;
  }
  .user-b-true:active{
    background-color: #e6a410 !important;
    box-shadow: 1px 1px 10px #969292;
   }
  .user-b-false{
    background: #ddd !important;
    box-shadow: 3px 3px 10px #969292;
  }
.user-b-false:active{
  background: #afabab !important;
  box-shadow: 1px 1px 10px #969292;
}


.title{
  width: 100%;
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  text-align: center;
  border-bottom: solid 1px #d2d2d2;
  margin-bottom: 9px;
}



</style>
