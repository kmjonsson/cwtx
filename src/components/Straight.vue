<template>
  <div></div>
</template>

<script>

export default {
  name: 'straight',
  data () {
        return {
          ctx: undefined,
          AudioContext: window.AudioContext || window.webkitAudioContext,
          start_time: 0,
          output: undefined,
          gainNode: undefined,
          is_down: false,
        };
  },
  props: {
        freq: { type: Number, default: 550 },
  },
  methods: {
        down() {                
                let nowt = performance.now() / 1000;                
                if(this.is_down) { return; }
                this.is_down = true;
                if(this.start_time == 0) {
                        this.start_time = nowt;
                }
                this.play();
                this.$emit('on',nowt-this.start_time);
                
        },
        up() {
                let nowt = performance.now() / 1000;
                if(!this.is_down) { return; }
                this.is_down = false;
/*                let t = 0.1;
                let n = 50;
                for(let i=1;i<n;i++) {
                        //console.log(1-i/n);
                        this.gainNode.gain.setValueAtTime(1-i/n, this.ctx.currentTime+(t/n*i));
                }*/
                this.output.stop(this.ctx.currentTime);
                this.$emit('off',nowt-this.start_time);
        },
        play() {                
                let b = this.ctx.createBuffer(1, this.sample.length, this.ctx.sampleRate);
                b.copyToChannel(new Float32Array(this.sample),0,0);
                let o = this.ctx.createBufferSource();
                o.buffer = b;
                o.start(this.ctx.currentTime);
                //o.connect(this.ctx.destination);

                let gainNode = this.ctx.createGain();
                gainNode.gain.value = 1;
                o.connect(gainNode);
                gainNode.connect(this.ctx.destination);
                this.output = o;
                this.gainNode = gainNode;
        },
        mouseDown(e) {                
                if( e.button == 1 || e.button == 2 ) { 
                        this.down();
                        e.preventDefault();
                        return false; 
                }
                return true;   
        },
        mouseUp(e) {
                if( e.button == 1 || e.button == 2 ) { 
                        this.up();
                        e.preventDefault()
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
        this.sample = this.gen_sample(10); // max 10s
        document.addEventListener('mousedown', this.mouseDown);
        document.addEventListener('mouseup', this.mouseUp);
        document.addEventListener('contextmenu', this.contextMenu);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
