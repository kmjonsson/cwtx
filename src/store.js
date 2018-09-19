import Vue from 'vue'
import Vuex from 'vuex'

import JsCookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    input_device: 'paddle',
    text: "CQ CQ CQ",
    wpm: 15,
    freq: 550,
  },
  mutations: {
    wpm(state,w) {
      state.wpm = w;
    },
    freq(state,f) {
      state.freq = f;
    },
    text(state,t) {
      state.text = t;
    },
    paddle(state) {
      state.input_device = 'paddle';
    },
    straight(state) {
      state.input_device = 'straight';
    },
    input_device(state,input_device) {
      state.input_device = input_device;
    }
  },
  actions: {
    init({ commit }) {
      let new_state = JsCookies.getJSON('state');
      if(new_state !== undefined) {
        console.log(new_state);
        commit('wpm',new_state.wpm);
        commit('text',new_state.text);
        commit('freq',new_state.freq);
        commit('input_device',new_state.input_device);        
      }
    },
    save({ state }) {
        JsCookies.set('state', {
          input_device: state.input_device,
          wpm: state.wpm,
          freq: state.freq,
          text: state.text,
        },{ expires: 7 })
    },
    wpm({ commit, dispatch },w) {
      commit('wpm',w);
      dispatch('save');
    },
    freq({ commit, dispatch },f) {
      commit('freq',f);
      dispatch('save');
    },
    text({ commit, dispatch },t) {
      commit('text',t);
      dispatch('save');
    },
    paddle({ commit, dispatch }) {
      commit('paddle');
      dispatch('save');
    },
    straight({ commit, dispatch }) {
      commit('straight');
      dispatch('save');
    },    
  },
})
