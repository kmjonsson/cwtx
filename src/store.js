import Vue from 'vue'
import Vuex from 'vuex'

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
    toggle_input_device(state) {
      if(state.input_device == 'paddle') {
        state.input_device = 'straight';
      } else {
        state.input_device = 'paddle';
      }
    }
  },
  actions: {

  }
})
