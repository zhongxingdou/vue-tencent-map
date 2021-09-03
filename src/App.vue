<template>
<div>
  <h1>TencentMap</h1>
  <TencentMap :latitude="22.960268" :longitude="113.688582" name="东莞众为成科技有限公司" address="厚街镇陈屋旗鼓西路12号" label="众为成科技" />
</div>
</template>

<script>
import TencentMap from '../lib/TencentMap.vue'

export default {
  components: {
    TencentMap,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
