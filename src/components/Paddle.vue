<template>
  <div></div>
</template>

<script>

import { EventBus } from '@/code/eventbus.js'

const FLAGS = {
        DIT: 0x01,
        DAH: 0x02,
        DITTING: 0x04,
};

const STATES = {
        IDLE: 1,
        CHK: 2,
        KEYED: 3,
        INTER_ELEMENT: 4,
};

export default {
  name: 'paddle',
  data () {
        return {
          ctx: undefined,
          AudioContext: window.AudioContext || window.webkitAudioContext,
          timer: undefined,
          start_time: 0,
          state: STATES.IDLE,
          control: 0,
        };
  },
  props: {
        wpm: { type: Number },
        freq: { type: Number, default: 550 },
        mode: { type: String, default: "B" },
  },
  computed: {
          
  },
  created() {        
        EventBus.$on('reset', this.reset);
  },
  methods: {
        reset() {
                this.state = STATES.IDLE;
                this.control = 0;
                this.start_time = 0;
                if(this.timer) {
                        clearTimeout(this.timer);
                        this.timer = undefined;
                }
        },
        update_paddle() {
                this.control |= ( (FLAGS.DIT * this.dit) | (FLAGS.DAH * this.dah) );
        },
        state_machine(nowt,end) {
                if(this.state == STATES.IDLE) {
                        this.update_paddle();
                        if (this.control & (FLAGS.DIT | FLAGS.DAH)) {
                                this.state = STATES.CHK;
                        }
                }
                if(this.state == STATES.CHK) {
                        end = false;
                        this.state = STATES.KEYED;
                        if (this.control & FLAGS.DIT) {
                                // if dit was pressed
                                this.play(nowt,1); // Play dit
                                this.control |= FLAGS.DITTING;
                                this.control &= ~(FLAGS.DIT + FLAGS.DAH);
                        } else if (this.control & FLAGS.DAH) {
                                // if dah was pressed
                                this.play(nowt,3); // Play dah
                                this.control &= ~(FLAGS.DIT + FLAGS.DAH);
                        } else {
                                // If no active key let's go idle :-)
                                this.state = STATES.IDLE;
                                return this.state_machine(nowt,end);
                        }
                }
                if(this.state == STATES.KEYED) {
                        if(end) {            // are we at end of key down ?
                                end = false;
                                this.kick_timer(nowt+this.dit_len());
                                this.state = STATES.INTER_ELEMENT;
                        }
                        if (this.mode == 'B') {
                                this.update_paddle();
                        }
                }
                if(this.state == STATES.INTER_ELEMENT) {
                        // Insert time between dits/dahs
                        this.update_paddle();
                        if (end) {
                                if (this.control & FLAGS.DITTING) {                    // was it a dit or dah ?
                                        this.control &= ~(FLAGS.DIT + FLAGS.DITTING);  // clear two bits
                                        this.state = STATES.CHK;                       // dit done, check for dah
                                } else {
                                        this.control &= ~(FLAGS.DAH);                  // clear dah latch
                                        this.state = STATES.IDLE;                      // go idle
                                }
                                return this.state_machine(nowt,false);
                        }
                }
        },
        down() {
                if(this.start_time == 0) {
                        this.start_time = performance.now()/1000;
                }
                let nowt = performance.now()/1000-this.start_time;
                this.state_machine(nowt,false);
        },        
        kick_timer(at) {
                this.next_event_at = at;
                this.timer_event();
        },
        timer_event() {
                let nowt = performance.now()/1000-this.start_time;                
                if(this.next_event_at-nowt <= 0.001) {
                        this.timer = undefined;
                        this.state_machine(this.next_event_at,true);
                } else {
                        this.timer = setTimeout(this.timer_event,(this.next_event_at-nowt)*1000/2); 
                }
        },
        play(nowt,play) {
                this.kick_timer(nowt+this.dit_len()*play);
                this.$emit('on',nowt);
                this.$emit('off',nowt+this.dit_len()*play);
                let b;
                if(play == 1) {
                        b = this.ctx.createBuffer(1, this.dit_sample.length, this.ctx.sampleRate);
                        b.copyToChannel(new Float32Array(this.dit_sample),0,0);
                } else {
                        b = this.ctx.createBuffer(1, this.dah_sample.length, this.ctx.sampleRate);
                        b.copyToChannel(new Float32Array(this.dah_sample),0,0);
                }
                let o = this.ctx.createBufferSource();
                o.buffer = b;
                o.start(this.ctx.currentTime);
                o.connect(this.ctx.destination);
        },
        mouseDown(e) {                
                if( e.button == this.$store.state.dit_button ) { 
                        this.dit = 1;
                        this.down();
                        e.preventDefault();
                        e.stopPropagation();
                        return false; 
                }
                if( e.button == this.$store.state.dah_button ) { 
                        this.dah=1;
                        this.down();
                        e.preventDefault();
                        e.stopPropagation();
                        return false; 
                } 
                return true;   
        },
        mouseUp(e) {
                if( e.button == this.$store.state.dit_button ) { 
                        this.dit=0;
                        e.preventDefault();
                        e.stopPropagation();
                        return false; 
                } 
                if( e.button == this.$store.state.dah_button ) { 
                        this.dah=0;
                        e.preventDefault();
                        e.stopPropagation();
                        return false; 
                } 
                return true;  
        },
        on_click(e) {
                if(e.which == 2) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                }
        },
        contextMenu(event) {
                event.preventDefault();
                event.stopPropagation();
                return false;
        },
        gen_sample(len) {
                let rise_time = 0.010;
                let samplerate = 1.0*this.ctx.sampleRate;
                let samples = samplerate * (len + rise_time);
                let rise_time_samples = samplerate * rise_time;
                let scale = 1.0;
                let sample = [];

                for(let n=0;n<samples;n++) {
                        if(n < rise_time_samples) {
                                scale = Math.sin(n / (rise_time*samplerate) * 0.5 * Math.PI);
                        }
                        if(n > samples-rise_time_samples) {
                                scale = Math.sin((samples-n) / (rise_time*samplerate) * 0.5 * Math.PI);
                        }
                        sample[n] = Math.sin(n / (samplerate/this.freq) * 2.0 * Math.PI) * scale;
                }
                return sample;
        },
        dit_len() {
                let dit = 60 / (this.wpm * 50);      // PARIS
                // Always end sine @ 0 for better sound.
                return Math.round(dit * this.freq) / this.freq;
        }
  },
  beforeDestroy() {
        // Release mouse events
        document.removeEventListener('mousedown', this.mouseDown);
        document.removeEventListener('mouseup', this.mouseUp);
        document.removeEventListener('contextmenu', this.contextMenu);
        document.removeEventListener('click', this.on_click);
        clearTimeout(this.timer);
  },
  mounted: function () {
        // Trap mouse events
        this.ctx = new this.AudioContext()
        this.dit_sample = this.gen_sample(this.dit_len());
        this.dah_sample = this.gen_sample(this.dit_len()*3);
        document.addEventListener('mousedown', this.mouseDown);
        document.addEventListener('mouseup', this.mouseUp);
        document.addEventListener('contextmenu', this.contextMenu);
        document.addEventListener('click', this.on_click);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
