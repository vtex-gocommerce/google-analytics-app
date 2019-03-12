import gaScript from './scripts/ga'

const gaId = window.__SETTINGS__.gaId

if (!gaId) {
  throw new Error('Warning: No Google Tag Manager ID is defined. To setup this app, take a look at your admin')
}

// tslint:disable-next-line no-eval
eval(gaScript(window.__SETTINGS__.gaId))

window.dataLayer = window.dataLayer || []

window.addEventListener('message', e => {
  console.log('HAHAHAHAHAHA', e.data.eventName)
  switch (e.data.eventName) {
    case 'vtex:productView': {
      const {
        productId,
        productName,
        brand,
        categories,
        items,
      } = e.data.product

      // const category = path(['0'], categories) as string

      const data = {
        ecommerce: {
          detail: {
            products: [
              {
                brand,
                // category: category && category.replace(/^\/|\/$/g, ''),
                id: productId,
                name: productName,
                // price: path(['items', '0', 'sellers', '0', 'commertialOffer', 'ListPrice'], e.data.product)
              },
            ],
          },
        },
      }

      window.dataLayer.push(data)
      return
    }
    case 'vtex:addToCart': {
      const {
        items
      } = e.data

      window.dataLayer.push({
        ecommerce: {
          add: {
            products: items.map((sku: any) => ({
              brand: sku.brand,
              id: sku.skuId,
              name: sku.name,
              price: `${sku.price}`,
              quantity: sku.quantity,
              variant: sku.variant,
            }))
          },
          currencyCode: e.data.currency,
        },
        event: 'addToCart',
      })
      return
    }
    default: {
      return
    }
  }
})
