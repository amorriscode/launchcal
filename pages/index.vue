<template>
  <div>
    <site-header></site-header>

    <div class="container">
      <div v-if="launches">
        <launch-card v-for="launch in launches.data" 
                    :launch-data="launch" 
                    :key="launch.id">
        </launch-card>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import SiteHeader from '../components/site-header.vue';
  import LaunchCard from '../components/launch-card.vue';

  export default {
    components: { SiteHeader, LaunchCard },
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
        // Get the ten launches closest to today
        const launches = await this.$axios.$get('/launches?$sort[isonet]=1');
        
        this.launches = launches;
      }
    }
  }
</script>
