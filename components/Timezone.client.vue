<template>
    <div class="flex justify-between items-center w-full p-8 rounded-[32px] bg-cblue-700 mb-2">
        <div>
            <p class="mb-1 text-xl font-light text-ctext-200">{{location}}</p>
            <p class="text-sm font-light text-ctext-300">{{offset < 0 ? offset : `+${offset}`}}h</p>
        </div>
        <div class="text-4xl text-ctext-200">{{ time }}<span class="ml-2 text-lg font-light">{{ ampm }}</span></div>
    </div>
</template>

<script>
function getTimeZoneOffset(date, timeZone) {

// Abuse the Intl API to get a local ISO 8601 string for a given time zone.
let iso = date.toLocaleString('en-CA', { timeZone, hour12: false }).replace(', ', 'T');

// Include the milliseconds from the original timestamp
iso += '.' + date.getMilliseconds().toString().padStart(3, '0');

// Lie to the Date object constructor that it's a UTC time.
const lie = new Date(iso + 'Z');

// Return the difference in timestamps, as minutes
// Positive values are West of GMT, opposite of ISO 8601
// this matches the output of `Date.getTimeZoneOffset`
return -(lie - date) / 60 / 1000;
}

export default {
  data() {
    return {
      interval: null,
      time: null,
      ampm: null,
      offset: null
    }
  },
  props: {
    location: {
      type: String,
      required: true
    },
    timezone: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.updateTime();
    this.interval = setInterval(this.updateTime, 1000);
    this.offset = (getTimeZoneOffset(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone) - getTimeZoneOffset(new Date(), this.timezone))/60;
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    updateTime() {
      const date = new Date();
    const options = { timeZone: this.timezone, hour: 'numeric', minute: '2-digit', hour12: true };
      const timeString = date.toLocaleTimeString('en-US', options).split(' ');

      this.time = timeString[0];
      this.ampm = timeString[1];
    }
  }
}
</script>