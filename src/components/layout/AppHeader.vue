<template>
  <header class="main-header">
    <div class="header-inner">
      <img src="@/assets/images/logo/test_bank_logo.png" alt="logo" />
      <nav>
        <ul>
          <li v-for="(menu, index) in menus" :key="index" :class="{ active: activeIndex === index }" @click="scrollToSection(index)">
            {{ menu }}
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useScrollNavigation } from "@/composables/useScrollNavigation";

const menus = ["본인확인", "진행방법", "프로그램 설치", "공동인증센터", "도움말", "고객센터"];

const { activeIndex, scrollToSection } = useScrollNavigation();
</script>
