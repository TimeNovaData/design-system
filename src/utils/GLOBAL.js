import gsap from 'gsap/dist/gsap'
import { date, is, colors, exportFile } from 'quasar'
import { unref } from 'vue'
import DOMPurify from 'dompurify'
import { NotifyError } from 'src/boot/Notify'

import { deepUnref } from 'vue-deepunref'

const GLOBAL = {
  debounce: (time, fn, name) => {
    return (...args) => {
      clearTimeout(window[name])
      window[name] = setTimeout(() => {
        fn(...args)
      }, time)
    }
  },

  enableDragScroll: (removeEvents) => (e, options) => {
    const domElement = e.currentTarget
    const target = e.target
    const offset = { x: 0, y: 0 }
    const startPos = { x: 0, y: 0 }

    const onMouseMove = (e) => {
      // console.log('onMouseMove')
      if (removeEvents.value) {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      domElement.scrollLeft = offset.x + startPos.x - e.clientX
      domElement.scrollTop = offset.y + startPos.y - e.clientY
      return false
    }

    const onMouseUp = (e) => {
      // console.log('onMouseUp')
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)

      return false
    }

    const onMouseDown = (e) => {
      // console.log('onMouseDown')
      removeEvents.value = false
      if (e.button !== 0 || options?.fxIgnore(e)) return

      startPos.x = e.clientX
      startPos.y = e.clientY
      offset.x = domElement.scrollLeft
      offset.y = domElement.scrollTop

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)

      return false
    }

    domElement.addEventListener('mousedown', onMouseDown)
  },

  // gera um rage de um array
  generateRange: (totalElementos, modelo /* cb  return obj template */) => {
    return Array.from({ length: totalElementos }, (_, i) =>
      modelo(i, totalElementos)
    )
  },

  // compara dois objetos e retorna a diferença
  compareAndReturnDiff: (oldv = {}, newv = {}) => {
    const modificado = {}
    if (!oldv || !newv) {
      return null
    }
    Object.entries(unref(newv)).forEach(([key, v]) => {
      const a = oldv[key]
      const b = newv[key]
      if (is.deepEqual(a, b)) return null
      else modificado[key] = v
    })
    return modificado
  },

  // Atualiza o height de acordo com a quantidade de filhos + gap
  setHeightInCol: (
    wrapper = '.cards-wrapper',
    item = '.kanban-card',
    space = 7
  ) => {
    document.querySelectorAll(wrapper).forEach((i) => {
      const filhos = [...i.querySelectorAll(item)]
      const gap = filhos.length * space

      const height = filhos.reduce((acc, children) => {
        acc += children.getBoundingClientRect().height
        return acc
      }, 0)

      const createCard = i
        .closest('.kanban-col')
        .querySelector('.kanban-new-card')

      const newCardSize = createCard
        ? createCard.getBoundingClientRect().height
        : 0

      const heightWithGap = (height + newCardSize + gap + 16).toFixed(0)
      gsap.to(i, {
        height: heightWithGap,
        duration: 0.5,
        ease: 'power1',
      })
    })
  },

  ordenateKey: (key) => (a, b /* sort cb */) => {
    if (a[key] > b[key]) return 1
    if (a[key] < b[key]) return -1
    return 0
  },

  getItemPerID: (id) => (acc, i /* reduce cb */) => {
    if (i.id === id) acc = i
    return acc
  },

  // return ex: '255, 255,255'
  returnRGB: (v) => (v ? `${Object.values(colors.hexToRgb(v))}` : ''),

  FData(value, format = 'DD/MM/YYYY') {
    if (date.isValid(value)) {
      const dataFormatted = value.length > 10 ? value : value.replace('-', '/')
      const data = date.formatDate(dataFormatted, format, {
        days: [
          'Domingo',
          'Segunda',
          'Terça',
          'Quarta',
          'Quinta',
          'Sexta',
          'Sábado',
        ],
      })
      return data
    } else {
      return '-'
    }
  },

  FDataAndTime(value) {
    if (date.isValid(value)) {
      const dataFormatted = value.length > 10 ? value : value.replace('-', '/')
      const data = date.formatDate(dataFormatted, 'DD MMMM')
      const time = date.formatDate(dataFormatted, 'HH[h] mm[m]')
      return `${data} às ${time}`
    } else {
      return '-'
    }
  },

  FDateBRtoEU(value) {
    if (value) {
      const dia = value.slice(0, 2)
      const mes = value.slice(3, 5)
      const ano = value.slice(6, 10)
      return `${ano}-${mes}-${dia}`
    } else {
      return '-'
    }
  },

  FTime(value /* 00:00:00 */) {
    if (!value) return '-'
    const len8 = value.length === 8

    const hora = value?.slice(0, len8 ? 2 : 3)
    const minutos = value?.slice(len8 ? 3 : 4, len8 ? 5 : 6)

    const data = date.buildDate({ year: 2022, hours: hora, minutes: minutos })

    if (date.isValid(data)) {
      return `${hora}h ${minutos}m`
      // return date.formatDate(data, 'HH[h] mm[m]')
    } else {
      return '-'
    }
  },

  FTimeLong(value) {
    const timeReplaced = value.replace('h ', ':').replace('m', ':00')
    return timeReplaced
  },

  imgSrc(url) {
    if (!url) return ''
    const haveMedia = url.includes('/media')
    if (process.env.development && haveMedia) {
      return `${process.env.BACKEND_URL}${url.replace('/', '')}`
    } else {
      return url
    }
  },

  zeroPad(num, count = 2) {
    return num?.toString().padStart(count, '0')
  },

  generateStringFilterFromObject(obj) {
    const filtros = Object.entries(obj).map(
      ([key, value]) => `&${key?.trim()}=${value || ''}`
    )
    return `?x=${filtros.join('')}`
  },

  secondsToHours(seconds, mostrarSeconds = true) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds - hours * 3600) / 60)
    const seconds_ = seconds - hours * 3600 - minutes * 60
    return `${hours}h ${minutes}m ${
      mostrarSeconds ? `${Math.round(seconds_)}s` : ''
    }`
  },

  wrapCsvValue(val, formatFn, row) {
    let formatted = formatFn !== void 0 ? formatFn(val, row) : val

    formatted =
      formatted === void 0 || formatted === null ? '' : String(formatted)

    formatted = formatted.split('"').join('""')
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`
  },

  exportTable(columns, rows) {
    // naive encoding to csv format
    const content = [columns.map((col) => GLOBAL.wrapCsvValue(col.label))]
      .concat(
        deepUnref(rows).map((row) =>
          columns
            .map((col) =>
              GLOBAL.wrapCsvValue(
                typeof col.field === 'function'
                  ? col.field(row)
                  : row[col.field === void 0 ? col.name : col.field],
                col.format,
                row
              )
            )
            .join(',')
        )
      )
      .join('\r\n')

    const status = exportFile('table-export.csv', content, 'text/csv')

    if (status !== true) {
      NotifyError('Erro ao baixar')
    }
  },

  async blobDownloadFile(url, fileName) {
    const image = await fetch(url)
    const imageBlob = await image.blob()
    const imageURL = URL.createObjectURL(imageBlob)

    const anchor = document.createElement('a')
    anchor.href = imageURL
    anchor.download = fileName

    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)

    URL.revokeObjectURL(imageURL)
  },

  sanitizeHTML(v) {
    const vNoStyle = v.replaceAll(/\s\w+="[^"]*"/g, '')

    const value = DOMPurify.sanitize(v, {
      USE_PROFILES: { html: true },
      FORBID_TAGS: ['script'],
      FORBID_ATTR: ['onclick', 'style'],
    })

    return value
  },

  removeHTMLFromString(v) {
    return v.replaceAll(/<[^>]*>/g, '')
    // .replaceAll('&nbsp;', ' ')
  },

  getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  formatToCalendar(arr, formato) {
    const result = arr
      .filter((i) => i.entrega_data_desejada)
      .map((i) => {
        const entregaUmaHoraAMenos = date.subtractFromDate(
          i.entrega_data_desejada,
          {
            hours: -1,
          }
        )
        const entregaDataFormated = date.formatDate(i.entrega_data_desejada)

        const UmaHoraMenorFormated = date.formatDate(
          entregaUmaHoraAMenos,
          formato
        )

        const initDate = i.data_inicial_previsto
          ? date.formatDate(i.data_inicial_previsto, formato)
          : UmaHoraMenorFormated

        return {
          id: i.id,
          title: i.titulo,
          start: initDate,
          end: entregaDataFormated,
          extendedProps: { ...i },
          allDay: false,
        }
      })
    return result
  },
}
// eslint-disable-next-line n/no-deprecated-api
window.GLOBAL = GLOBAL
export default GLOBAL
