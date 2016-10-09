const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const pocketIcon = `<svg class="octicon octicon-watch" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path d="M6 8h2v1H5V5h1v3zm6 0c0 2.22-1.2 4.16-3 5.19V15c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1v-1.81C1.2 12.16 0 10.22 0 8s1.2-4.16 3-5.19V1c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v1.81c1.8 1.03 3 2.97 3 5.19zm-1 0c0-2.77-2.23-5-5-5S1 5.23 1 8s2.23 5 5 5 5-2.23 5-5z"></path></svg>`

const store = new Vue({
  data: {
    repos: JSON.parse(localStorage.getItem('pocket:repos') || '[]')
  }
})
store.$on('TOGGLE_REPO', repo => {
  if (store.repos.indexOf(repo) !== -1) {
    store.repos = store.repos.filter(slug => slug !== repo)
  } else {
    store.repos.unshift(repo)
  }
  localStorage.setItem('pocket:repos', JSON.stringify(store.repos))
})

// pocket list in home page
function addPocketList() {
  const sidebar = $('.dashboard-sidebar')
  if (sidebar) {
    const pocket = document.createElement('div')
    pocket.className = 'pocket'
    sidebar.insertBefore(pocket, sidebar.firstChild)
    const Pocket = {
      template: `<div class="pocket boxed-group flush">
        <h3>
          Pocket
          <span class="counter" v-if="repos.length > 5">{{repos.length}}</span>
        </h3>
        <div class="boxed-group-inner">
          <ul class="mini-repo-list js-repo-list" v-if="repos.length > 0">
            <li v-for="repo in repos">
              <a :href="'/' + repo.slug" class="mini-repo-list-item css-truncate">
                <svg aria-label="Repository" class="octicon octicon-repo repo-icon" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="12"><path d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>
                <span class="repo-and-owner css-truncate-target" style="max-width: 270px;">
                  <span class="owner css-truncate-target">{{repo.user}}</span>/<span class="repo">{{repo.project}}</span>
                </span>
              </a>
            </li>
          </ul>
          <div class="empty-pocket" style="padding: 10px;" v-else>
            <svg class="octicon octicon-smiley" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4.81 12.81a6.72 6.72 0 0 1-2.17 1.45c-.83.36-1.72.53-2.64.53-.92 0-1.81-.17-2.64-.53-.81-.34-1.55-.83-2.17-1.45a6.773 6.773 0 0 1-1.45-2.17A6.59 6.59 0 0 1 1.21 8c0-.92.17-1.81.53-2.64.34-.81.83-1.55 1.45-2.17.62-.62 1.36-1.11 2.17-1.45A6.59 6.59 0 0 1 8 1.21c.92 0 1.81.17 2.64.53.81.34 1.55.83 2.17 1.45.62.62 1.11 1.36 1.45 2.17.36.83.53 1.72.53 2.64 0 .92-.17 1.81-.53 2.64-.34.81-.83 1.55-1.45 2.17zM4 6.8v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2H5.2C4.53 8 4 7.47 4 6.8zm5 0v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2h-.59C9.53 8 9 7.47 9 6.8zm4 3.2c-.72 1.88-2.91 3-5 3s-4.28-1.13-5-3c-.14-.39.23-1 .66-1h8.59c.41 0 .89.61.75 1z"></path></svg>
            Woot! Such an empty pocket.
          </div>
        </div>
      </div>`,
      computed: {
        repos() {
          return store.repos.map(repo => {
            const sep = repo.indexOf('/')
            return {
              user: repo.substr(0, sep),
              project: repo.substr(sep + 1),
              slug: repo
            }
          })
        }
      }
    }
    new Vue({
      el: '.pocket',
      render: h => h(Pocket)
    })
  }
}

// add-to-pocket button in repo page
function addPocketButton() {
  const actions = $('.pagehead-actions')
  if (actions) {
    const addToPocket = document.createElement('li')
    addToPocket.className = 'add-to-pocket'
    actions.appendChild(addToPocket)
    new Vue({
      el: '.add-to-pocket',
      template: `<li>
        <a @click="toggleRepo" class="btn btn-sm" title="Read this repo later" aria-label="Read this repo later">
          ${pocketIcon}
          {{ added ? 'Unpocket' : 'Pocket' }}
        </a>
        
      </li>`,
      data: {
        repo: location.pathname.substr(1)
      },
      computed: {
        added() {
          return store.repos.indexOf(this.repo) !== -1
        }
      },
      methods: {
        toggleRepo() {
          if (this.added) {
            store.repos = store.repos.filter(repo => repo !== this.repo)
          } else {
            store.repos.unshift(this.repo)
          }
          localStorage.setItem('pocket:repos', JSON.stringify(store.repos))
        }
      }
    })
  }
}

// add-to-pocket button in trending page
function addPocketTrending() {
  if (!/\/trending(\/\w+)?/.test(location.pathname)) return

  $$('.repo-list-stats').forEach(repoStats => {
    const pocketButton = document.createElement('button')
    repoStats.appendChild(pocketButton)

    const slug = repoStats.parentNode.querySelector('.repo-list-name a').getAttribute('href').substr(1)

    new Vue({
      el: pocketButton,
      data: {
        repo: slug
      },
      template: `<button @click="toggleRepo" class="btn btn-sm" style="margin-left: 5px;">
        ${pocketIcon}
        {{ added ? 'Unpocket' : 'Pocket' }}
      </button>`,
      computed: {
        added() {
          return store.repos.indexOf(this.repo) !== -1
        }
      },
      methods: {
        toggleRepo() {
          store.$emit('TOGGLE_REPO', this.repo)
        }
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  addPocketButton()
  addPocketList()
  addPocketTrending()

  const container = $('#js-repo-pjax-container')

  if (!container) return

  new MutationObserver(addPocketButton).observe(container, {childList: true})
})