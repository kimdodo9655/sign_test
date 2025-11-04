<!-- src/App.vue -->
<template>
  <div class="app-root" :data-device="deviceType">
    <PreAuthView />

    <footer class="main-footer" v-if="false">
      <div class="footer-inner">
        <img v-if="deviceType === 'desktop'" src="@/assets/images/logo/bankclear_logo.png" alt="bankclear logo pc" />
        <img v-if="deviceType === 'mobile'" src="@/assets/images/logo/bankclear_logo_gray.png" alt="bankclear logo mob" />
        <ul>
          <li>㈜뱅크클리어</li>
          <li>대표이사 : 한준희</li>
          <li>주소 : (04345) 서울특별시 용산구 회나무로 32, 2층 (이태원동)</li>
          <li>전화번호 : 070-7705-7822</li>
          <li>사업자등록번호 : 537-87-02438</li>
          <li>통신판매번호 : 2023-서울중구-0052</li>
        </ul>
        <p>※ 본 시스템은 {금융기관 명칭}의 업무 위탁을 통해 ㈜뱅크클리어에서 서비스를 제공하고 있습니다.</p>

        <div class="footer-bottom">
          <nav>
            <ul>
              <li>서비스 이용약관</li>
              <li>개인정보처리방침</li>
            </ul>
          </nav>

          <p>COPYRIGHT ⓒ 2025 BANKCLEAR Inc. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>

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
  </div>
</template>

<script setup lang="ts">
import DevBanner from "@/components/layout/DevBanner.vue";
import { env } from "@/utils/env";
import axios from "axios";
import { ref, onMounted } from "vue";

import { useDeviceDetection } from "./composables/useDeviceDetection";
import DeviceTestController from "./components/dev/DeviceTestController.vue";

import PreAuthView from "@/views/PreAuthView.vue";

const { deviceType } = useDeviceDetection();

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
