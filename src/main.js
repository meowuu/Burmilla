// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AV from 'leancloud-storage'
import VueLazyload from 'vue-lazyload'

import leancloudConfig from '@/assets/leancloud.json'

import 'normalize.css'
import '@/assets/styles/app.scss'
import '@/assets/styles/animation.scss'

const appId = leancloudConfig.id
const appKey = leancloudConfig.key

AV.init({ appId, appKey })

window.AV = AV

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.9,
  loading: 'static/tail-spin.svg',
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
