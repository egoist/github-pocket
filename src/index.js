import Vue from 'vue'
import store from 'store'
import Pocket from 'components/Pocket'
import AddToPocket from 'components/AddToPocket'
import PocketTrending from 'components/PocketTrending'
import{$, $$} from 'dom'

console.info('Hello GitHub Improved!')


const createInstance = (vm, props) => new Vue({
  store,
  render: h => h(vm, {props})
})

const watchDom = (dom, fn) => {
  dom = $(dom)
  if (!dom) {
    return
  }
  return new MutationObserver(fn).observe(dom, {childList: true})
}

// pocket list in home page
function addPocketList() {
  const sidebar = $('.dashboard-sidebar')
  if (sidebar && !$('.pocket')) {
    const pocket = document.createElement('div')
    sidebar.insertBefore(pocket, sidebar.firstChild)
    createInstance(Pocket).$mount(pocket)
  }
}

// add-to-pocket button in repo page
function addPocketButton() {
  const actions = $('.pagehead-actions')
  if (actions && ! $('.add-to-pocket')) {
    const addToPocket = document.createElement('li')
    actions.appendChild(addToPocket)
    createInstance(AddToPocket).$mount(addToPocket)
  }
}

// add-to-pocket button in trending page
function addPocketTrending() {
  if (!/\/trending(\/\w+)?/.test(location.pathname)) return

  $$('.repo-list li .starring-container').forEach(el => {
    const slug = el.parentNode.parentNode.querySelector('h3 a').getAttribute('href').substr(1)

    el.querySelectorAll('form').forEach(form => {
      const button = document.createElement('button')
      form.appendChild(button)
      createInstance(PocketTrending, {slug}).$mount(button)
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  addPocketButton()
  addPocketList()
  addPocketTrending()

  watchDom('[data-pjax-container]', () => {
    addPocketButton()
    addPocketTrending()
  })
})
