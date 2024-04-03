<template>
  <div class="w-full px-4" v-show="timers.length == 0 || inputstatus">
    <div
      :class="`my-12 text-center text-6xl ${
        inputduration.length !== 0 ? 'text-cblue-400' : 'text-ctext-400'
      }`"
    >
      {{ inputduration.padStart(6, "0").slice(0, 2)
      }}<span class="text-3xl font-light">h</span>
      {{ inputduration.padStart(6, "0").slice(2, 4)
      }}<span class="text-3xl font-light">m</span>
      {{ inputduration.padStart(6, "0").slice(4, 6)
      }}<span class="text-3xl font-light">s</span>
    </div>
    <div class="grid grid-cols-3 gap-2 max-w-[500px] mx-auto">
      <NumpadButton label="1" class="aspect-square" @click="addTime('1')" />
      <NumpadButton label="2" class="aspect-square" @click="addTime('2')" />
      <NumpadButton label="3" class="aspect-square" @click="addTime('3')" />
      <NumpadButton label="4" class="aspect-square" @click="addTime('4')" />
      <NumpadButton label="5" class="aspect-square" @click="addTime('5')" />
      <NumpadButton label="6" class="aspect-square" @click="addTime('6')" />
      <NumpadButton label="7" class="aspect-square" @click="addTime('7')" />
      <NumpadButton label="8" class="aspect-square" @click="addTime('8')" />
      <NumpadButton label="9" class="aspect-square" @click="addTime('9')" />
      <NumpadButton label="00" class="aspect-square" @click="addTime('00')" />
      <NumpadButton label="0" class="aspect-square" @click="addTime('0')" />
      <NumpadButton
        label="⌫"
        class="aspect-square"
        :special="true"
        @click="addTime('del')"
      />
    </div>
  </div>
  <div
    class="absolute left-0 flex justify-center w-full pb-4 bottom-20"
    v-show="inputduration.length > 0"
  >
    <div
      class="flex items-center justify-center w-24 h-24 rounded-full cursor-pointer bg-cblue-400 text-cblue-800"
      @click="pushTimer()"
    >
      <svg-icon type="mdi" :path="mdiPlay"></svg-icon>
    </div>
  </div>
  <div
    class="absolute left-0 flex items-center w-full h-24 px-12 mb-4 bottom-20"
    v-show="timers.length > 0 && inputstatus"
  >
    <div
      class="flex items-center justify-center rounded-full cursor-pointer w-14 h-14 bg-cpurple-700 text-cpurple-400"
      @click="
        inputstatus = !inputstatus;
        inputduration = '';
      "
    >
      <svg-icon type="mdi" :path="mdiTrashCanOutline"></svg-icon>
    </div>
  </div>
  <!-- ------------- Timers -------------  -->

  <div class="w-full" v-show="timers.length > 0 && !inputstatus">
    <div class="absolute left-0 z-20 flex justify-center w-full pb-4 bottom-20">
      <div
        class="flex items-center justify-center w-24 h-24 rounded-full cursor-pointer bg-cblue-400 text-cblue-800"
        @click="newTimer()"
      >
        <svg-icon type="mdi" :path="mdiPlus"></svg-icon>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4">
      <TimerView
        v-for="(timer, index) in timers"
        :key="index"
        :timer="timer"
        @remove-timer="removeTimer(timer)"
      />
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlay, mdiPlus, mdiTrashCanOutline } from "@mdi/js";

export default {
  name: "Timer",
  data() {
    return {
      inputduration: "",
      mdiPlay: mdiPlay,
      mdiPlus: mdiPlus,
      mdiTrashCanOutline: mdiTrashCanOutline,
      timers: [],
      inputstatus: false,
    };
  },
  components: {
    SvgIcon,
  },
  mounted() {
    const savedTimers = localStorage.getItem("timers");
    if (savedTimers) {
      this.timers = JSON.parse(savedTimers);
    } else {
      localStorage.setItem("timers", JSON.stringify(this.timers));
    }
  },
  unmounted() {
    localStorage.setItem("timers", JSON.stringify(this.timers));
  },
  methods: {
    addTime(value) {
      if (value != "del") {
        if (value == "00") {
          if (this.inputduration.length > 0) {
            if (this.inputduration.length <= 4) {
              this.inputduration += "00";
            } else if (this.inputduration.length < 6) {
              this.inputduration += "0";
            }
          }
        } else if (value == "0") {
          if (this.inputduration.length > 0) {
            this.inputduration += "0";
          }
        } else {
          if (this.inputduration.length < 6) {
            this.inputduration += value;
          }
        }
      } else {
        this.inputduration = this.inputduration.slice(0, -1);
      }
    },
    pushTimer() {
      const durationSecs =
        parseInt(this.inputduration.padStart(6, "0").slice(0, 2)) * 3600 +
        parseInt(this.inputduration.padStart(6, "0").slice(2, 4)) * 60 +
        parseInt(this.inputduration.padStart(6, "0").slice(4, 6));
      this.timers.push({
        durationRemainSecs: durationSecs,
        isRunning: true,
        isIdle: false,
        totalDurationSecs: durationSecs,
        startTime: new Date().getTime(),
      });
      this.inputduration = "";
      this.inputstatus = false;
    },
    newTimer() {
      this.inputstatus = true;
    },
    removeTimer(timer) {
      this.timers = this.timers.filter((t) => t !== timer);
    },
  },
};
</script>
