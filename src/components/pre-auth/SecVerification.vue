<template>
  <section class="pre-auth-section" id="section1">
    <article class="section sign-area">
      <div class="section-left">
        <div class="info">
          <h3>전자등기 전자서명이란?</h3>
          <p>부동산 담보 대출에 필요한 근저당권설정 계약서 등의 등기 서류를 인터넷등기소에 제출하기 위해 공동인증서를 사용하여 본인확인 및 서명날인 업무를 진행하는 절차입니다.</p>
        </div>

        <LottieScrollAnimation :animation-data="jsonAnimation" v-if="isDesktop()" />
      </div>
      <div class="section-right">
        <div class="tab-header">
          <ul>
            <li class="tab active">전자서명을 위한 본인확인</li>
          </ul>
        </div>
        <div class="section-cont sign-cont tab-cont">
          <div class="sign-left">
            <h4 class="cont-title">본인확인 정보 입력</h4>
            <p class="cont-sub-text">본인확인에 필요한 주민등록번호를 입력바랍니다.</p>
            <input type="number" />
            <h4 class="cont-title">필수 동의</h4>
            <input type="checkbox" />
            <p class="cont-sub-text">서비스 이용에 따른 필수 동의를 진행바랍니다.</p>
            <input type="checkbox" />
            <label for="">개인정보 이용 동의</label>
            <button @click="openPopup">보기</button>

            <input type="checkbox" />
            <label for="">제 3자 정보제공 동의</label>
            <button @click="openPopup">보기</button>

            <input type="checkbox" />
            <label for="">고유식별 정보처리 동의</label>
            <button @click="openPopup">보기</button>

            <button>공동인증서 본인확인</button>
          </div>
          <div class="sign-right">
            <div class="sign-check-list-area">
              <h4 class="cont-title">전자등기 전자서명 체크사항</h4>
              <p class="cont-sub-text">전자등기 전자서명 진행 전에 반드시 체크바랍니다.</p>

              <ul class="sign-check-list">
                <li>
                  <div class="sign-check-icon-box"></div>
                  <h4>전자서명 진행상태를 확인하세요</h4>
                  <p>
                    전자서명을 진행할 상태가 되면,
                    <br />
                    금융기관에서 알림톡 또는 SMS가 발송됩니다.
                  </p>
                </li>
                <li>
                  <div class="sign-check-icon-box"></div>
                  <h4>공동인증서를 준비하세요.</h4>
                  <p>
                    전자등기 전자서명을 진행하시려면,
                    <br />
                    개인 또는 범용 공동인증서가 반드시 필요합니다.
                  </p>
                </li>
                <li>
                  <div class="sign-check-icon-box"></div>
                  <h4>공동인증서 유효기간을 확인하세요.</h4>
                  <p>
                    공동인증서의 유효기간은
                    <br />
                    최소 30일 이상이 남아 있어야 합니다.
                  </p>
                </li>
                <li>
                  <div class="sign-check-icon-box"></div>
                  <h4>PC 또는 모바일 단말기를 확인하세요.</h4>
                  <p>
                    전자서명은 Window PC와 모바일에서 가능합니다.
                    <br />
                    (단, 모바일은 브라우저 인증서만 가능합니다.)
                  </p>
                </li>
              </ul>

              <button class="sign-check-bottom-btn">확인</button>
            </div>
          </div>
        </div>
      </div>
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

import LottieScrollAnimation from "@/components/layout/LottieScrollAnimation.vue";
import jsonAnimation from "@/assets/images/icons/flaticon/json/agreement.json";

import { useDevice } from "@/composables/useDevice";

const { isDesktop } = useDevice();

const isPopupOpen = ref(false);

const openPopup = () => {
  isPopupOpen.value = true;
};

const handlePopupClose = () => {
  console.log("팝업이 닫혔습니다");
};
</script>
