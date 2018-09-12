<template>
  <div class="cwt_el" v-bind:style="{ width: width }">    
    <div class="cwt_top"></div>
    <div class="cwt_mid"></div>
    <div class="cwt_bottom"></div>
    <div class="cwt_letter" v-bind:style="{ width: width, 'border-top': border_top }"></div>
    <div class="cwt_text" v-bind:style="{ width: width }">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: 'ditdah',
  props: {
    text: String,
    width: String,
    nouc: { type: String, default: true }
  },
  computed: {
          border_top() {
                  if(this.nouc) {
                          return "1px solid lightgray";
                  } else {
                          return ""
                  }
          }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cwt_el {
        height: 150px;
        display: inline-block;
        margin: 0px; 
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
.cwt_letter {
        height: 40px;
        display: block;
        text-align: center;
        position: absolute;
        bottom: 0px;
        left: 0;
}
.cwt_text {
        float: left;
        text-align: center;
        position: absolute;
        bottom: 40px;
        left: 0;
        font-size: 0.7em;
}
</style>
