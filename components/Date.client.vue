<template>
    <p class="text-lg font-light">{{ date }}</p>
</template>


<script>
export default {
  data() {
    return {
      date: null
    };
  },
  created() {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const date = new Date();
    this.date = date.toLocaleDateString('en-US', options);
  }
};
</script>