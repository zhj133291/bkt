<template>
    <div class='menuList'>
      <ul>
        <li v-for='(item,index) in menu' :key='index' :class='{hover:item.active=="2"}' @click='icon(item)'><i class='iconfont' :class='item.class'></i><router-link :to='item.url'>{{item.title}}</router-link>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:['menu'],
    data () {
      return {
        menuList:this.menu
      }
    },
    methods: {
      icon (item){
        let me = this;
        this.menu.map((i,k)=>{
          if (i.active == "2"){
            i.active="3";
          }
        });
        item.active="2";
      }
    },
    created () {
      console.log(this.menu);
    }
  };
</script>
<style lang='less'>
  .menuList{
    width:210px;
    box-sizing:border-box;
    position:fixed;
    height:calc(100vh - 55px);
    top:55px;
    background:#fff;
    ul{
      width:100%;
      li{
        box-sizing:border-box;
        background:no-repeat;
        background-position:17px 14px;
        cursor:pointer;
        width:100%;
        height:47px;
        box-shadow: inset 0px -1px 0px 0px rgba(230, 231, 237, 1);
        position:relative;
        i{
          position:absolute;
          top:15px;
          left:17px;
        }
        a{
          padding-left:55px;
          font-size: 14px;
          font-weight:600;
          color:#363f45;
          width:210px;
          display:inline-block;
          padding-top:15px;
          height:47px;
          box-sizing:border-box;
        }
        &:hover{
          color:#3384ff;
          a{
            color:#3384ff;
          }
        }
        &.hover{
          color:#3384ff;
          a{
            color:#3384ff;
          }
        }
      }
    }
  }
</style>