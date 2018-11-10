<template>
  <div class="record">
    
    <h1>Input device</h1>
    <h2 v-bind:style="{ 'background-color': paddle_colorA }" @click="paddle('A')">Paddle Mode A</h2>
    <h2 v-bind:style="{ 'background-color': paddle_colorB }" @click="paddle('B')">Paddle Mode B</h2>
    <h2 v-bind:style="{ 'background-color': straight_color }" @click="straight()">Straight</h2>

    <h1>Your Call</h1>
    <input v-model="call" placeholder="Your call">

    <h1>Message</h1>
    <input v-model="text" placeholder="enter message">

    <h1>WPM</h1>
    <input v-model="wpm" placeholder="enter wpm">

    <h1>Freq (Hz)</h1>
    <input v-model="freq" placeholder="enter freq">

    <h1>Dit Button, Straight</h1>
    <div>
      <span v-bind:class="{ active: dit_button_state == 0 }" @click="dit_button(0)">Left</span> - <span v-bind:class="{ active: dit_button_state == 1 }" @click="dit_button(1)">Middle</span> - <span v-bind:class="{ active: dit_button_state == 2 }" @click="dit_button(2)">Right</span>
    </div>

    <h1>Dah Button</h1>
    <div>
      <span v-bind:class="{ active: dah_button_state == 0 }" @click="dah_button(0)">Left</span> - <span v-bind:class="{ active: dah_button_state == 1 }" @click="dah_button(1)">Middle</span> - <span v-bind:class="{ active: dah_button_state == 2 }" @click="dah_button(2)">Right</span>
    </div>

  </div>
</template>

<script>
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
    dit_button_state() {
      return this.$store.state.dit_button;
    },
    dah_button_state() {
      return this.$store.state.dah_button;
    },
    paddle_colorA() {
      if(this.$store.state.input_device == 'paddleA') {
        return 'green';
      }
      return 'white';
    },
    paddle_colorB() {
      if(this.$store.state.input_device == 'paddleB') {
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
        this.$store.dispatch('text', text);
      }
    },
    call: {
      get() {
        return this.$store.state.call;
      },
      set(text) {
        this.$store.dispatch('call', text);
      }
    },
    wpm: {
      get() {
        return this.$store.state.wpm;
      },
      set(wpm) {
        this.$store.dispatch('wpm', parseInt(wpm));
      }
    },
    freq: {
      get() {
        return this.$store.state.freq;
      },
      set(freq) {
        this.$store.dispatch('freq', parseInt(freq));
      }
    },
    input_device() {
      return this.$store.state.input_device;
    }
  },
  methods: {
    paddle(mode) {
      this.$store.dispatch('paddle'+mode);
    },
    straight() {
      this.$store.dispatch('straight');
    },
    dit_button(b) {
      this.$store.dispatch('dit_button', b);
    },
    dah_button(b) {
      this.$store.dispatch('dah_button', b);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.active {
  background-color: green;
}
</style>