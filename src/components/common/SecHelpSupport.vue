<template>
  <section class="pre-auth-section" id="section5">
    <article class="section help-area">
      <div class="section-left">
        <div class="info">
          <h3>도움말</h3>
          <p>전자서명 관련 궁금한 사항과 유사한 내용을 먼저 확인하시고, 원하시는 답변이 존재하지 않는 경우 고객센터로 문의 바랍니다.</p>
          <p>
            고객센터 바로가기
            <span></span>
          </p>
        </div>
        <LottieScrollAnimation :animation-data="jsonAnimation" v-if="isDesktop()" />
      </div>
      <div class="section-right"></div>
    </article>
  </section>

  <section class="pre-auth-full-width-section" :class="isHelpPage ? 'help-link-area' : ''" id="section6">
    <article class="full-width-section-inner support-area">
      <h3>고객센터</h3>
      <p>
        전자등기 전자서명 진행 시 문제가 발생하면 고객센터로 연락 바라며, 필요 시 원격지원 요청이 있을 수 있습니다.
        <br />
        다만, 공동인증서 관련 문의는 금융기관으로 진행바랍니다.
      </p>
      <SupportInfo />
    </article>
  </section>
</template>

<script setup lang="ts">
import LottieScrollAnimation from "@/components/layout/LottieScrollAnimation.vue";
import jsonAnimation from "@/assets/images/icons/flaticon/json/faq.json";
import { useDevice } from "@/composables/useDevice";
import SupportInfo from "@/components/common/SupportInfo.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isHelpPage = computed(() => route.path === "/help");

const { isDesktop } = useDevice();
</script>
