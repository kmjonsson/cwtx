<template>
  <div class="cwt">
    <Ditdah text="98" width="50px"/>
    <Space text="2" width="50px"/>
    <Ditdah text="3" width="150px"/>
    <Space text="2" width="50px"/>
    <Ditdah text="3" width="150px"/>
    <Space text="2" width="150px"/>
    <Ditdah text="3" width="150px"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Ditdah from '@/components/Ditdah.vue'
import Space from '@/components/Space.vue'

export default {
  name: 'home',
  components: {
    Ditdah,
    Space
  }
}
</script>
