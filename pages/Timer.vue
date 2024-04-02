
<template>
  <h1>Timer</h1>
  <draggable v-model="meals" tag="ul">
    <template #item="{ element: meal }">
      <li>{{ meal.name }}</li>
    </template>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  data() {
    return {
      meals: [
        { name: 'Breakfast' },
        { name: 'Lunch' },
        { name: 'Dinner' },
      ]
    }
  },
  components: {
    draggable
  }
}
</script>