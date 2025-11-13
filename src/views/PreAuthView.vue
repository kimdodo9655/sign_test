<!-- src/views/PreAuthView.vue -->
<!-- [PC/Mobile] 로그인 전 메인 -->

<template>
  <div class="app-container" ref="listRef">
    <SecVerification />
    <SecGuide v-if="isDesktop()" />
    <SecInstall v-if="isDesktop()" />
    <SecCertification v-if="isDesktop()" />
    <SecHelpSupport v-if="isDesktop()" />

    <SecMobSubNav v-if="isMobile()" class="mob-sub-nav" />
  </div>
</template>

<script setup lang="ts">
import SecVerification from "@/components/pre-auth/SecVerification.vue";
import SecGuide from "@/components/pre-auth/SecGuide.vue";
import SecInstall from "@/components/pre-auth/SecInstall.vue";
import SecCertification from "@/components/pre-auth/SecCertification.vue";
import SecHelpSupport from "@/components/common/SecHelpSupport.vue";
import SecMobSubNav from "@/components/pre-auth/SecMobSubNav.vue";

import { useDevice } from "@/composables/useDevice";
import { ref, provide } from "vue";
import { useDeviceDetection } from "@/composables/useDeviceDetection";

// ✅ 디바이스 감지 전역 제공
const deviceDetection = useDeviceDetection();
provide("deviceDetection", deviceDetection);

// 스크롤 타깃 ref
const listRef = ref<HTMLElement | null>(null);

const { isDesktop, isMobile } = useDevice();
</script>
