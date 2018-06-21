<template>
  <div class="header">
    <div class="left">
      <span>诚税融银行管理系统</span>
    </div>
    <div class="right" @mouseenter='showUser' @mouseleave='hideUser'>
      <img src="./user.png" alt="" width='36' height='36'>
      <span>{{userInfo.userName}}</span><img src="./down.png" alt="">
      <div class='logout' @mouseenter='changePic' @mouseleave='changePic' @click='logout' v-if='user'>
        <img :src="src" alt="">
        <span>退出登录</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import a from './outUncheck.png'
  import b from './outCheck.png'
  export default {
    props:['userInfo'],
    data () {
      return {
        hover:false,
        src: a,
        isLogin: true,
        user: false
      };
    },
    watch: {
      userInfo:{
        handler(newValue,oldValue) {
          if(newValue && newValue.token){
            this.isLogin=true;
          }else{
            this.isLogin=false;
          }
        }
      }
    },
    created() {
    },
    methods: {
      changePic () {
        this.src=this.src==a?b:a;
      },
      showUser () {
        this.user=true;
      },
      hideUser () {
        this.user=false;
      },
      logout () {
        if(sessionStorage.getItem('INFO')){
          sessionStorage.removeItem('INFO');
        }
        this.$router.push('/');
      }
    },
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .header {
    z-index:1000;
    width:100%;
    position: fixed;
    height:55px;
    top:0;
    left:0;
    background-color: rgba(41, 57, 83, 1);
    .left{
      float: left;
      span{
        height:55px;
        line-height:55px;
        margin-left: 18px;
        margin-top: 14px;
        font-size: 22px;
        color: #fff
      }
    }
    .right{
      cursor: pointer;
      height:55px;
      position:relative;
      float: right;
      box-sizing:border-box;
      padding-top:10px;
      margin-right:43px;
      img{
        vertical-align:middle;
      }
      span{
        margin:0 9px 0 5px;
        color:#fff;
        font-size:14px;
      }
      .logout{
        position:absolute;
        width: 132px;
        height: 55px;
        left:-12px;
        top:50px;
        text-align:center;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 10px 0px rgba(26, 24, 25, 0.3);
        &:hover{
          cursor: pointer;
          span{
            color: #3185ff;
          }
        }
        line-height:55px;
        img {
          vertical-align:text-bottom;
        }
        span{
          font-size: 14px;
          height:55px;
          line-height:55px;
          color: #363f45;
          vertical-align:top;
        }
      }
    }
  }
</style>
