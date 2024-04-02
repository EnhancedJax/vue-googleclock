<template>
    <div class="text-7xl text-ctext-200">{{ time }}<span class="ml-2 text-2xl">{{ ampm }}</span></div>
</template>


<script>
export default {
  data() {
    return {
      interval: null,
      time: null,
      ampm: null
    }
  },
  mounted() {
    this.updateTime();
    this.interval = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    updateTime() {
      const date = new Date();
      const options = { hour: 'numeric', minute: '2-digit', hour12: true };
      const timeString = date.toLocaleTimeString('en-US', options).split(' ');

      this.time = timeString[0];
      this.ampm = timeString[1];
    }
  }
}
</script>