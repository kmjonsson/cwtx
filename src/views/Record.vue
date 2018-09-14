<template>
  <div class="record">
    <div @click="paddle = !paddle">{{input_device}}</div>
    <Paddle v-if="paddle" :freq=freq :wpm="wpm" v-on:on="on" v-on:off="off" />
    <Straight v-if="!paddle" :freq=freq v-on:on="on" v-on:off="off" />
    <div class="cwt">
      <template v-for="e in events">
        <Ditdah :key="e.id" :width="e.len + 'px'" :nouc="e.len < 30 && e.space" :color="e.color"/>      
      </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Paddle from '@/components/Paddle.vue'
import Ditdah from '@/components/Ditdah.vue'
import Straight from '@/components/Straight.vue'

export default {
  name: 'record',
  components: {
    Paddle,
    Straight,
    Ditdah,
  },
  data () {
    return {
      paddle: true,
      events: [],
      on_at: -1,
      off_at: -1,
      wpm: 15,
      freq: 550,
      dit_len: 0
    }
  },
  created () {
    this.dit_len = this.calc_dit_len()
  },
  computed: {
    input_device() {
      if(this.paddle) {
        return "Paddle";
      } else {
        return "Straight";
      }
    }
  },
  methods: {
    on(t) {
      if(this.off_at != -1) {
        let l = (t-this.off_at)/this.dit_len;
        this.events.push({
          space: true,
          id: t,
          color: 'white',
          len: parseInt(l*10),          
        });
      }
      this.on_at = t;
    },
    off(t) {
      let l = (t-this.on_at)/this.dit_len;
      let color = 'green';
      if(l > 3.1) {
        color = 'red';
      }
      this.events.push({
        space: false,
        id: t,
        color,
        len: parseInt(l*10),
      });
      this.off_at = t;
    },
    calc_dit_len() {
      let dit = 60 / (this.wpm * 50);      // PARIS
      // Always end sine @ 0 for better sound.
      return Math.round(dit * this.freq) / this.freq;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cwt {
        height: 150px;
}
</style>