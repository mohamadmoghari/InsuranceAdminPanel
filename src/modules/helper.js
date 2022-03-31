/*********************************************
 * String
 *********************************************/
if (!String.prototype.trim) {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/gm, '')
  }
}
let trim = str => {
  return str.toString().replace(/^\s+|\s+$/gm, '')
}

String.prototype.toPriceFormat = function() {
  return this.replace(/(\d{3})(?=\d)/g, '$1,')
}

/*********************************************
 * Number
 *********************************************/
Number.prototype.toPriceFormat = function() {
  return this.toString().toPriceFormat()
}

function toFormData(obj, form, namespace) {
  let fd = form || new FormData()
  let formKey
  for (let property in obj) {
    if (obj.hasOwnProperty(property) && obj[property]) {
      if (namespace) {
        formKey = namespace + '[' + property + ']'
      } else {
        formKey = property
      }

      // if the property is an object, but not a File, use recursivity.
      if (obj[property] instanceof Date) {
        fd.append(formKey, obj[property].toISOString())
      } else if (
        typeof obj[property] === 'object' &&
        !(obj[property] instanceof File)
      ) {
        toFormData(obj[property], fd, formKey)
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property])
      }
    }
  }
  return fd
}

HTMLElement.prototype.serialize = function() {
  let i,
    j,
    q = {},
    form = this

  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    if (form.elements[i].name === '') {
      continue
    }
    switch (form.elements[i].nodeName) {
      case 'INPUT':
        switch (form.elements[i].type) {
          // case 'text':
          // case 'color':
          // case 'file':
          // case 'search':
          // case 'time':
          // case 'url':
          // case 'tel':
          // case 'number':
          // case 'email':
          // case 'hidden':
          // case 'password':
          // case 'button':
          // case 'reset':
          // case 'submit':
          //     break;
          case 'checkbox':
          case 'radio':
            if (form.elements[i].checked) {
              q[form.elements[i].name] = form.elements[i].value
            }
            break
          default:
            q[form.elements[i].name] = form.elements[i].value
            break
        }
        break
      case 'file':
        break
      case 'TEXTAREA':
        q[form.elements[i].name] = form.elements[i].value
        break
      case 'SELECT':
        switch (form.elements[i].type) {
          case 'select-one':
            q[form.elements[i].name] = form.elements[i].value
            break
          case 'select-multiple':
            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
              if (form.elements[i].options[j].selected) {
                q[form.elements[i].name] = form.elements[i].value
              }
            }
            break
        }
        break
      case 'BUTTON':
        switch (form.elements[i].type) {
          case 'reset':
          case 'submit':
          case 'button':
            q[form.elements[i].name] = form.elements[i].value
            break
        }
        break
    }
  }
  return q
}

window.elOffset = function(el) {
  let rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

window.userAvatar = str => {}

window.newId = function() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  )
}

window.time = {
  getH: function(s) {
    if (typeof s === 'string') return parseInt(s.split(':')[0])
    else return Math.floor(s / 3600)
  },
  getM: function(s) {
    if (typeof s === 'string') {
      return parseInt(s.split(':')[1])
    } else {
      s %= 3600
      return Math.floor(s / 60)
    }
  },
  toSeconds: function(str) {
    let d = str.split(':')
    return parseInt(d[0]) * 3600 + parseInt(d[1]) * 60
  },
  toHHmm: function(seconds) {
    let h = time.getH(seconds)
    let m = time.getM(seconds)
    return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m)
  },
  getBetween: function(a, b, stringOutput) {
    if (typeof a === 'string') a = this.toSeconds(a)
    if (typeof b === 'string') b = this.toSeconds(b)

    if (a > 86400) a /= 1000
    if (b > 86400) b /= 1000

    let total = b - a
    if (total < 0) total = 86400 - a + b
    total = Math.floor(total)
    return stringOutput ? this.toHHmm(total) : total
  }
}

window.randomString = function(length, chars) {
  let mask = ''
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz'
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (chars.indexOf('#') > -1) mask += '0123456789'
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\'
  let result = ''
  for (let i = length; i > 0; --i)
    result += mask[Math.floor(Math.random() * mask.length)]
  return result
}

window.clone = function(obj) {
  let copy

  // Handle the 3 simple types, and null or undefined
  if (null == obj || 'object' != typeof obj) return obj

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = []
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i])
    }
    return copy
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {}
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr])
    }
    return copy
  }

  throw new Error("Unable to copy obj! Its type isn't supported.")
}

window.rand = function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
