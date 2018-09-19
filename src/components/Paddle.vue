<template>
  <div></div>
</template>

<script>

import { EventBus } from '@/code/eventbus.js'

export default {
  name: 'paddle',
  data () {
        return {
          ctx: undefined,
          dit: 0,
          dah: 0,
          AudioContext: window.AudioContext || window.webkitAudioContext,
          play_next: false,
          timer: undefined,
          play_dah: true,
          start_time: 0,
          last_time: 0,
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
                this.start_time = 0;
        },
        down() {                
                // I'm playing :-)
                if(this.timer !== undefined) {
                        if(this.dit && this.dah) { this.play_next=true; }
                        return;
                }
                // Kick new event
                this.event(0);
        },        
        kick_timer(at) {
                this.next_event_at = at;
                this.timer_event();
        },
        timer_event() {
                let nowt = performance.now()/1000-this.start_time;                
                if(this.next_event_at-nowt <= 0.001) {
                        this.timer = undefined;
                        return this.event(this.next_event_at);
                } else {
                        this.timer = setTimeout(this.timer_event,(this.next_event_at-nowt)*1000/2); 
                }
        },
        event(nowt) {
                if(this.start_time == 0) {
                        this.start_time = performance.now()/1000;
                }
                if(nowt == 0) {
                        nowt = performance.now()/1000-this.start_time;
                }
                if((this.dit && this.dah) || (this.play_next && this.mode == 'B')) {
                        if(this.play_dah) {                                
                                this.kick_timer(nowt+this.dit_len()*4);
                                this.$emit('on',nowt);
                                this.$emit('off',nowt+this.dit_len()*3);
                                this.play(false);                                                                
                        } else {
                                this.kick_timer(nowt+this.dit_len()*2);
                                this.$emit('on',nowt);
                                this.$emit('off',nowt+this.dit_len());
                                this.play(true);                                
                        }
                        this.play_dah = !this.play_dah;
                        this.play_next = false;
                        if(this.dit && this.dah) { this.play_next=true; }
                        return;
                }
                this.play_next = false
                if(this.dah) {
                        this.kick_timer(nowt+this.dit_len()*4);
                        this.$emit('on',nowt);
                        this.$emit('off',nowt+this.dit_len()*3);
                        this.play(false);
                        this.play_dah = false;
                        return;
                }
                if(this.dit) {                        
                        this.kick_timer(nowt+this.dit_len()*2);
                        this.$emit('on',nowt);
                        this.$emit('off',nowt+this.dit_len());
                        this.play(true);
                        this.play_dah = true;
                        return;
                }
        },
        play(dit) {
                let b;
                if(dit) {
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
                if( e.button == 1 ) { 
                        this.dit = 1;
                        this.down();
                        e.preventDefault();
                        return false; 
                }
                if( e.button == 2 ) { 
                        this.dah=1;
                        this.down();
                        e.preventDefault();
                        return false; 
                } 
                return true;   
        },
        mouseUp(e) {
                if( e.button == 1 ) { 
                        this.dit=0;
                        e.preventDefault();
                        return false; 
                } 
                if( e.button == 2 ) { 
                        this.dah=0;
                        e.preventDefault();
                        return false; 
                } 
                return true;  
        },
        contextMenu(event) {
                event.preventDefault()
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
