<template>
  <div class="record">
    <button @click="reset()">Restart</button>        
    <h1>{{text}}</h1>
    <MorseInput :text="text" ref="input" @score="setScore"/>
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
      score: -1,
    }
  },
  created () {
  },
  computed: {
    text() {
      return this.$store.state.text.toUpperCase();
    },
  },
  watch: {
  },
  methods: {
    reset() {
      this.$refs.input.reset();
    },
    setScore(score) {
      this.score = score;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>