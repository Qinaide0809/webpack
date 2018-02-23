<template>
  <div class="padding-concnet">
    <h3>角色关联权限</h3>
    <ul class="user-details">
      <li><label>用户名：</label><span>{{user.name}}</span></li>
      <li><label>身份证姓名：</label><span>{{user.name}}</span></li>
      <li><label>身份证号码：</label><span>{{user.idCard}}</span></li>
      <li><label>手机号：</label><span>{{user.mobile}}</span></li>
      <li><label>用户头像：</label><span>{{user.avetorUrl}}</span></li>
      <li><label>用户状态：</label><span>{{user.status}}</span></li>
      <li><label>创建人ID：</label><span>{{user.createUid}}</span></li>
      <li><label>创建时间：</label><span>{{user.createDate}}</span></li>
      <li><label>修改时间：</label><span>{{user.version}}</span></li>
    </ul>
    <el-button
      @click="resourceInit()">角色关联权限</el-button>

    <el-dialog
      title="角色关联资源"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="30%">


      <el-tree
        class="menu-tree"
        :data="permissionsTree"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>


      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getCheckedKeys()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import bus  from '@/assets/eventBus';
  import axios from 'axios';
  import qs from 'qs';
  import sidebar from '../../modules/sidebar'
  export default {
    name: "user-details",
    data(){
      return{
        user:JSON.parse(localStorage.getItem("roleResource")),
        //树数据源
        permissionsTree: [],
        defaultProps: {
          children: 'child',
          label: 'name'
        },
        userDetails:'',
        roleDate:[],
        form: {
          type: [],
        },
        dialogVisible:false
      }
    },
    methods:{
      userDetaList(){
        let th = this;
        let userDeta={
          id:th.user.id,
          sz_token:JSON.parse(sessionStorage.getItem("szToken"))
        }
        axios.post('enc/user/queryUser', qs.stringify(userDeta))
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
      //权限树
      resourceInit(){
        let th=this;
        let tokin={
          sz_token:JSON.parse(sessionStorage.getItem("szToken"))
        }
        axios.post('xueliang/resource/loadALLMenu',qs.stringify(tokin)).then(response=>{
          if(response.data.message == '成功'){
            th.dialogVisible = true;
            if(response.data.value){
              th.permissionsTree = [response.data.value];
            }
            //角色想关联资源列表
              let roleResourc={
                id:th.user.id,
                sz_token:JSON.parse(sessionStorage.getItem("szToken"))
              }
              axios.post('xueliang/role/queryRoleResource',qs.stringify(roleResourc)).then(response=>{
                if(response.data.message == '成功'){
                  let setCheck=[];
                  for(let i=0;i< response.data.value.length;i++){
                    setCheck.push( response.data.value[i].id)
                  }
                  if(this.$refs.tree && setCheck.length > 0){
                    th.$refs.tree.setCheckedKeys(setCheck);
                  }
                }else{
                  this.$message({
                    message: response.data.message,
                    type: 'success'
                  });
                }
              }).catch(err=>{
                  this.$message({
                    message: "系统错误....111",
                    type: 'success'
                  });
                }
              )

          }else{
            this.$message({
              message: response.data.message,
              type: 'success'
            });
          }
        }).catch(err=>{
            this.$message({
              message: "系统错误....",
              type: 'success'
            });
          }
        )
      },
      //获取角色管理权限
      getCheckedKeys(){
        let th = this;
        let resourceId = this.$refs.tree.getCheckedKeys();
        let reIds =this.$refs.tree.getCheckedAll();
        console.log(resourceId)
        let roleResIds ={
          roleId:this.user.id,
          //resourceIds:resourceId.join(","),
          resourceIds:resourceId.join(",")+","+reIds.join(","),
          sz_token:JSON.parse(sessionStorage.getItem("szToken"))
        }
        axios.post('xueliang/role/insertRoleResource', qs.stringify(roleResIds))
          .then(response => {
            if(response.data.message =='保存成功'){
              this.$message({
                message: response.data.message,
                type: 'success',
                duration:500
              });
              th.dialogVisible = false;
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

            }else{
              this.$message({
                message: response.data.message,
                type: 'success',
                duration:500
              });
            }
            // this.userDetails = response.data;
          })
          .catch(err => {
            this.$message({
              message:  '系统错误请等待.....',
              type: 'warning',
              duration:500
            });
          });
      },
      //点击当前节点
      handleNodeClick(data) {
        // changed By zhangting
        this.form.parentName = data.text;
        this.form.parentId = data.id;
        console.log(this.form);
      },

    },
    mounted(){
      // this.resourceInit();

    }
  }
</script>

<style scoped>
  .user-details{
    float: left;
    width: 100%;
    margin-bottom: 10px;
  }
  .user-details li{
    float: left;
    width: 50%;
    margin: 5px 0px;
  }
  .user-details label{
    width: 98px;
    display: inline-block;
    float: left;
    text-align: right;
    margin-right: 4px;
  }

</style>
