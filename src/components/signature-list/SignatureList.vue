<template>
  <section class="auth-section" id="section2">
    <article class="section guide-area">
      <div class="section-left">
        <div class="info">
          <h3>전자서명 목록</h3>
          <p>
            <span>김뱅클</span>
            님의
            <br />
            전자등기 전자서명 목록입니다.
            <br />
            <br />
            서명요청 단계의 전자등기 전자서명 목록의 전자문서를 확인 후 전자서명을 진행하시기 바랍니다.
          </p>
        </div>
        <LottieScrollAnimation :animation-data="jsonAnimation" v-if="isDesktop()" />
      </div>
      <div class="section-right">
        <ul>
          <li>
            <div class="list-head">
              <div class="icon-area"></div>
              <div class="text-area">
                <h3></h3>
                <p><span></span></p>
                <p><span></span></p>
                <p><span></span></p>
                <p><span></span></p>
              </div>
              <div class="btn-area"></div>
            </div>
            <div class="list-body"></div>
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import LottieScrollAnimation from "@/components/layout/LottieScrollAnimation.vue";
import jsonAnimation from "@/assets/images/icons/flaticon/json/form.json";
import { useDevice } from "@/composables/useDevice";

const { isDesktop } = useDevice();
</script>
