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
        margin: 0px; 
        position: relative;
}
.cwt_top {
        height: 50px;
        display: block;
        //border-left: 1px dashed gray;
        //border-right: 1px dashed gray;
        text-align: center;
}
.cwt_mid {
        height: 10px;
        display: block;
        border: 1px solid green;
        border-radius: 5px;
        background-color: green;
}
.cwt_bottom {
        height: 50px;
        display: block;
}
.cwt_text {
        float: left;
        text-align: center;
        font-size: 0.7em;
}
</style>
