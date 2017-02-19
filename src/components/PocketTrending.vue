<template>
  <button type="button" @click="toggleRepo" class="btn btn-sm" style="margin-left: 5px;">
    <span v-html="pocketIcon"></span>
    {{ added ? 'Unpocket' : 'Pocket' }}
  </button>
</template>
<script>
  import pocketIcon from '!raw-loader!svg/pocket.svg'

  export default {
    props: ['slug'],
    data() {
      return {
        repo: this.slug,
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
