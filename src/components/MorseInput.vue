<template>
  <div class="input">
    <Paddle v-if="paddle" :freq=freq :wpm="wpm" v-on:on="on" v-on:off="off" :mode="mode" />
    <Straight v-if="!paddle" :freq=freq v-on:on="on" v-on:off="off" />
    <div class="cwt">
      <template v-for="e in facit_events">
        <Ditdah :key="e.id" :width="e.width + 'px'" :nouc="e.len < 3 && e.space" :color="e.color" :space="e.space" :noborder="e.diff <= 1" :desc="e.desc"/>      
      </template>
    </div>
    <div>
      <button v-if="facit" @click="facit = false">Hide facit</button>
      <button v-if="!facit" @click="facit = true">Show facit</button>
    </div>
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
  name: 'morseinput',
  components: {
    Paddle,
    Straight,
    Ditdah,
  },
  data () {
    return {
      events: [],
      fevents: [],
      on_at: -1,
      off_at: -1,
      dit_len: 0,
      facit: false,
      xev: [],
      facit_events: [],
      last_events: [],
    }
  },
  props: {
        text: { type: String }
  },
  created () {
    this.reset();
  },
  computed: {
    wpm() {
      return this.$store.state.wpm;
    },
    freq() {
      return this.$store.state.freq;
    },
    paddle() {
      if(this.$store.state.input_device == 'paddleA' ||
         this.$store.state.input_device == 'paddleB') {
        return true;
      } else {
        return false;
      }
    },
    mode() {
      if(this.$store.state.input_device == 'paddleA') {
        return 'A';
      }
      if(this.$store.state.input_device == 'paddleB') {
        return 'B';
      }
      return ""
    },
    input_device() {
      if(this.paddle) {
        return "Paddle";
      } else {
        return "Straight";
      }
    },
  },
  watch: {
    events() {
      let ev = Morse.compare(this.fevents,this.events);
      for(let e of ev) {
        e.width = e.len*10;
      }
      this.facit_events = ev;
      this.$emit('score',this.score());
    },
    text() {
      
      this.reset();
    }
  },
  methods: {
    score() {
      let t=0;
      let f=0;
      if(this.events.length != this.fevents.length) {
        return "N/A";
      }
      for(let e of this.facit_events) {
        f+=e.diff*e.flen/100;
        t+=e.flen;
      }
      if(t == 0) {
        return "N/A";
      }
      return parseInt(100-(t-f)/t*100);
    },
    reset() {
      this.events=[];
      this.last_events = [];
      this.on_at = -1;
      this.off_at = -1;
      this.dit_len = this.calc_dit_len()
      this.fevents = Morse.morse2events(Morse.text2morse(this.text),this.wpm);    
      for(let e of this.fevents) {
        e.width = e.len*10;
        e.color = 'green';
        if(e.space) {
          e.color = 'white';
        }
      }
      EventBus.$emit('reset');
    },
    on(t) {
      if(this.last_events.length >= 7) {
        this.last_events.shift();
        if(t-this.last_events[0] < this.dit_len * 7 * 2) {
          this.reset();
          return;
        }
      }
      this.last_events.push(t);
      if(this.events.length == this.fevents.length) {
        return;
      }
      if(this.off_at != -1) {
        let len = (t-this.off_at)/this.dit_len;
        this.events.push({
          space: true,
          id: t,
          len,
        });
      }
      this.on_at = t;
    },
    off(t) {
      if(this.on_at == -1) {
        return;
      }
      if(this.events.length == this.fevents.length) {
        return;
      }
      let len = (t-this.on_at)/this.dit_len;
      this.events.push({
        space: false,
        id: t,
        len,
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
        /* height: 15px; */
}
</style>