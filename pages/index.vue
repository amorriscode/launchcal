<template>
  <div class="container">
    <h1 class="title is-1">LaunchCal</h1>

    <div v-if="launches">FUCKING LAUNCHES</div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        launches: null,
      }
    },
    mounted() {
      this.getLaunches();
    },
    methods: {
      async getLaunches() {
        const launches = await this.$axios.$get('/launches');
        
        this.launches = launches;
      }
    }
  }
</script>
