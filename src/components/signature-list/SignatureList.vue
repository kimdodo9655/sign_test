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
                <h3>서명요청</h3>
                <p>
                  금융기관 :
                  <span>주식회사뱅클은행</span>
                </p>
                <p>
                  대출예정일자 :
                  <span>2025-06-25</span>
                </p>
                <p>
                  채무자 :
                  <span>김뱅클</span>
                </p>
                <p>
                  채권최고액 :
                  <span>200,000,000원</span>
                </p>
              </div>
              <div class="btn-area">
                <button>상세정보 보기</button>
                <button>전자문서 보기</button>
              </div>
            </div>
            <div class="list-body">
              <div class="bg-area"></div>
              <ul class="list-info-area">
                <li>
                  <h4>담보 부동산 주소</h4>
                  <p>서울특별시 용산구 회나무로 32, 101동 102호(이태원동, 뱅클아파트)</p>
                </li>
                <li>
                  <h4>진행 등기유형</h4>
                  <ul>
                    <li>
                      <h4></h4>
                      <p></p>
                    </li>
                    <li>
                      <h4></h4>
                      <p></p>
                    </li>
                    <li>
                      <h4></h4>
                      <p></p>
                    </li>
                  </ul>
                </li>
                <li>
                  <h4>서명 대상 전자문서</h4>
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </li>
                <li>
                  <h4>서명완료일시</h4>
                  <p>미완료</p>
                </li>
              </ul>
            </div>
          </li>
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
