# vue-tencent-map

## Install
`npm install vue-tencent-map`

## Usage

1. include api script
`<script src="//map.qq.com/api/gljs?v=1.exp&key=<developerKey>"></script>`

2. use in template
```vue
<template>
<div>
  <h1>TencentMap</h1>
  <TencentMap :latitude="32.960268" :longitude="213.688582" name="科技有限公司" address="镇鼓西路12号" label="科技" />
</div>
</template>

<script>
import TencentMap from 'vue-tencent-map'

export default {
  components: {
    TencentMap,
  }
}
</script>
```
