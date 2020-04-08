import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { settings, loyaltyType, loyaltyCardStatus, respondentAge } from '~/constants'

export default (ctx, inject) => {
  const api = axios.create()
  const mock = new MockAdapter(api, { delayResponse: 500 })
  mock.onGet('/newSetting').reply(() => {
    return [200, settings]
  })
  mock.onGet('/loyaltyType').reply(() => {
    return [200, loyaltyType]
  })
  mock.onGet('/loyaltyCardStatus').reply(() => {
    return [200, loyaltyCardStatus]
  })
  mock.onGet('/respondentAge').reply(() => {
    return [200, respondentAge]
  })
  mock.onPost('/postForm').reply(() => {
    return [200]
  })
  inject('api', api)
}
