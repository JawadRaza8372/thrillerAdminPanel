/* eslint-disable no-//console.log */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      //console.log.log('Service worker has been registered.')
    },
    cached () {
      //console.log.log('Content has been cached for offline use.')
    },
    updatefound () {
      //console.log.log('New content is downloading.')
    },
    updated () {
      //console.log.log('New content is available; please refresh.')
    },
    offline () {
      //console.log.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      //console.log.error('Error during service worker registration:', error)
    }
  })
}
