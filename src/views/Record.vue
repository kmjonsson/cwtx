<template>
  <div class="record">
    <button @click="reset()">Restart</button>        
    <h1>{{text}}</h1>
    <div>
    <MorseInput :text="text" ref="input" @score="setScore"/>
    </div>
    <h2>Score: {{score}}</h2>
  </div>
</template>

<script>
// @ is an alias to /src
import MorseInput from '@/components/MorseInput.vue'

export default {
  name: 'record',
  components: {
    MorseInput,
  },
  data () {
    return {
      score: 0,
      text: this.$store.state.text.toUpperCase(),
      messages: [
        '#CALL#',
        'CQ',
        'CQ CQ CQ',
        'CQ DE #CALL#',
        '#CALL#',
        'QRZ?',
      ],
      n: 0,
    }
  },
  created () {
    this.next_msg();
  },
  computed: {
    Xtext() {
      return this.$store.state.text.toUpperCase();
    },
  },
  watch: {
  },
  methods: {
    next_msg() {
      let text = this.messages[this.n];
      text = text.replace("#CALL#",this.$store.state.call);
      this.n = (this.n+1) % this.messages.length;
      this.text = text;
    },
    reset() {
      this.$refs.input.reset();
    },
    setScore(score) {
      if(score != 'N/A') {
        this.score += score;
        this.next_msg();
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>