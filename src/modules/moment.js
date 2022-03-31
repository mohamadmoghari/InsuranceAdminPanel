import moment from 'moment-jalaali'
import 'moment/locale/fa.js'

moment.loadPersian({dialect: 'persian-modern'})

moment.duration.fn.format = function (input = 'HH:mm') {
  let output = input
  let milliseconds = this.asMilliseconds()
  let totalMilliseconds = 0
  let replaceRegexps = {
    years: /Y(?!Y)/g,
    months: /M(?!M)/g,
    weeks: /W(?!W)/g,
    days: /D(?!D)/g,
    hours: /H(?!H)/g,
    minutes: /m(?!m)/g,
    seconds: /s(?!s)/g,
    milliseconds: /S(?!S)/g
  }
  let matchRegexps = {
    years: /Y/g,
    months: /M/g,
    weeks: /W/g,
    days: /D/g,
    hours: /H/g,
    minutes: /m/g,
    seconds: /s/g,
    milliseconds: /S/g
  }
  for (let r in replaceRegexps) {
    if (replaceRegexps[r].test(output)) {
      let as = 'as' + r.charAt(0).toUpperCase() + r.slice(1)
      let value = new String(
        Math.floor(moment.duration(milliseconds - totalMilliseconds)[as]())
      )
      let replacements = output.match(matchRegexps[r]).length - value.length
      output = output.replace(replaceRegexps[r], value)

      while (replacements > 0 && replaceRegexps[r].test(output)) {
        output = output.replace(replaceRegexps[r], '0')
        replacements--
      }
      output = output.replace(matchRegexps[r], '')

      let temp = {}
      temp[r] = value
      totalMilliseconds += moment.duration(temp).asMilliseconds()
    }
  }
  return output
}

moment.duration.ofDate = function (date, inputFormat) {
  if (typeof date === 'string') {
    date = moment(date, inputFormat || 'YYYY-MM-DDTHH:mm:ss')
  }
  return moment.duration({
    h: date.hours(),
    m: date.minutes(),
    s: date.seconds()
  })
}

export {moment}
