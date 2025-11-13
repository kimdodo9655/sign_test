<template>
  <ul class="support-info-list">
    <li>
      <div class="icon-area">
        <IconCall />
      </div>
      <div class="info-area">
        <h3>문의전화</h3>
        <p>070-1234-1234</p>
      </div>
    </li>
    <li>
      <div class="icon-area">
        <IconTime />
      </div>
      <div class="info-area">
        <h3>운영시간</h3>
        <p>
          월~금 09:00~18:00
          <span>(공휴일 제외)</span>
        </p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import IconCall from "@/assets/images/icons/flaticon/svg/telephone-call.svg";
import IconTime from "@/assets/images/icons/flaticon/svg/alarm-clock.svg";
</script>
