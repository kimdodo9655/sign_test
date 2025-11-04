import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import router from "./router";
import { useAuthStore } from "./stores/auth";
import "@/utils/performance"; // 성능 모니터링
// 전역 SCSS import
import "@/assets/styles/global.scss";

const app = createApp(App);
const pinia = createPinia();
const queryClient = new QueryClient();

// ✅ Pinia 연결
app.use(pinia);

// ✅ 라우터 및 기타 플러그인 등록
app.use(router);
app.use(VueQueryPlugin, { queryClient });

// ✅ 앱 마운트
app.mount("#app");

// ✅ 자동 로그아웃 타이머 (mount 이후 실행)
const authStore = useAuthStore();
authStore.startAutoLogout();
