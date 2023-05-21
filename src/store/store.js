import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      isDark: false,
    }
  },
  mutations: {
    setIsDark (state, value) {
      state.isDark = value
    },
  },
})

export default store
