<script setup>
import { useRouter } from "vue-router";

import picLIS from "../assets/lis.png";

const router = useRouter();
const toLIS = () => router.push({ name: "LongestIncreasingSubsequence" });

const articles = [
  {
    title: "最长递增子序列（贪心 + 二分查找）",
    subTitle: "Longest Increasing Subsequence",
    pic: picLIS,
  },
];
</script>

<template>
  <div class="article-list">
    <div v-for="(article, index) in articles" :key="index" class="article-item">
      <img style="height: 80px; margin-right: 40px" :src="article.pic" />
      <el-link @click="toLIS">
        <div class="article-item__title">
          {{ article.title }}
        </div>
        <div class="article-item__subtitle">
          {{ article.subTitle }}
        </div>
      </el-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-list {
  width: 800px;
  height: 100%;
  margin: 40px auto;
}

.article-item {
  padding: 20px;
  display: flex;
  align-items: center;

  &__title {
    margin-bottom: 8px;
    font-size: 24px;
  }

  &__subtitle {
    font-size: 20px;
    color: #909399;
  }
}
</style>
