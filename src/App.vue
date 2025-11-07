<!-- src/App.vue -->
<template>
  <div class="app-root" :data-device="deviceType">
    <PreAuthView />

    <router-link to="/">
      <button class="nav-button">Root</button>
    </router-link>
    <router-link to="/about">
      <button class="nav-button">About</button>
    </router-link>
    <router-link to="/404">
      <button class="nav-button">404</button>
    </router-link>
    <router-view />

    <DeviceTestController />
    <DevBanner v-if="showDevBanner" />

    type : {{ deviceType }}

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import DevBanner from "@/components/layout/DevBanner.vue";
import { env } from "@/utils/env";
import axios from "axios";
import { ref, onMounted, provide } from "vue";

import { useDeviceDetection } from "./composables/useDeviceDetection";
import DeviceTestController from "./components/dev/DeviceTestController.vue";

import PreAuthView from "@/views/PreAuthView.vue";

import AppFooter from "@/components/layout/AppFooter.vue";

// ✅ 디바이스 감지 전역 제공
const deviceDetection = useDeviceDetection();
provide("deviceDetection", deviceDetection);

// 구조 분해를 통해 개별 값 접근
const { deviceType } = deviceDetection;

/* --------------------------
  ✅ 개발 배너 표시 여부
--------------------------- */
const showDevBanner = env.isDev();

/* --------------------------
  ✅ API 연결 테스트
--------------------------- */
const logoUrl = ref<string | null>(null);

const checkApiConnection = async (): Promise<void> => {
  try {
    const response = await axios.get("http://localhost:8200/main/logo", { timeout: 5000 });
    if (response.data?.status === 200 && response.data?.data) {
      logoUrl.value = response.data.data;
      console.log("✅ API 연결 성공:", logoUrl.value);
    } else {
      console.warn("⚠️ 예기치 않은 응답:", response.data);
    }
  } catch (error: any) {
    console.error("❌ API 연결 실패:", error.message || error);
  }
};

/* --------------------------
  ✅ 초기 감지 + 테스트용 기본 모드
--------------------------- */
onMounted(() => {
  checkApiConnection();
});
</script>
