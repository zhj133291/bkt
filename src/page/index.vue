<template>
  <div>
      <v-header :userInfo='userInfo'></v-header>
      <v-menu :menu='menu'></v-menu>
      <div class='content'>
        <router-view></router-view>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header'
  import menu from 'components/menu/menu'

  export default {
    data () {
      let info = sessionStorage.getItem("INFO");
      if(!info || info.indexOf('token') == -1){
        this.$router.push('/');
        return;
      }
      let INFO = JSON.parse(sessionStorage.getItem("INFO"));
      return {
        headers: {
          userId: INFO.userId,
          client: '1',
          token: INFO.token
        },
        menuList: [{name:'客户受理',url:'accept'},{name:'分支管理',url:'branch'},{name:'人员管理',url:'user'}],
        userInfo: INFO,
        menu:[]
      };
    },
    methods: {
      getMenuSuc ( data ) {
        if(data.length == 0){
          this.$message({
            message: '您无该权限',
            center: true,
            type:'error'
          });
          return;
        }
        let route = this.$route.name;
        let tag = '';
        if(route.indexOf('userDetail')!=-1){
          tag = 'user';
        }
        if(route.indexOf('branchDetail')!=-1){
          tag = 'branch';
        }
        let me =  this;
        data.map((item,k)=>{
          me.menuList.map((val,i)=>{
            if(item.title == val.name){
              item.url = val.url;
              item.class = 'icon-'+val.url;
              if((route == 'index' && k == 0) || (route != 'index' && item.url == route)){
                item.active = '2';
                me.$router.push(item.url);
              }else{
                if ((tag == 'user' && item.url == 'user')||(tag == 'branch' && item.url == 'branch')){
                  item.active = '2';
                }else{
                  item.active = '3';
                }
              }
            }
          });
        })
        this.menu = data;
      },
      getMenuErr ( res ) {
        if( this.$utils.goLogin(res.returnCode)){
          this.goLogin(res.returnCode);
          return;
        }
        this.$message({
          message: '获取菜单失败,请刷新重试',
          center: true,
          type:'error'
        });
      }
    },
    created () {
      let menu_data = {
        "service": "configService",
        "method": "getMenuList",
        "data": {
          "levelId":2,
          client:'B'
        }
      }
      this.$api.post( '', menu_data, this.getMenuSuc, this.getMenuErr, this.headers);
    },
    components:{
      'v-header': header,
      'v-menu': menu
    }
  };
</script>
<style lang='less'>
  .content{
    margin-top:55px;
    margin-left:210px;
    background-color: #ebecf2;
    min-height:1200px;
    overflow-x:auto;
  }
</style>
