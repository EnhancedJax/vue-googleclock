<template>
  <nav
    class="absolute bottom-0 left-0 flex items-center justify-between w-full h-20 px-2 bg-cblue-500"
  >
    <NavbarButton iconName="Alarm" :isActive="currentPage === 'Alarm'" />
    <NavbarButton iconName="Clock" :isActive="currentPage === 'index'" />
    <NavbarButton iconName="Timer" :isActive="currentPage === 'Timer'" />
    <NavbarButton
      iconName="Stopwatch"
      :isActive="currentPage === 'Stopwatch'"
    />
    <NavbarButton iconName="Bedtime" :isActive="currentPage === 'Bedtime'" />
  </nav>
  <div class="h-full px-6 pt-12 pb-24 overflow-scroll">
    <h1 class="mb-6 text-2xl font-light text-ctext-200">
      {{ currentPage == "index" ? "Clock" : currentPage }}
    </h1>
    <slot />
  </div>
</template>

<script setup lang="js">
const route = useRoute()
var currentPage = ref(route.name)

watchEffect(() => {
  currentPage.value = route.name
})
</script>
