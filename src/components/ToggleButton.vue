<template>
  <div class="toggle-button" 
    :class="{ 'active': theme === 'dark' }" 
    @click="toggleTheme">
  </div>
</template>

<script>
export default {
  name: 'ToggleButton'
}
</script>

<style lang="scss" scoped>

</style>