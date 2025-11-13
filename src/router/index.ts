import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { useDeviceDetection } from "@/composables/useDeviceDetection";

const { isMobile } = useDeviceDetection();

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/PreAuthView.vue"),
  },
  // 테스트용 분기 라우터
  {
    path: "/list",
    name: "List",
    component: () => import("@/views/SignatureListView.vue"),
  },
  {
    path: "/help",
    name: "Help",
    component: () => import("@/views/PcHelpCenterView.vue"),
    beforeEnter: (_to, _from, next) => {
      if (isMobile()) {
        next({ name: "NotFound" });
      } else {
        next();
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
