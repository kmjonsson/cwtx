<template>
  <div class="record">
    <Paddle :freq=freq :wpm="wpm" v-on:on="on" v-on:off="off" />
    <div class="cwt">
    <template v-for="e in events">
      <Ditdah v-if="e.type == '-'" :text="''+e.len" :width="e.len + 'px'"/>
      <Space v-if="e.type == ' '" :text="''+e.len" :width="e.len + 'px'"/>
    </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Paddle from '@/components/Paddle.vue'
import Space from '@/components/Space.vue'
import Ditdah from '@/components/Ditdah.vue'

export default {
  name: 'record',
  components: {
    Paddle,
    Space,
    Ditdah,
  },
  data () {
    return {
      events: [],
      on_at: -1,
      off_at: -1,
      wpm: 15,
      freq: 550,
    }
  },
  methods: {
    on(t) {
      if(this.off_at != -1) {
        this.events.push({
          id: t,
          type: ' ',
          len: parseInt((t-this.off_at)/this.dit_len()*50),
        });
      }
      this.on_at = t;
    },
    off(t) {
      this.events.push({
        id: t,
        type: '-',
        len: parseInt((t-this.on_at)/this.dit_len()*50),
      });
      this.off_at = t;
    },
    dit_len() {
      let dit = 60 / (this.wpm * 50);      // PARIS
      // Always end sine @ 0 for better sound.
      return Math.round(dit * this.freq) / this.freq;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cwt {
        height: 150px;
}
</style>