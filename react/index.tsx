import gaScript from './scripts/ga'

const gaId = window.__SETTINGS__.gaId

// if (!gaId) {
//   throw new Error('Warning: No Google Analytics ID is defined. To setup the app, go to your admin.')
// }

// tslint:disable-next-line no-eval
eval(gaScript(gaId))

ga('create', 'UA-76348050-1', 'auto');
console.log('BBBBBB', ga)
ga('set', 'page', '/home2');
ga('send', 'pageview');

window.addEventListener('message', e => {

  console.log('EVENTO', e.data.eventName)
  ga('set', 'page', `/${e.data.eventName}`);
  ga('send', 'pageview');

  switch (e.data.eventName) {
    case 'vtex:productView': {
      const { product } = e.data
      return
    }
    default: {
      return
    }
  }
})
