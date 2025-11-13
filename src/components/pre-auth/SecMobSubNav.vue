<template>
  <section>
    <article class="mob-sub-nav">
      <h2>
        <span>전자서명</span>
        절차부터
        <span>고객지원</span>
        까지,
        <br />
        필요한 정보를 한눈에.
      </h2>
      <ul>
        <li class="left">
          <button @click="openPopup">
            <h4>
              진행방업
              <span></span>
            </h4>
            <p>전자등기 전자서명 업무를 진행 단계별로 소개합니다.</p>
          </button>

          <button @click="openPopup">
            <h4>
              도움말
              <span></span>
            </h4>
            <p>공동인증서와 전자서명 관련 문의사항에 대한 답변을 제공합니다.</p>
          </button>
        </li>
        <li class="right">
          <button @click="openPopup">
            <h4>
              공동인증센터
              <span></span>
            </h4>
            <p>PC나 USB에 저장된 공동인증서를 브라우저 인증서로 복제합니다.</p>
          </button>
        </li>
      </ul>
    </article>
  </section>

  <CommonPopup v-model="isPopupOpen" type="popup" title="알림" @close="handlePopupClose">
    <p>이것은 팝업 내용입니다.</p>
    <p>X 버튼으로 닫을 수 있습니다.</p>
  </CommonPopup>
</template>

<script setup lang="ts">
import CommonPopup from "@/components/layout/CommonPopup.vue";
import { ref } from "vue";

const isPopupOpen = ref(false);

const openPopup = () => {
  isPopupOpen.value = true;
};

const handlePopupClose = () => {
  console.log("팝업이 닫혔습니다");
};
</script>
