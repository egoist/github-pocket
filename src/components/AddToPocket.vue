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
  import {$} from 'dom'

  export default {
    data() {
      return {
        repo: $('meta[name="octolytics-dimension-repository_nwo"]').getAttribute('content'),
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
