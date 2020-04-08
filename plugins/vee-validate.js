import { extend } from 'vee-validate'
/* eslint-disable camelcase */
import { required, numeric, max_value, min_value } from 'vee-validate/dist/rules'

extend('required', {
  ...required
})

extend('numeric', {
  ...numeric
})

extend('max_value', {
  ...max_value
})

extend('min_value', {
  ...min_value
})
