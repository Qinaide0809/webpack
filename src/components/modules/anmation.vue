<template>

  <div  class="anmation">
    <div class="anmation-content" @click="addAnmation(100)">
      <div class="anma-top"></div>
      <div class="anma-right"></div>
      <div class="anma-botton"></div>
      <div class="anma-left"></div>
      <div class="anma-z"></div>
      <div class="anma-y"></div>
    </div>
    <span v-for="item in item" class="ball" :class="{choosed:item.num %2 !=0}"@click="addAnmatinSpan(item.id)"
          :style="{
              height:''+item.hg+'px',
              width:''+item.hg+'px',
              background:'#'+item.ba+'',
              right:''+item.hg*7*Math.random()*10+'px',
              bottom:''+item.hg*6+'px',
              boxShadow:' 0px 0px 20px #'+item.ba+''
            }">

      </span>
  </div>
</template>

<script>
    export default {
        name: "anmation",
        data(){
          return{
               item:[]
          }
        },
        mounted(){
          let th = this;
        },
         methods:{

           addAnmation(lengt) {
              let th = this;
              th.item=[];
              for(let i = 0;i<lengt;i++){
                let Num="";
                for(let j=0;j<6;j++)
                {
                  Num+=Math.floor(Math.random()*10);
                }
                let j={
                  hg:Math.floor(Math.random()*90) + 10,
                  ba:Num,
                  id:i+1,
                  num:1
                }
                th.item.push(j);
              }
           },
           addAnmatinSpan(id){
             event.cancelBubble = true;
             let th = this;
             for(let i=0;i<th.item.length; i ++ ){
                   if(id === th.item[i].id){
                     console.log(th.item[i].num)
                     th.item[i].num+=1;
                     console.log(th.item[i].num)
                     return
                   }
             }


           }
        }
    }
</script>

<style >
  .anmation{
    position: absolute;
    float: left;
    height: 100%;
    width: 100%;
    background: #0d3d4f;
    left: 0px;
    top: 0px;
    z-index: 2;
    overflow: hidden;
  }
  .anmation-content{
  z-index: 1;
  position: absolute;
  height: 120px;
  width: 120px;
  left: 50%;
  top: 90%;
  margin: -120px 0px 0px -120px;
  transform: rotateY(26deg) rotateX(85deg) rotateZ(-40deg);
  /*旋转看看效果*/
  transform-style: preserve-3d;
  animation: secher 5s;
  -moz-animation: secher  5s;	/* Firefox */
  -webkit-animation: secher 5s;
  transition: all 0.4s ease-in-out;
    animation:secher 5s infinite;
    animation-direction:alternate;
  /*投影*/

}
  .anma-top ,.anma-right, .anma-botton, .anma-left,.anma-z,.anma-y{
    width: 120px;
    height: 120px;
    margin: 0px;
    padding: 0px;
    box-shadow: 0px 0px 5px #3a8ee6;
    position: absolute;
    cursor: pointer;
    animation: anmation 5s;
    -moz-animation: anmation  5s;	/* Firefox */
    -webkit-animation: anmation 5s;
    animation:anmation 5s infinite;
    animation-direction:alternate;
    transition: all 0.4s ease-in-out;
  }
  .anma-top{
    background: #315dae;
    transform: translateY(-50%) translateX(0px) translateZ(0px) rotateY(0deg) rotateX(90deg);
    animation: anmation1 5s;
    -moz-animation: anmation1  5s;	/* Firefox */
    -webkit-animation: anmation1 5s;
    animation:anmation1 5s infinite;
    animation-direction:alternate;
  }
  .anma-right{
    background: #ff6240;
    transform: translateY(50%) translateX(0px) translateZ(0px) rotateY(0deg) rotateX(90deg);
    animation: anmation2 5s;
    -moz-animation: anmation2  5s;	/* Firefox */
    -webkit-animation: anmation2 5s;
    animation:anmation2 5s infinite;
    animation-direction:alternate;
  }
  .anma-botton{
    transform: translateY(0px) translateX(0px) translateZ(60px) rotateY(0deg) rotateX(0deg);
    background: transparent;
    animation: anmation3 5s;
    -moz-animation: anmation3  5s;	/* Firefox */
    -webkit-animation: anmation3 5s;
    animation:anmation3 5s infinite;
    animation-direction:alternate;
  }
  .anma-left{
    background: #eb9e05;
    transform: translateY(0px) translateX(0px) translateZ(-60px) rotateY(0deg) rotateX(0deg);
    animation: anmation4 5s;
    -moz-animation: anmation4  5s;	/* Firefox */
    -webkit-animation: anmation4 5s;
    /*投影*/
    box-shadow: 30px 68px 89px #00000082;
    animation:anmation4 5s infinite;
    animation-direction:alternate;
  }
  .anma-z{
    transform: translateY(0px) translateX(50%) translateZ(0px) rotateY(-90deg) rotateX(0deg);
    background: #1c1515;
    animation: anmation5 5s;
    -moz-animation: anmation5  5s;	/* Firefox */
    -webkit-animation: anmation5 5s;
    animation:anmation5 5s infinite;
    animation-direction:alternate;
  }
  .anma-y{
    background: #409eff;
    transform: translateY(0px) translateX(-50%) translateZ(0px) rotateY(-90deg) rotateX(0deg);
    animation: anmation6 5s;
    -moz-animation: anmation6  5s;	/* Firefox */
    -webkit-animation: anmation6 5s;
    animation:anmation6 5s infinite;
    animation-direction:alternate;
   }
  @keyframes secher {
    0%  { left: -90px;  width: 100px;height: 100px; top: 80%;  transform: rotateY(80deg) rotateX(300deg) rotateZ(120deg);      }
    25% {  width: 120px;height: 120px;               top: 30%;   transform: rotateY(160deg) rotateX(200deg) rotateZ(20deg); }
    50% { width: 120px;height: 120px;                top: 50%;  transform: rotateY(320deg) rotateX(100deg) rotateZ(130deg);}
    75% { left: 60%; width: 200px;height: 200px;     top: 30%;  transform: rotateY(63deg) rotateX(50deg) rotateZ(170deg);}
    100%{ left: 50%; width: 120px;height: 120px;     top: 90%;    transform: rotateY(26deg) rotateX(85deg) rotateZ(-40deg);}
  }
  @keyframes anmation {
    0%  {  width: 100px;height: 100px; }
    25% {  width: 120px;height: 120px; }
    50% { width: 160px;height: 160px; }
    75% {  width: 200px;height: 200px;}
    100%{  width: 160px;height: 160px;}
  }
  @keyframes anmation1 {
    0%  { transform: translateY(-55%) translateX(0px) translateZ(0px) rotateY(0deg) rotateX(90deg); }
    25% {  transform: translateY(-60%) translateX(0px) translateZ(0px) rotateY(0deg) rotateX(90deg);}
    50% {  transform: translateY(-50%) translateX(0px) translateZ(0px) rotateY(0deg) rotateX(90deg); }
    75% { transform: translateY(-60%) translateX(0px) translateZ(0px) rotateY(0deg) rotateX(90deg);}
    100%{  transform: translateY(-50%) translateX(0px) translateZ(0px) rotateY(0deg) rotateX(90deg);}
  }
  @keyframes anmation2 {
    0%  { transform: translateY(55%) translateX(0px) translateZ(0px) rotateY(0deg) rotateX(90deg); }
    25% {  transform: translateY(60%) translateX(0px) translateZ(0px) rotateY(0deg) rotateX(90deg);}
    50% {  transform: translateY(50%) translateX(0px) translateZ(0px) rotateY(0deg) rotateX(90deg); }
    75% { transform: translateY(60%) translateX(0px) translateZ(0px) rotateY(0deg) rotateX(90deg);}
    100%{  transform: translateY(50%) translateX(0px) translateZ(0px) rotateY(0deg) rotateX(90deg);}
  }
  @keyframes anmation3 {
    0%  { transform: translateY(0px) translateX(0px) translateZ(100px) rotateY(0deg) rotateX(0deg);background: #00ff00 }
    25% { transform: translateY(0px) translateX(0px) translateZ(95px) rotateY(0deg) rotateX(0deg);background: #00ff00}
    50% {  transform: translateY(0px) translateX(0px) translateZ(60px) rotateY(0deg) rotateX(0deg); background: #00ff00}
    75% { transform: translateY(0px) translateX(0px) translateZ(85px) rotateY(0deg) rotateX(0deg);background: #00ff00}
    100%{ transform: translateY(0px) translateX(0px) translateZ(60px) rotateY(0deg) rotateX(0deg);background: transparent }
  }
  @keyframes anmation4 {
    0%  { transform: translateY(0px) translateX(0px) translateZ(-100px) rotateY(0deg) rotateX(0deg); box-shadow: 30px 68px transparent ;}
    25% { transform: translateY(0px) translateX(0px) translateZ(-95px) rotateY(0deg) rotateX(0deg);box-shadow: 30px 68px 89px transparent;}
    50% { transform: translateY(0px) translateX(0px) translateZ(-60px) rotateY(0deg) rotateX(0deg); box-shadow: 30px 68px 89px transparent;}
    75% { transform: translateY(0px) translateX(0px) translateZ(-85px) rotateY(0deg) rotateX(0deg);box-shadow: 30px 68px 89px transparent;}
    100%{ transform: translateY(0px) translateX(0px) translateZ(-60px) rotateY(0deg) rotateX(0deg);box-shadow: 30px 68px 89px #00000082;}
  }
  @keyframes anmation5 {
    0%  {  transform: translateY(0px) translateX(155%) translateZ(0px) rotateY(-90deg) rotateX(0deg); }
    25% {   transform: translateY(0px) translateX(60%) translateZ(0px) rotateY(-90deg) rotateX(0deg);}
    50% {   transform: translateY(0px) translateX(50%) translateZ(0px) rotateY(-90deg) rotateX(0deg);}
    75% {   transform: translateY(0px) translateX(60%) translateZ(0px) rotateY(-90deg) rotateX(0deg);}
    100%{    transform: translateY(0px) translateX(50%) translateZ(0px) rotateY(-90deg) rotateX(0deg);}
  }
  @keyframes anmation6 {
    0%  {  transform: translateY(0px) translateX(-55%) translateZ(0px) rotateY(-90deg) rotateX(0deg); }
    25% {   transform: translateY(0px) translateX(-60%) translateZ(0px) rotateY(-90deg) rotateX(0deg);}
    50% {    transform: translateY(0px) translateX(-50%) translateZ(0px) rotateY(-90deg) rotateX(0deg);}
    75% {  transform: translateY(0px) translateX(-60%) translateZ(0px) rotateY(-90deg) rotateX(0deg);}
    100%{    transform: translateY(0px) translateX(-50%) translateZ(0px) rotateY(-90deg) rotateX(0deg);}
  }
  .ball{
      border-radius: 50%;
      position: fixed;
      /*animation: anmation 5s;*/
      /*-moz-animation: anmation  5s;	!* Firefox *!*/
      /*-webkit-animation: anmation 5s;*/
    cursor: pointer;
  }
  .choosed{
    background: #000;

  }
</style>
