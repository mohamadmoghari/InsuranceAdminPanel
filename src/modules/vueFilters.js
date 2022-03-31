import { moment } from './moment'
const date = function(value, format = 'jYYYY-jM-jD') {
  if (!value) return ''
  if (typeof format !== 'string') format = 'jYYYY-jM-jD'
  let inputFormat = 'YYYY-MM-DDTHH:mm:ss'
  switch (format) {
    case 'full':
      format = 'dddd jDD jMMMM jYYYY'
      break
    case 'time':
      format = 'HH:mm'
      inputFormat = 'HH:mm:ss'
      break
    case 'date-time':
      format = 'jYYYY-jM-jD HH:mm'
      break
  }
  return moment(value, inputFormat).format(format)
}
const time = function(value, format, inputFormat = 'HH:mm:ss') {
  if (!value) return ''
  if (inputFormat === 'full') inputFormat = 'YYYY-MM-DDTHH:mm:ss'
  return moment(value, inputFormat).format(format || 'HH:mm')
}
const dateToTime = function(value, format) {
  if (!value) return ''
  return moment(value, 'YYYY-MM-DDTHH:mm:ss').format(format || 'HH:mm')
}

const fromNow = function(value) {
  if (!value) return ''
  let date = moment(value, 'YYYY-MM-DDTHH:mm:ss')
  try {
    return date.fromNow()
  } catch (e) {
    return date.format('jD-jM-jYY')
  }
}
export default {
  date,
  time,
  dateToTime,
  fromNow
}
