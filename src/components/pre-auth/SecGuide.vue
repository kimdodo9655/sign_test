<template>
  <section class="pre-auth-section" id="section2">
    <article class="section guide-area">
      <div class="section-left">
        <div class="info">
          <h3>전자서명 진행 방법</h3>
          <p>전자서명은 금융기관으로부터 알림톡 또는 SMS가 발송되면 진행하실 수 있으며, 전자서명을 위해 유효기간이 30일 이상이 남은 공동인증서가 필요합니다.</p>
        </div>
        <LottieScrollAnimation :animation-data="jsonAnimation" v-if="isDesktop()" />
      </div>
      <div class="section-right"></div>
    </article>
  </section>
</template>

<script setup lang="ts">
import LottieScrollAnimation from "@/components/layout/LottieScrollAnimation.vue";
import jsonAnimation from "@/assets/images/icons/flaticon/json/strategy.json";
import { useDevice } from "@/composables/useDevice";

const { isDesktop } = useDevice();
</script>
