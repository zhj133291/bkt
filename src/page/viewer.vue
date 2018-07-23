<template>
  <div>
    <iframe v-bind:src="url" width="100%" v-bind:height="getHeight()"></iframe>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist'
let Base64 = require('js-base64').Base64

export default {
  data () {
    return {
      url:""
    }
  },
  methods: {
    getHeight(){
    	return window.innerHeight;
    }
  },
  mounted () {
     // let url = Base64.decode(this.$route.query.url);
       this.url=this.$route.query.url
  }
}
</script>

<style scoped>
canvas {
  display: block;
  border-bottom: 1px solid black;
}
</style>
