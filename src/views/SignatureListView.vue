<template>
  <div class="app-container" ref="listRef">
    <SignatureList />
  </div>
</template>

<script setup lang="ts">
import SignatureList from "@/components/signature-list/SignatureList.vue";

// import { useDevice } from "@/composables/useDevice";
import { provide } from "vue";
import { useDeviceDetection } from "@/composables/useDeviceDetection";

// ✅ 디바이스 감지 전역 제공
const deviceDetection = useDeviceDetection();
provide("deviceDetection", deviceDetection);

// const { isDesktop, isMobile } = useDevice();
</script>
