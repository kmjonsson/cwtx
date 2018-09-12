<template>
  <div class="cwt_el" v-bind:style="{ width: width }">    
    <div class="cwt_top"></div>
    <div class="cwt_mid"></div>
    <div class="cwt_bottom"></div>
    <div class="cwt_text" v-bind:style="{ width: width }">{{text}}</div>
    <div class="cwt_letter" v-bind:style="{ width: width, 'border-top': border_top }">{{letter}}</div>
  </div>
</template>

<script>
export default {
  name: 'ditdah',
  props: {
    text: String,
    width: String,
    nouc: { type: Boolean, default: true },
    letter: { type: String, default: "" },
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
        text-align: center;
}
.cwt_mid {
        height: 10px;
        display: block;
        //border: 1px solid green;
        border-radius: 5px;
        background-color: green;
}
.cwt_bottom {
        height: 50px;
        display: block;
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
        text-align: center;
        font-size: 0.7em;
        position: absolute;
        top: 0px;
        left: 0;
}
</style>
