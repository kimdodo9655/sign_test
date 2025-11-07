<template>
  <footer class="main-footer">
    <div class="footer-inner">
      <img v-if="isDesktop()" src="@/assets/images/logo/bankclear_logo.png" alt="bankclear logo pc" />
      <img v-if="isMobile()" src="@/assets/images/logo/bankclear_logo_gray.png" alt="bankclear logo mob" />
      <ul>
        <li>㈜뱅크클리어</li>
        <li>대표이사 : 한준희</li>
        <li>주소 : (04345) 서울특별시 용산구 회나무로 32, 2층 (이태원동)</li>
        <li>전화번호 : 070-7705-7822</li>
        <li v-if="isDesktop()" class="flex-break"></li>
        <li>사업자등록번호 : 537-87-02438</li>
        <li>통신판매번호 : 2023-서울중구-0052</li>
      </ul>
      <p>
        ※ 본 시스템은 {금융기관 명칭}의 업무 위탁을 통해
        <br v-if="isMobile()" />
        ㈜뱅크클리어에서 서비스를 제공하고 있습니다.
      </p>

      <div class="footer-bottom">
        <ul>
          <!-- 추후에 modal로 html text 조회 필요. -->

          <li>서비스 이용약관</li>
          <li>개인정보처리방침</li>
        </ul>

        <p>COPYRIGHT ⓒ 2025 BANKCLEAR Inc. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useDevice } from "@/composables/useDevice";

const { isDesktop, isMobile } = useDevice();
</script>
