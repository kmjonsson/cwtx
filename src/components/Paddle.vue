<template>
  <div>
        {{dit}}/{{dah}}
        <div v-html="output"/>
  </div>
</template>

<script>
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
          lastt: 0,
          output: "",
        };
  },
  props: {
        wpm: { type: Number },
        freq: { type: Number, default: 550 },
  },
  computed: {
  },
  methods: {
        down() {
                if(this.dit && this.dah) { this.play_next=true; }

                // I'm playing :-)
                if(this.timer !== undefined) {
                        return;
                }
                this.m_event();
        },
        m_event() {
                console.log(this);
                this.timer = undefined;
                let nowt = Date.now() / 1000;
                if(this.dit || this.dah) {
                        if(nowt-this.lastt > this.dit_len()*7) { this.output += "<br/>"; }
                        if(nowt-this.lastt > this.dit_len()*3) { this.output += " "; }
                }
                if((this.dit && this.dah) || this.play_next) {
                        if(this.play_dah) {
                                this.output += "-";
                                this.play(false);
                                this.timer = setTimeout(this.m_event,this.dit_len()*4*1000);
                                this.lastt = nowt+this.dit_len()*3;
                        } else {
                                //$('#didah').append(".");
                                this.output += ".";
                                this.play(true);
                                this.timer = setTimeout(this.m_event,this.dit_len()*2*1000);
                                this.lastt = nowt+this.dit_len();
                        }
                        this.play_dah = !this.play_dah;
                        this.play_next = false;
                        if(this.dit && this.dah) { this.play_next=true; }
                        return;
                }
                this.play_next = false
                if(this.dah) {
                        //$('#didah').append("-");
                        this.output += "-";
                        this.play(false);
                        this.timer = setTimeout(this.m_event.bind(this),this.dit_len()*4*1000);
                        this.play_dah = false;
                        this.lastt = nowt+this.dit_len()*3;
                        return;
                }
                if(this.dit) {
                        //$('#didah').append(".");
                        this.output += ".";
                        this.play(true);
                        this.timer = setTimeout(this.m_event.bind(this),this.dit_len()*2*1000);
                        this.play_dah = true;
                        this.lastt = nowt+this.dit_len();
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
                e.preventDefault()
                if( e.button == 0 ) { 
                        this.dit = 1;
                        this.down();
                        return false; 
                }
                if( e.button == 2 ) { 
                        this.dah=1;
                        this.down();
                        return false; 
                } 
                return true;   
        },
        mouseUp(e) {
                if( e.button == 0 ) { 
                        this.dit=0;
                        return false; 
                } 
                if( e.button == 2 ) { 
                        this.dah=0;
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
