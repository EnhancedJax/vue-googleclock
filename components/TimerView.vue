<template>
  <div
    :class="`w-full mb-2 rounded-[30px] ${
      isTimerTimeoutFinish ? 'bg-cblue-300' : 'bg-cblue-700'
    }`"
  >
    <div class="flex items-center justify-between p-4">
      <p
        :class="`text-2xl font-light ${
          isTimerTimeoutFinish ? 'text-ctext-600' : ''
        }`"
      >
        {{ formatTimeLong(timer.totalDurationSecs) }} Timer
      </p>
      <button
        class="p-1 rounded-full bg-cblue-100 text-ctext-100"
        @click="$emit('remove-timer')"
      >
        <svg-icon type="mdi" size="16" :path="mdiClose"></svg-icon>
      </button>
    </div>
    <div class="flex items-end m-4">
      <div class="relative w-48 h-48">
        <CircleProgress
          :percent="(remainingTime / timer.totalDurationSecs) * 100"
          :size="192"
          :border-bg-width="6"
          :border-width="6"
          fill-color="#7394D0"
          empty-color="#45454D"
        />
        <div
          :class="`absolute top-0 left-0 flex items-center justify-center w-48 h-48 text-4xl ${
            isTimerTimeoutFinish ? 'text-ctext-600' : ''
          }`"
        >
          <p>{{ formatTime(remainingTime) }}</p>
        </div>
        <div
          class="absolute flex justify-center w-full text-cblue-300 bottom-5"
          @click="resetTimer()"
          v-show="!timer.isIdle"
        >
          <svg-icon type="mdi" size="36" :path="mdiRotateLeft"></svg-icon>
        </div>
      </div>
      <div class="ml-8 grow">
        <button
          class="block w-full px-6 py-4 mb-2 text-xl rounded-full bg-cblue-100"
          @click="addMinute"
          v-show="timer.isRunning"
        >
          +1:00
        </button>
        <button
          class="flex items-center justify-center w-full px-6 py-4 rounded-full bg-cpurple-400 text-cpurple-700"
          @click="handleToggleButton"
        >
          <svg-icon
            type="mdi"
            :path="
              timer.isRunning
                ? mdiPause
                : isTimerTimeoutFinish
                ? mdiRotateLeft
                : mdiPlay
            "
          ></svg-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import CircleProgress from "vue3-circle-progress";
import { mdiClose, mdiPlay, mdiPause, mdiRotateLeft } from "@mdi/js";

export default {
  name: "TimerView",
  components: {
    SvgIcon,
    CircleProgress: CircleProgress,
  },
  props: {
    timer: Object,
  },
  data() {
    return {
      remainingTime: this.timer.durationRemainSecs,
      intervalId: null,
      isTimerTimeoutFinish: false,
      mdiClose: mdiClose,
      mdiPlay: mdiPlay,
      mdiPause: mdiPause,
      mdiRotateLeft: mdiRotateLeft,
    };
  },
  mounted() {
    if (this.timer.isRunning) {
      this.handleInterval();
      this.intervalId = setInterval(() => {
        this.handleInterval();
      }, 1000);
    }
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      let formattedTime = "";
      if (hours > 0) {
        formattedTime += `${hours}:`;
      }
      if (minutes > 0 || hours > 0) {
        if (hours > 0) {
          formattedTime += `${String(minutes).padStart(2, "0")}:`;
        } else {
          formattedTime += `${minutes}:`;
        }
      }
      if (remainingSeconds >= 0 || minutes > 0 || hours > 0) {
        if (minutes > 0 || hours > 0) {
          formattedTime += `${String(remainingSeconds).padStart(2, "0")}`;
        } else {
          formattedTime += `${remainingSeconds}`;
        }
      }

      return formattedTime;
    },
    formatTimeLong(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      let formattedTime = "";
      if (hours > 0) {
        formattedTime += `${hours}h `;
      }
      if (minutes > 0) {
        formattedTime += `${minutes}m `;
      }
      if (remainingSeconds > 0) {
        formattedTime += `${remainingSeconds}s`;
      }

      return formattedTime.trim();
    },
    addMinute() {
      this.remainingTime += 60;
      this.timer.durationRemainSecs += 60;
      this.timer.totalDurationSecs += 60;
    },
    handleInterval() {
      const elapsedSecs = Math.floor(
        (new Date().getTime() - this.timer.startTime) / 1000
      );
      this.remainingTime = this.timer.durationRemainSecs - elapsedSecs;
      if (this.remainingTime <= 0) {
        clearInterval(this.intervalId);
        this.timer.isRunning = false;
        this.remainingTime = 0;
        this.isTimerTimeoutFinish = true;
      }
    },
    handleToggleButton() {
      if (this.isTimerTimeoutFinish) {
        this.resetTimer();
      } else {
        if (this.timer.isIdle) {
          this.timer.isIdle = false;
          this.timer.isRunning = false;
        }
        if (this.timer.isRunning) {
          clearInterval(this.intervalId);
          this.timer.durationRemainSecs = this.remainingTime;
        } else {
          this.timer.startTime = new Date().getTime();
          this.intervalId = setInterval(() => {
            this.handleInterval();
          }, 1000);
        }
        this.timer.isRunning = !this.timer.isRunning;
      }
    },
    resetTimer() {
      clearInterval(this.intervalId);
      this.timer.isRunning = false;
      this.timer.isIdle = true;
      this.timer.durationRemainSecs = this.timer.totalDurationSecs;
      this.remainingTime = this.timer.totalDurationSecs;
      this.isTimerTimeoutFinish = false;
    },
  },
};
</script>
