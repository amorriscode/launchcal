<template>
  <div class="launch-card">
    <h3 class="title is-3">{{ launchDate }}</h3>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">{{ launchData.name }}</p>
      </header>

      <div class="card-content">
        <div class="content">
          <div class="columns">
            <div class="column">
              <p v-if="launchData.location.pads[0]">
                <strong>Launching from:</strong> 
                {{ launchData.location.pads[0].name }}
              </p>

              <p>
                <strong>Primary Mission:</strong> 
                <span v-if="launchData.missions[0]">{{ launchData.missions[0].name }}</span>
                <span v-else>Unknown</span>
              </p>
              <p v-if="launchData.missions[0]"><small>{{ launchData.missions[0].description}}</small></p>

              <p v-if="launchData.rocket">
                <strong>Rocket:</strong> 
                {{ launchData.rocket.name }}
                <a class="has-text-info" target="_blank" v-if="launchData.rocket.wikiURL" :href="launchData.rocket.wikiURL">
                  <i class="fa fa-rocket"></i>
                </a>
              </p>

              <a class="button is-info" v-if="launchData.vidURLs.length" :href="launchData.vidURLs[0]">Watch Live!</a>
            </div>

            <div class="column is-one-third is-hidden-mobile" v-if="launchPadCoords">
              <iframe
                class="is-pulled-right"
                width="250"
                height="250"
                frameborder="0" style="border:0"
                :src="launchPadCoords" allowfullscreen>
              </iframe>
            </div>
          </div>
        </div>
      </div>

      <footer class="card-footer">
        <small class="card-footer-item"><strong>Launch window:</strong>&nbsp; {{ launchData.windowstart }} - {{ launchData.windowend }}</small>
      </footer>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    props: ['launchData'],
    computed: {
      launchDate() {
        return moment(this.launchData.net, 'MMMMDDY').format('MMMM DD, Y');
      },
      launchPadCoords() {
        const queryParam = this.launchData.location.pads[0].mapURL.match(/q=(.*)/);
        const rawCoords = `${this.launchData.location.pads[0].latitude},${this.launchData.location.pads[0].longitude}`;

        // Ignore the map if mapURL can't be deconstructed
        if (!queryParam) {
          return null;
        }

        return `https://www.google.com/maps/embed/v1/place?key=AIzaSyCmu5ZCmUYvGyPSNsKCaabgxpCfGYxCyHI&center=${rawCoords}&${queryParam[0]}&zoom=14&maptype=satellite`;
      },
    },
  }
</script>

<style scoped>
  .launch-card {
    margin: 2.5rem;
  }
</style>