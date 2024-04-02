<template>
  <div class="w-full px-4">
    <div
      :class="`my-12 text-center text-6xl ${
        duration.length !== 0 ? 'text-cblue-400' : 'text-ctext-400'
      }`"
    >
      {{ duration.padStart(6, "0").slice(0, 2)
      }}<span class="text-3xl font-light">h</span>
      {{ duration.padStart(6, "0").slice(2, 4)
      }}<span class="text-3xl font-light">m</span>
      {{ duration.padStart(6, "0").slice(4, 6)
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
  <div class="absolute left-0 flex justify-center w-full pb-4 bottom-20" v-show="duration.length > 0">
    <div
      class="flex items-center justify-center w-24 h-24 rounded-full cursor-pointer bg-cblue-400 text-cblue-800"
    >
    <svg-icon type="mdi" :path="mdiPlay"></svg-icon>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiPlay } from "@mdi/js";

export default {
  name: "Timer",
  data() {
    return {
      duration: "",
      mdiPlay: mdiPlay,
    };
  },
  components: {
    SvgIcon,
  },
  methods: {
    addTime(value) {
      if (value != "del") {
        if (value == "00") {
          if (this.duration.length > 0) {
            if (this.duration.length <= 4) {
              this.duration += "00";
            } else if (this.duration.length < 6) {
              this.duration += "0";
            }
          }
        } else if (value == "0") {
          if (this.duration.length > 0) {
            this.duration += "0";
          }
        } else {
          if (this.duration.length < 6) {
            this.duration += value;
          }
        }
      } else {
        this.duration = this.duration.slice(0, -1);
      }
    },
  },
};
</script>
