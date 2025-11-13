<template>
  <div ref="lottieContainer" class="lottie-wrapper"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import lottie from "lottie-web";
import type { AnimationItem } from "lottie-web";

interface Props {
  animationData: object; // JSON 데이터
  loop?: boolean; // 반복 재생 여부
  autoplay?: boolean; // 자동 재생 여부
  threshold?: number; // 화면에 얼마나 보일 때 재생할지 (0.0 ~ 1.0)
  speed?: number; // 재생 속도 (1 = 정상, 2 = 2배속)
}

const props = withDefaults(defineProps<Props>(), {
  loop: false,
  autoplay: false,
  threshold: 0.5,
  speed: 1,
});

const emit = defineEmits<{
  complete: [];
  play: [];
  stop: [];
}>();

const lottieContainer = ref<HTMLElement | null>(null);
let animationInstance: AnimationItem | null = null;
let observer: IntersectionObserver | null = null;

// Lottie 애니메이션 초기화
const initLottie = () => {
  if (!lottieContainer.value) return;

  animationInstance = lottie.loadAnimation({
    container: lottieContainer.value,
    renderer: "svg",
    loop: props.loop,
    autoplay: props.autoplay,
    animationData: props.animationData,
  });

  // 재생 속도 설정
  animationInstance.setSpeed(props.speed);

  // 이벤트 리스너
  animationInstance.addEventListener("complete", () => {
    emit("complete");
  });
};

// Intersection Observer 설정
const setupObserver = () => {
  if (!lottieContainer.value || props.autoplay) return;

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: props.threshold,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 화면에 보이면 재생
        if (animationInstance) {
          animationInstance.goToAndStop(0, true); // 처음으로 리셋
          animationInstance.play();
          emit("play");
        }
      } else {
        // 화면에서 벗어나면 정지
        if (animationInstance) {
          animationInstance.stop();
          emit("stop");
        }
      }
    });
  }, options);

  observer.observe(lottieContainer.value);
};

// 외부에서 컨트롤할 수 있도록 메서드 노출
const play = () => {
  animationInstance?.play();
};

const stop = () => {
  animationInstance?.stop();
};

const pause = () => {
  animationInstance?.pause();
};

const reset = () => {
  animationInstance?.goToAndStop(0, true);
};

defineExpose({
  play,
  stop,
  pause,
  reset,
});

onMounted(() => {
  initLottie();
  setupObserver();
});

onUnmounted(() => {
  if (animationInstance) {
    animationInstance.destroy();
  }
  if (observer) {
    observer.disconnect();
  }
});
</script>
