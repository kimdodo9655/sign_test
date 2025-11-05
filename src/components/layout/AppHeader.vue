<template>
  <header class="main-header">
    <div v-if="!isHelpPage" class="header-inner">
      <img src="@/assets/images/logo/test_bank_logo.png" alt="logo" />

      <!-- 로그인 전 -->
      <nav v-if="false">
        <ul>
          <li v-for="(menu, index) in menus" :key="index" :class="{ active: activeIndex === index }" @click="scrollToSection(index)">
            {{ menu }}
          </li>
        </ul>
      </nav>

      <!-- 로그인 후 -->
      <ul class="auth-btn-list" v-if="true">
        <li>
          <div class="icon-bg"><IconTime /></div>
          <p>00:00</p>
          <button class="time-btn">연장</button>
        </li>
        <li>
          <button class="logout-btn">로그아웃</button>
        </li>
      </ul>
    </div>

    <!-- 현재 경로가 '/help'일 경우 -->
    <div v-if="isHelpPage" class="header-inner help-header">
      <IconHelp />
      <p>
        전자서명
        <span>도움말</span>
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useScrollNavigation } from "@/composables/useScrollNavigation";

import IconHelp from "@/assets/images/icons/flaticon/svg/question.svg";
import IconTime from "@/assets/images/icons/flaticon/svg/alarm-clock.svg";

const menus = ["본인확인", "진행방법", "프로그램 설치", "공동인증센터", "도움말", "고객센터"];
const { activeIndex, scrollToSection } = useScrollNavigation();

const route = useRoute();
const isHelpPage = computed(() => route.path === "/help");
</script>
