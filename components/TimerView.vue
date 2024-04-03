<template>
  <div class="w-full mb-2 bg-cblue-700 rounded-[30px]">
    <div class="flex items-center justify-between p-4">
      <p class="text-2xl font-light">
        {{ formatTimeLong(timer.originalDuration + timer.addedSecs) }} Timer
      </p>
      <button
        class="p-1 rounded-full bg-cblue-100 text-ctext-100"
        @click="$emit('remove-timer')"
      >
        <svg-icon type="mdi" size="16" :path="mdiClose"></svg-icon>
      </button>
    </div>
    <div class="flex items-end justify-between p-4">
      <div
        class="flex items-center justify-center w-48 h-48 rounded-full bg-red-50"
      >
        {{ formatTime(remainingTime) }}
      </div>
      <div>
        <button
          class="block px-6 py-4 mb-2 text-xl rounded-full bg-cblue-100"
          @click="addMinute"
        >
          +1:00
        </button>
        <button
          class="flex items-center justify-center w-full px-6 py-4 rounded-full bg-cpurple-400 text-cpurple-700"
          @click="togglePause"
        >
          <svg-icon
            type="mdi"
            :path="timer.running ? mdiPause : mdiPlay"
          ></svg-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiClose, mdiPlay, mdiPause } from "@mdi/js";

export default {
  name: "TimerView",
  components: {
    SvgIcon,
  },
  props: {
    timer: Object,
  },
  data() {
    return {
      remainingTime: this.timer.durationSecs,
      intervalId: null,
      mdiClose: mdiClose,
      mdiPlay: mdiPlay,
      mdiPause: mdiPause,
    };
  },
  mounted() {
    this.intervalId = setInterval(() => {
      this.handleInterval();
    }, 1000);
  },
  beforeDestroy() {
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
      this.timer.durationSecs += 60;
      this.timer.addedSecs += 60;
    },
    handleInterval() {
      const elapsedSecs = Math.floor(
        (new Date().getTime() - this.timer.startTime) / 1000
      );
      this.remainingTime = this.timer.durationSecs - elapsedSecs;
      if (this.remainingTime <= 0) {
        clearInterval(this.intervalId);
        this.remainingTime = 0;
      }
    },
    togglePause() {
      if (this.timer.running) {
        clearInterval(this.intervalId);
        this.timer.durationSecs = this.remainingTime;
      } else {
        this.timer.startTime = new Date().getTime();
        this.intervalId = setInterval(() => {
          this.handleInterval();
        }, 1000);
      }
      this.timer.running = !this.timer.running;
      console.log(this.timer);
    },
  },
};
</script>
