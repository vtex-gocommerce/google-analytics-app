const gaId = window.__SETTINGS__.gaId

// if (!gaId) {
//   throw new Error('Warning: No Google Analytics ID is defined. To setup the app, go to your admin.')
// }

// Initialize async analytics
window.ga = window.ga || function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', `${gaId ? gaId : 'UA-76348050-1'}`, 'auto')

// Load analytics script
const script = document.createElement('script')
script.src = `https://www.google-analytics.com/analytics.js`
script.async = true
document.head!.prepend(script)
console.log('AAA')

let currentUrl = ''

// Common pageview function
const pageView = (data:any) => {
  currentUrl = data.pageUrl
  ga('set', {
    page: currentUrl.replace(location.origin, ''),
    ...((data.pageTitle) && {
      title: data.pageTitle
    })
  })
  ga('send', 'pageview')
  console.log('EVENTO', data.event, data.pageUrl)
}

// Event listener for pageview
window.addEventListener('message', e => {
  console.log('BBB', e.data.pageUrl, currentUrl)
  if(!e.data.pageUrl || e.data.pageUrl !== currentUrl) {
    switch (e.data.event) {
      case 'productVieww': {
        const { product } = e.data
        return
      }
      case 'pageView': {
        pageView(e.data)
        return
      }
      case 'pageInfo': {
        pageView(e.data)
        return
      }
      default: {
        return
      }
    }
  }
})
