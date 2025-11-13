<!-- src/views/HelpCenter.vue -->
<!-- PC --- 로그인 후 전자서명 목록 FAB -->

<template>
  <div class="app-container">
    <SecHelpSupport />

    <footer class="help-footer">
      <img src="@/assets/images/logo/bankclear_logo_gray.png" alt="help footer logo" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import SecHelpSupport from "@/components/common/SecHelpSupport.vue";
</script>
