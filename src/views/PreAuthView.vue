<template>
  <div>
    <AppHeader />

    <div class="app-container">
      <SecVerification />
      <SecGuide />
      <SecInstall />
      <SecCertification />
      <SecHelp />
      <SecSupport />

      <SecMobSubNav v-if="isMobile()" class="mob-sub-nav" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/layout/AppHeader.vue";
import SecVerification from "@/components/pre-auth/SecVerification.vue";
import SecGuide from "@/components/pre-auth/SecGuide.vue";
import SecInstall from "@/components/pre-auth/SecInstall.vue";
import SecCertification from "@/components/pre-auth/SecCertification.vue";
import SecHelp from "@/components/pre-auth/SecHelp.vue";
import SecSupport from "@/components/pre-auth/SecSupport.vue";
import SecMobSubNav from "@/components/pre-auth/SecMobSubNav.vue";

import { useDevice } from "@/composables/useDevice";

const { isMobile } = useDevice();
</script>
