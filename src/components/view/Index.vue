<template>

  <div class="padding-concnet">
    <h2 id="div1"  data-student-name="Tom" data-stu='{"a":1,"b":2}'>{{msg}}</h2>
  </div>
</template>

<script>
    import bus  from '@/assets/eventBus'
    export default {
       components:{
       },//引入组件
        data() {
          return {
            msg: '欢迎来到综治云平台',
            totelNumber: [1, 2, 3, 4],
            deily: {},
            numberA:'',

          }

        },
        mounted(){
          //搜索返回数据
          let self =this;
          bus.$on('indexDeliv',msg=>{
              self.deily={
                name:msg.name
              }
             }
          )
          this.fetch();
          const p = new this.topOfer();
          console.log(p.x,p.y)
        },
        methods:{
          topOfer(x=1,y=2){
            this.x=x;
            this.y=y;
            console.log(this.x,this.y)
          },
          fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
            console.log(method);
          }
        }
    }
</script>

<style scoped>
.index{
  width: 314px;
  height: 200px;
  margin: 20px;
  background:#ccc;
  color: #fff;
  float: left;
  border-radius:3px ;
  font-size:18px ;
}
</style>
