<template>
  <div class="cwt_el" v-bind:style="{ width: width }">
    <div class="cwt_text" v-bind:style="{ width: width }">{{text}}</div>
    <div class="cwt_top"></div>
    <div class="cwt_mid"></div>
    <div class="cwt_bottom"></div>
  </div>
</template>

<script>
export default {
  name: 'ditdah',
  props: {
    text: String,
    width: String,
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cwt_el {
        height: 110px;
        display: inline-block;
        margin: 2px; 
        position: relative;
}
.cwt_top {
        height: 50px;
        display: block;
}
.cwt_mid {
        height: 10px;
        display: block;
}
.cwt_bottom {
        height: 50px;
        //border-left: 1px dashed gray;
        //border-right: 1px dashed gray;
}
.cwt_text {
        float: left;
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 0.7em;
}
</style>
