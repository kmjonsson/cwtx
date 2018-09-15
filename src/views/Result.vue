<template>
  <div class="cwt">
    <Ditdah text="100%" width="50px" letter="W"/>
    <Ditdah text="78%" width="150px"/>
    <Ditdah text="100%" width="150px"/>
    <Ditdah text="3" width="150px" letter="N"/>
    <Ditdah text="100%" width="50px"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Ditdah from '@/components/Ditdah.vue'
//import Space from '@/components/Space.vue'

export default {
  name: 'home',
  components: {
    Ditdah,
    Space
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cwt {
        height: 150px;
}
</style>