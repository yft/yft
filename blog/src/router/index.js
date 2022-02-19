import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/longest-increasing-subsequence",
    name: "LongestIncreasingSubsequence",
    component: () => import("../views/LongestIncreasingSubsequence.vue"),
  },
  { path: "/:pathMatch(.*)*", redirect: { name: "HomePage" } },
];

const router = createRouter({
  history: createWebHistory("/yft/"),
  routes,
});

export default router;
