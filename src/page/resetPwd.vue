<template>
  <div>
    <v-register :csrxy="csrxy" :submit="submit"></v-register>
  </div>
</template>

<script>
  import register from '@/components/login/resetPwd.vue';

  export default {
    name: 'App',
    data() {
      return {
        title:'修改密码',
        csrxy:true,
        submit:"确  认"
      }
    },
    components: {
      'v-register': register
    },
    created () {
      this.$util.goTop();
    }
  }
</script>
