import fa from 'vee-validate/dist/locale/fa'
import {Validator} from 'vee-validate'

Validator.addLocale(fa)
Validator.extend('mobile', {
  getMessage: field => field + ' معتبر نیست.',
  validate: value => /^09[0-9]{9}$/.test(value)
})
Validator.extend('date', {
  getMessage: field => field + ' معتبر نیست.',
  validate: value =>
    /^13([0-9]{2})\/(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])$/.test(value)
})
Validator.extend('datetime', {
  getMessage: field => field + ' معتبر نیست.',
  validate: value =>
    /^13([0-9]{2})\/(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])((\s+)([0-9]{1,2}:[0-9]{1,2}(:[0-9]{1,2})?))?$/.test(
      value
    )
})
Validator.dictionary.setDateFormat('locale', 'YYYY/MM/DD')
export const validatorOptions = {
  errorBagName: 'vErrors',
  fieldsBagName: 'fields',
  delay: 100,
  locale: 'fa',
  dictionary: {
    fa: {
      messages: {
        required: () => 'اینو پرنکردی',
        min: (e, d) => ` حداقل ${d} حرف `,
        confirmed: field => field + ' با اصلش یکی نیست ',
        mobile: () => 'شماره موبایل باید با فرمت 09XXXXXXXXX باشد.',
        date: () => 'تاریخ باید با فرمت YYYY/MM/DD باشد.',
        datetime: () => 'تاریخ باید با فرمت YYYY/MM/DD HH:mm باشد.',
        length: () => 'طول رشته معتبر نیست'
      }
    }
  },
  strict: true,
  classes: true,
  classNames: {
    touched: 'touched',
    untouched: 'untouched',
    valid: 'valid',
    invalid: 'invalid',
    pristine: 'pristine',
    dirty: 'dirty'
  },
  events: 'input',
  inject: true
}
