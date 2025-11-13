<template>
  <section class="pre-auth-section" id="section4">
    <article class="section cert-center-area">
      <div class="section-left">
        <div class="info">
          <h3>공동인증센터</h3>
          <p>브라우저 인증서 복사 기능을 이용하여 하드디스크 또는 이동식 디스크에 저장되어 있는 공동인증서를 브라우저 인증서로 복제합니다.</p>
        </div>
        <LottieScrollAnimation :animation-data="jsonAnimation" v-if="isDesktop()" />
      </div>
      <div class="section-right"></div>
    </article>
  </section>
</template>

<script setup lang="ts">
import LottieScrollAnimation from "@/components/layout/LottieScrollAnimation.vue";
import jsonAnimation from "@/assets/images/icons/flaticon/json/database-security.json";
import { useDevice } from "@/composables/useDevice";

const { isDesktop } = useDevice();
</script>
