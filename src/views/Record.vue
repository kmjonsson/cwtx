<template>
  <div class="record">
    <Paddle :wpm=15 />
  </div>
</template>

<script>
// @ is an alias to /src
import Paddle from '@/components/Paddle.vue'

export default {
  name: 'record',
  components: {
    Paddle
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>