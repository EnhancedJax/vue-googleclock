<template>
  <NuxtLink :to="`/${iconName == 'Clock' ? '' : iconName}`">
    <div class="flex flex-col items-center gap-2 text-ctext-100" @click="goToRoot">
      <div :class="['px-5 py-1 rounded-full', {'bg-cblue-100': isActive}]">
        <svg-icon type="mdi" size="24" :path="icon"></svg-icon>
      </div>
      <p :class="['text-xs font-medium text-ctext-300', {'text-white': isActive}]"">{{iconName}}</p>
    </div>
    </NuxtLink>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAlarm, mdiClockOutline, mdiTimerOutline, mdiTimerSand, mdiBed } from '@mdi/js';

export default {
  name: "navbar-button",

  components: {
    SvgIcon,
  },

  props: {
    iconName: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    icon() {
      switch (this.iconName) {
        case 'Alarm':
          return mdiAlarm;
        case 'Clock':
            return mdiClockOutline;
        case 'Stopwatch':
            return mdiTimerOutline;
        case 'Timer':
            return mdiTimerSand;
        case 'Bedtime':
            return mdiBed;
        default:
          return mdiAlarm; // Default icon
      }
    }
  }
}
</script>