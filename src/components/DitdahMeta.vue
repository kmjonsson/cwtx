<template>
  <Ditdah v-if="e.type == '-'">
  <Ditdah v-if="e.type == ' '">
</template>

<script>
// @ is an alias to /src
import Ditdah from '@/components/Ditdag.vue'
import Space  from '@/components/Space.vue'

export default {
  name: 'ditdahmeta',
  props: {
    e: Object,
  },
  computed: {
  },
  components: {
    Ditdah,
    Space,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
