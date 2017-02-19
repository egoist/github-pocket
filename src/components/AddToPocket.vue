<template>
  <li class="add-to-pocket">
    <a @click="toggleRepo" class="btn btn-sm" title="Read this repo later" aria-label="Read this repo later">
      <span v-html="pocketIcon"></span>
      {{ added ? 'Unpocket' : 'Pocket' }}
    </a>
  </li>
</template>

<script>
  import pocketIcon from '!raw-loader!svg/pocket.svg'

  export default {
    data() {
      return {
        repo: location.pathname.substr(1),
        pocketIcon
      }
    },
    computed: {
      added() {
        return this.$store.state.pocket.repos.indexOf(this.repo) !== -1
      }
    },
    methods: {
      toggleRepo() {
        this.$store.commit('TOGGLE_REPO', this.repo)
      }
    }
  }
</script>
