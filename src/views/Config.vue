<template>
  <div class="record">
    
    <h1>Input device</h1>
    <h2 v-bind:style="{ 'background-color': paddle_color }" @click="paddle()">Paddle</h2>
    <h2 v-bind:style="{ 'background-color': straight_color }" @click="straight()">Straight</h2>

    <h1>Message</h1>
    <input v-model="text" placeholder="enter message">

    <h1>WPM</h1>
    <input v-model="wpm" placeholder="enter wpm">

    <h1>Freq (Hz)</h1>
    <input v-model="freq" placeholder="enter freq">

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'config',
  components: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    paddle_color() {
      if(this.$store.state.input_device == 'paddle') {
        return 'green';
      }
      return 'white';
    },
    straight_color() {
      if(this.$store.state.input_device == 'straight') {
        return 'green';
      }
      return 'white';
    },
    text: {
      get() {
        return this.$store.state.text;
      },
      set(text) {
        this.$store.commit('text', text);
      }
    },
    wpm: {
      get() {
        return this.$store.state.wpm;
      },
      set(wpm) {
        this.$store.commit('wpm', parseInt(wpm));
      }
    },
    freq: {
      get() {
        return this.$store.state.freq;
      },
      set(freq) {
        this.$store.commit('freq', parseInt(freq));
      }
    },
    input_device() {
      return this.$store.state.input_device;
    }
  },
  methods: {
    paddle() {
      this.$store.commit('paddle');
    },
    straight() {
      this.$store.commit('straight');
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>