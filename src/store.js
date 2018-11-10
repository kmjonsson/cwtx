import Vue from 'vue'
import Vuex from 'vuex'

import JsCookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    input_device: 'paddleB',
    text: "CQ CQ CQ",
    call: "SK9HQ",
    wpm: 15,
    freq: 550,
    dah_button: 1,
    dit_button: 2,
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
    call(state,t) {
      state.call = t;
    },
    paddleA(state) {
      state.input_device = 'paddleA';
    },
    paddleB(state) {
      state.input_device = 'paddleB';
    },
    straight(state) {
      state.input_device = 'straight';
    },
    input_device(state,input_device) {
      state.input_device = input_device;
    },
    dah_button(state, button) {
      state.dah_button = button;
    },
    dit_button(state, button) {
      state.dit_button = button;
    }
  },
  actions: {
    init({ commit }) {
      let new_state = JsCookies.getJSON('state');
      if(new_state !== undefined) {
        commit('wpm',new_state.wpm);
        commit('text',new_state.text);
        commit('freq',new_state.freq);
        commit('input_device',new_state.input_device);
        commit('dit_button',new_state.dit_button);
        commit('dah_button',new_state.dah_button);
        commit('call',new_state.call);
      }
    },
    save({ state }) {
        JsCookies.set('state', {
          input_device: state.input_device,
          wpm: state.wpm,
          freq: state.freq,
          text: state.text,
          dit_button: state.dit_button,
          dah_button: state.dah_button,
          call: state.call,
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
    call({ commit, dispatch },t) {
      commit('call',t);
      dispatch('save');
    },
    paddleA({ commit, dispatch }) {
      commit('paddleA');
      dispatch('save');
    },
    paddleB({ commit, dispatch }) {
      commit('paddleB');
      dispatch('save');
    },
    straight({ commit, dispatch }) {
      commit('straight');
      dispatch('save');
    },    
    dah_button({ commit, dispatch }, button) {
      commit('dah_button', button);
      dispatch('save');
    },
    dit_button({ commit, dispatch }, button) {
      commit('dit_button', button);
      dispatch('save');
    },
  },
})
