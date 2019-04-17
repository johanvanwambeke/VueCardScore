<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Cardscore</span>
        <span class="font-weight-light">counter</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <Scoreboard/>
      <PointRegistration ></PointRegistration>
    </v-content>
  </v-app>
</template>

<script>
import Scoreboard from './components/Scoreboard'

import PointRegistration from './components/PointRegistration'



export default {
  name: 'App',
  components: {
    Scoreboard,
    PointRegistration
  },
  data () {
    return {
      //
    }
  }
}
</script>
