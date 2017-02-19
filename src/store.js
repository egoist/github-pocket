import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const pocket = {
  state: {
    repos: JSON.parse(localStorage.getItem('pocket:repos') || '[]')
  },
  mutations: {
    TOGGLE_REPO(state, repo) {
      if (state.repos.indexOf(repo) !== -1) {
        state.repos = state.repos.filter(slug => slug !== repo)
      } else {
        state.repos.unshift(repo)
      }
      localStorage.setItem('pocket:repos', JSON.stringify(state.repos))
    },

    REMOVE_ALL_REPOS(state) {
      state.repos = []
      localStorage.setItem('pocket:repos', JSON.stringify(state.repos))
    }
  }
}

const store = new Vuex.Store({
  modules: {
    pocket
  }
})

export default store
