<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const toHome = () =>
  router.push({
    name: "HomePage",
  });
</script>

<template>
  <div class="comp-cd-home">
    [root@??? /{{ route.name }}]#&nbsp;
    <el-link class="cd-home-link" @click="toHome"> cd /home </el-link>
  </div>
</template>

<style lang="scss" scoped>
.comp-cd-home {
  font-size: 24px;
  color: #909399;
}

.cd-home-link {
  color: coral;
  font-size: inherit;
  vertical-align: baseline;
}
</style>
