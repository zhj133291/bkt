<template>
    <div class="bk_bg">
      	<v-loginContainer></v-loginContainer>
    </div>
</template>

<script type="text/ecmascript-6">
	import loginContainer from '@/components/login/loginContainer.vue';
    export default {
      data () {
        return {
        };
      },
      components: {
      	'v-loginContainer': loginContainer,
      },
      created () {
      },
    };
</script>

<style lang="less">
	.bk_bg{
		position: absolute;
		top:0;
		width: 100%;
		height: 100%;
		background-image: url(./bkt_bg.png);
		background-size: 100% 100%;
	}
</style>
