<template>
  <div class="cwt_el" v-bind:style="{ width: width }">    
    <div class="cwt_mid" v-bind:style="{ width: width, 'border-bottom': border_bottom, 'background-color': bg_color, border: border }"></div>
  </div>
</template>

<script>
export default {
  name: 'ditdah',
  props: {
    width: String,
    nouc: { type: Boolean, default: true },
    space: { type: Boolean, default: false },
    noborder: { type: Boolean, default: true },
    color: { type: String, default: 'green' },
  },
  computed: {
          bg_color() {
                  if(this.space) {
                          return "white";
                  }
                  return this.color;
          },
          border_bottom() {
                  if(this.nouc) {
                          return "1px solid lightgray";
                  } else {
                          return ""
                  }
          },
          border() {
                if(this.space && !this.noborder) {
                        return "1px solid " + this.color;
                }
                return "none";
          }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cwt_el {
        height: 20px;
        display: inline-block;
        margin: 0px; 
        position: relative;
}
.cwt_mid {
        height: 10px;
        display: block;
        border-radius: 5px;
}
</style>
