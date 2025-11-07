<script setup lang="ts">
import { ref } from "vue";
import { useDevice } from "@/composables/useDevice";

const { deviceType, isDevMode, realDeviceType, isMac, toggleDevice, resetToRealDevice } = useDevice();

const isExpanded = ref(false);

const togglePanel = () => {
  isExpanded.value = !isExpanded.value;
};

const isDevelopment = import.meta.env.DEV;
</script>

<template>
  <div v-if="isDevelopment" class="dev-tool" :data-device="deviceType">
    <button class="fab" :class="{ 'is-active': isExpanded, 'is-dev-mode': isDevMode }" @click="togglePanel">
      <span v-if="!isExpanded" class="fab__icon">🔧</span>
      <span v-else class="fab__icon fab__icon--close">×</span>
    </button>

    <transition name="panel">
      <div v-if="isExpanded" class="panel">
        <div class="panel__header">
          <span class="panel__title">개발자 도구</span>
          <span v-if="isDevMode" class="panel__badge">테스트 모드</span>
        </div>

        <div class="panel__body">
          <div class="info">
            <div class="info__row">
              <span class="info__label">현재 표시:</span>
              <span class="info__value" :class="`info__value--${deviceType}`">
                {{ deviceType === "mobile" ? "📱 모바일" : "💻 데스크톱" }}
              </span>
            </div>

            <div v-if="isDevMode" class="info__row">
              <span class="info__label">실제 기기:</span>
              <span class="info__value info__value--real">
                {{ realDeviceType === "mobile" ? "📱 모바일" : "💻 데스크톱" }}
              </span>
            </div>

            <div class="info__row">
              <span class="info__label">Mac 여부:</span>
              <span class="info__value" :class="isMac() ? 'info__value--mac' : 'info__value--not-mac'">
                {{ isMac() ? "🍎 Mac" : "🪟/Windows/Linux" }}
              </span>
            </div>
          </div>

          <div class="buttons">
            <button class="btn btn--toggle" @click="toggleDevice">
              <span class="btn__icon">🔄</span>
              <span class="btn__text">
                {{ deviceType === "mobile" ? "PC 모드" : "모바일" }}
              </span>
            </button>

            <button v-if="isDevMode" class="btn btn--reset" @click="resetToRealDevice">
              <span class="btn__icon">↺</span>
              <span class="btn__text">리셋</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss" as *;
@use "@/assets/styles/_device.scss" as *;
@use "@/assets/styles/_mixins.scss" as *;

$fab-size-desktop: 56px;
$fab-size-mobile: 48px;
$panel-width-desktop: 280px;
$panel-width-mobile: 260px;

.dev-tool {
  position: fixed;
  z-index: $z-index-dev-tool;

  @include desktop {
    bottom: $desktop-spacing-md;
    right: $desktop-spacing-md;
  }

  @include mobile {
    bottom: $mobile-spacing-md;
    right: $mobile-spacing-md;
  }
}

.fab {
  @include flex-center;
  border: none;
  background: linear-gradient(135deg, $color-primary 0%, $color-secondary 100%);
  box-shadow: $shadow-base;
  cursor: pointer;
  transition: all $transition-base $transition-timing;
  position: relative;
  z-index: calc($z-index-dev-tool + 1);
  border-radius: $border-radius-full;

  @include desktop {
    width: $fab-size-desktop;
    height: $fab-size-desktop;
  }

  @include mobile {
    width: $fab-size-mobile;
    height: $fab-size-mobile;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  &.is-active {
    background: linear-gradient(135deg, #f093fb 0%, $color-danger 100%);
  }

  &.is-dev-mode::after {
    content: "";
    position: absolute;
    top: -2px;
    right: -2px;
    width: 16px;
    height: 16px;
    background: $color-danger;
    border-radius: $border-radius-full;
    border: 2px solid white;
    animation: pulse 2s infinite;
  }

  &__icon {
    color: white;
    line-height: 1;

    @include desktop {
      font-size: 24px;
    }

    @include mobile {
      font-size: 20px;
    }

    &--close {
      font-weight: 300;

      @include desktop {
        font-size: 32px;
      }

      @include mobile {
        font-size: 28px;
      }
    }
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

.panel {
  position: absolute;
  background: $color-bg-primary;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-base;
  overflow: hidden;

  @include desktop {
    bottom: 70px;
    right: 0;
    min-width: $panel-width-desktop;
    max-width: 320px;
  }

  @include mobile {
    bottom: 64px;
    right: 0;
    min-width: $panel-width-mobile;
    max-width: calc(100vw - 32px);
  }

  &__header {
    @include flex-between;
    background: linear-gradient(135deg, $color-primary 0%, $color-secondary 100%);
    color: white;
    padding: 14px $spacing-pc-md;
  }

  &__title {
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.3px;
  }

  &__badge {
    background: rgba(255, 255, 255, 0.25);
    color: white;
    padding: 3px 10px;
    border-radius: $border-radius-lg;
    font-size: 11px;
    font-weight: 600;
    backdrop-filter: blur(10px);
  }

  &__body {
    padding: $spacing-pc-md;
  }
}

.info {
  margin-bottom: $spacing-pc-md;
  padding-bottom: $spacing-pc-md;
  border-bottom: 1px solid $color-border;

  &__row {
    @include flex-between;
    margin-bottom: 10px;
    font-size: 13px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__label {
    color: $color-text-secondary;
    font-weight: 500;
  }

  &__value {
    font-weight: 600;
    padding: 5px 10px;
    border-radius: $border-radius-sm;
    font-size: 12px;

    &--mobile {
      background: #e3f2fd;
      color: #1976d2;
    }

    &--desktop {
      background: #f3e5f5;
      color: #7b1fa2;
    }

    &--real {
      background: #e8f5e9;
      color: #388e3c;
    }

    &--mac {
      background: #e8f5e9;
      color: #2e7d32;
    }

    &--not-mac {
      background: #e3f2fd;
      color: #1976d2;
    }
  }
}

.buttons {
  display: flex;
  gap: $spacing-pc-xs;

  @include mobile {
    flex-direction: column;
  }
}

.btn {
  @include button-base;
  @include flex-center;
  flex: 1;
  gap: 6px;
  padding: 10px 14px;
  font-size: 13px;
  font-family: inherit;

  @include mobile {
    width: 100%;
  }

  &__icon {
    font-size: 16px;
    line-height: 1;
  }

  &__text {
    white-space: nowrap;
  }

  &--toggle {
    background: linear-gradient(135deg, $color-primary 0%, $color-secondary 100%);
    color: white;

    &:hover {
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
  }

  &--reset {
    background: linear-gradient(135deg, #f093fb 0%, $color-danger 100%);
    color: white;

    &:hover {
      box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);
    }
  }
}

.panel-enter-active,
.panel-leave-active {
  transition: all $transition-base $transition-timing;
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}
</style>
