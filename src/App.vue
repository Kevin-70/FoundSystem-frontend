<script setup>
import Homepage from './pages/homepage.vue'
import login from './pages/login.vue'
</script>

<template>
  <div id="home">
    <!-- <login /> -->
    <Homepage />
  </div>
</template>

<style scoped>
#all {
  width: 100%;
  height: 100%;
}

/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
