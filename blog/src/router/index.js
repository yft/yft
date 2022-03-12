import { createRouter, createWebHashHistory } from "vue-router";

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
  {
    path: "/zheng-ze-biao-da-shi-pi-pei-lcof",
    name: "ZhengZeBiaoDaShiPiPeiLcof",
    component: () => import("../views/ZhengZeBiaoDaShiPiPeiLcof.vue"),
  },
  { path: "/:pathMatch(.*)*", redirect: { name: "HomePage" } },
];

const router = createRouter({
  history: createWebHashHistory("/yft/"),
  routes,
});

export default router;
