import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
      scoreList: [
        ],
      players:[{
        playerId:1,
        name:'Johan',
        score:0,
        avatar: 'https://www.facebook.com/search/async/profile_picture/?fbid=1074552208&width=150&height=150',
      },{
        playerId:2,
        name:'Cynthia',
        score:0,
        avatar: 'https://www.facebook.com/search/async/profile_picture/?fbid=100001810601465&width=150&height=150'
      }]
    },
    modules:{
      scoreboard:{
        namespaced:true
      }
    },
    getters:{
      players: state =>{        
        _.forEach(state.players,function(player){
          player.score=0;
        });
        
        _.forEach(state.players,function(p){
          p.score=0;
          _.forEach(state.scoreList,function(score){
            if(score.name == p.name){
              p.score =  p.score + score.score;
            }
          })
        });
        return state.players;
      }
    },
    mutations:{
      addScore: (state,payload) =>{
        // console.log(payload);
        if(payload.d1)
        payload.dp.score  = payload.dp.score *2;
        if(payload.d2)
        payload.dp.score  = payload.dp.score *2;
        state.scoreList.unshift(payload.dp);
      },
      downloadScores:(state, payload)=>{
        state.scoreList = payload;
      }
    },
    actions:{
      addScore:(context,payload)=>{
        context.commit('addScore',payload);
      },
      downloadScores:(context)=>{
        Vue.http.get('https://cardscoreapi.azurewebsites.net/api/score/getscores', {}, {
        }).then(response => {
          console.log(response.body);
          context.commit('downloadScores',response.body);
        });
      },
      update:({context,state})=>{
        console.log(state.scoreList);
        // Vue.http.post('http://cardscoreapi.azurewebsites.net/api/score/SetScores',state.scoreList() , {});
        Vue.http.post('https://cardscoreapi.azurewebsites.net/api/score/SetScores',state.scoreList , {});
        // Vue.http.post('http://localhost:14361/SetScores', state.scoreList, {});
      },
      remove:({context, state},payload)=>{
        const index = state.scoreList.indexOf(payload);
        state.scoreList.splice(index, 1);
      }
    }
});