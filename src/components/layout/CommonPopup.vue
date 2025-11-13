<!-- src/components/layout/CommonPopup.vue -->

<template>
  <div v-if="modelValue" class="popup-common-overlay">
    <div class="popup-common">
      <header class="popup-common-header">
        <div class="btn-area" :class="type === 'popup' ? 'close' : 'prev'" @click="handleClose">
          <IconClose v-if="type === 'popup'" />
          <IconPrev v-if="type === 'page'" />
        </div>
        <h3>{{ title }}</h3>
      </header>
      <div class="popup-common-contents">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconClose from "@/assets/images/icons/iconoir/svg/xmark.svg";
import IconPrev from "@/assets/images/icons/iconoir/svg/arrow-left.svg";

interface Props {
  modelValue: boolean;
  type?: "popup" | "page" | "desktop";
  title?: string;
  closeOnOverlay?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "popup",
  title: "Common Popup Title",
  closeOnOverlay: true,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  close: [];
}>();

const handleClose = () => {
  emit("update:modelValue", false);
  emit("close");
};

// props를 "사용"한 것으로 처리
void props;

// const handleOverlayClick = () => {
//   if (props.closeOnOverlay) {
//     handleClose();
//   }
// };
</script>
