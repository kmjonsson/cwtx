<template>
  <div class="record">
    
    <h2 @click="paddle = !paddle">Input device: {{input_device}}</h2>
    <h2 @click="reset()">Restart</h2>

    <Paddle v-if="paddle" :freq=freq :wpm="wpm" v-on:on="on" v-on:off="off" />
    <Straight v-if="!paddle" :freq=freq v-on:on="on" v-on:off="off" />
    
    
    <h1>{{text}}</h1>
    <div class="cwt">
      <template v-for="e in facit_events">
        <Ditdah :key="e.id" :width="e.width + 'px'" :nouc="e.len < 3 && e.space" :color="e.color" :space="e.space" :noborder="e.diff <= 1" :desc="e.desc"/>      
      </template>
    </div>

    <div>Score: {{score}}</div>

    <h2 @click="facit = !facit">Facit {{facit}}</h2>
    <div v-if="facit" class="cwt">
      <template v-for="e in fevents">
        <Ditdah :key="e.id" :width="e.width + 'px'" :color="e.color"/>
      </template>
    </div>
    

  </div>
</template>

<script>
// @ is an alias to /src
import Paddle from '@/components/Paddle.vue'
import Ditdah from '@/components/Ditdah.vue'
import Straight from '@/components/Straight.vue'
import Utils from '@/code/utils.js'
import Morse from '@/code/morse.js'

import { EventBus } from '@/code/eventbus.js'

export default {
  name: 'record',
  components: {
    Paddle,
    Straight,
    Ditdah,
  },
  data () {
    return {
      text: "CQ SA2BRJ",
      paddle: true,
      events: [],
      fevents: [],
      on_at: -1,
      off_at: -1,
      wpm: 15,
      freq: 550,
      dit_len: 0,
      facit: true,
      xev: [],
    }
  },
  created () {
    this.dit_len = this.calc_dit_len()
    this.fevents = Morse.morse2events(Morse.text2morse(this.text),this.wpm);    
    for(let e of this.fevents) {
      e.width = e.len*10;
      e.color = 'green';
      if(e.space) {
        e.color = 'white';
      }
    }
  },
  computed: {
    input_device() {
      if(this.paddle) {
        return "Paddle";
      } else {
        return "Straight";
      }
    },
    facit_events() {
      let ev = Morse.compare(this.fevents,this.events);
      for(let e of ev) {
        e.width = e.len*10;
      }
      this.xev = ev;
      return ev;
    },
    score() {
      let t=0;
      let f=0;
      for(let e of this.xev) {
        f+=e.diff*e.flen/100;
        t+=e.flen;
      }
      if(t == 0) {
        return "N/A";
      }
      return parseInt(100-(t-f)/t*100);
    }
  },
  methods: {
    reset() {
      this.events=[];
      this.on_at = -1;
      this.off_at = -1;
      EventBus.$emit('reset');
    },
    on(t) {
      if(this.off_at != -1) {
        let len = (t-this.off_at)/this.dit_len;
        this.events.push({
          space: true,
          id: t,
          color: 'white',
          len,
          width: parseInt(len*10),          
        });
      }
      this.on_at = t;
    },
    off(t) {
      let len = (t-this.on_at)/this.dit_len;
      let color = 'green';
      if(len > 3.1) {
        color = 'red';
      }
      this.events.push({
        space: false,
        id: t,
        color,
        len,
        width: parseInt(len*10),
      });
      this.off_at = t;
    },
    calc_dit_len() {
      return Utils.calc_dit_len(this.wpm,this.freq);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cwt {
        height: 15px;
}
</style>