<template>
  <section class="pre-auth-section" id="section3">
    <article class="section install-program-area">
      <div class="section-left">
        <div class="info">
          <h3>프로그램 설치</h3>
          <p>안전한 시스템 이용을 위해 아래의 필수 프로그램이 설치해야 하며, 필수 프로그램 설치 완료 후 반드시 새로고침 또는 재접속하여 확인하시기바랍니다.</p>
          <p>
            <span></span>
            새로고침
          </p>
        </div>
        <LottieScrollAnimation :animation-data="jsonAnimation" />
      </div>
      <div class="section-right"></div>
    </article>
  </section>
</template>

<script setup lang="ts">
import LottieScrollAnimation from "@/components/layout/LottieScrollAnimation.vue";
import jsonAnimation from "@/assets/images/icons/flaticon/json/settings.json";
</script>
