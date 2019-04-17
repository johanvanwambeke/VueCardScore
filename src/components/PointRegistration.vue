<template>
 <v-layout>
    <v-flex xs12 md10 offset-md1>
        <v-list three-line>
          <template v-for="(item) in scoreList">
            <v-list-tile
              :key="item.id"
              avatar
              ripple
            >
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                  <v-list-tile-title v-html="item.score"></v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">{{ item.location }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{ item.timestamp }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-btn @click="remove(item)">delete</v-btn>
            </v-list-tile>
          </template>
        </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';
  export default {
    data () {
      return {
      }
    },
    computed:{
      scoreList(){
        return this.$store.state.scoreList;
      }
    },
    methods:{      
      ...mapActions([
        'remove',
      ]),
      Sync:function(){
        return 1;
      }
    }
  }
</script>