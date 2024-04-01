<template>
  <nav
    class="fixed bottom-0 left-0 flex items-center justify-between w-screen h-20 px-2 bg-cblue-500"
  >
    <NavbarButton iconName="Alarm" :isActive="currentPage === 'Alarm'"/>
    <NavbarButton iconName="Clock" :isActive="currentPage === 'index'"/>
    <NavbarButton iconName="Timer" :isActive="currentPage === 'Timer'"/>
    <NavbarButton iconName="Stopwatch" :isActive="currentPage === 'Stopwatch'"/>
    <NavbarButton iconName="Bedtime" :isActive="currentPage === 'Bedtime'"/>
  </nav>
  <slot />
</template>

<script setup lang="js">
const route = useRoute()
var currentPage = ref(route.name)

watch(() => {
  currentPage.value = route.name
})
</script>
