<template>
  <v-container>
    <v-layout row  wrap>
      <v-flex xs10 pt-4>
        <v-slider
            v-model="score"
            :max="30"
            :min="0"
            label="Score?"
            step="1"
            thumb-label="always"
            :color="color"
         ></v-slider>
      <v-btn 
          @click="update" >
          Sync
        </v-btn>
      </v-flex>
      <v-flex xs12 md12 text-xs-center>
        <v-btn  
          :flat="!double1"
          outline
          color="green"
          @click="activeDouble1">
          X2
        </v-btn>
        <v-btn  
          :flat="!double2"
          outline
          color="red"
          @click="activeDouble2" >
          X2
        </v-btn>
      </v-flex>
      <v-flex sm6 md4 offset-md1
          v-for="item in players" 
          :key="item.id"
          >
        <v-card
              >
            <v-img
              :src="item.avatar"
              aspect-ratio="2"
              @click="addScore(item)"
              style='cursor:pointer'
            ></v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{item.name}}</h3>
              <h3>{{item.score}}</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout> 
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
  export default {
    computed:{
      ...mapGetters([
        'players',
      ]),
    },
    data () {
      return {
        score:0,
        color: 'blue',
        double1:false,
        double2:false,
      }
    }, 
    methods:{
      ...mapActions([
        'addScore',
        'downloadScores',
        'update'
      ]),
      activeDouble1:function(){
        this.double1 = !this.double1;
      },
      activeDouble2:function(){
        this.double2 = !this.double2;
      },
      addScore: function(player){
        if(this.score===0 && !isNaN(parseFloat(this.score)) && isFinite(this.score))
          return;    

        var dataPoint={
          avatar: player.avatar,
          name: player.name,
          score:this.score,
          location:'..tobeimplemented...',
          longt:0,
          lati:0,
          timestamp:new Date().toLocaleTimeString(),
          id:this.$store.state.scoreList.length+1
        }      
        
        navigator.geolocation.getCurrentPosition(function(location) {
          dataPoint.longt = location.coords.longitude;
          dataPoint.lati = location.coords.latitude;
        });
        
        this.$store.dispatch('addScore',{dp:dataPoint, d1:this.double1, d2:this.double2});
        // this.addScore({dp:dataPoint, d1:this.double1, d2:this.double2});
        this.score = 0;
        this.double1 = false;
        this.double2 = false;
      },
      getComplete: function(){
        if(this.value>15)
          this.color='green'
        else
          this.color='blue'
        return this.value * 2
      }
    },
    created(){    
        this.downloadScores();
    }, 
  }
</script>

<style>

</style>
