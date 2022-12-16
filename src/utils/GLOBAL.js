import gsap from 'gsap/dist/gsap'
import { date, is, colors } from 'quasar'
import { unref } from 'vue'

export default {
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
  compareAndReturnDiff: (valueA = {}, valueB = {}) => {
    const modificado = {}
    Object.entries(unref(valueB)).forEach(([key, v]) => {
      const a = valueA[key]
      const b = valueB[key]
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

      const heightWithGap = (height + gap + 16).toFixed(0)
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

  FData(value) {
    if (date.isValid(value)) {
      return date.formatDate(value, 'DD/MM/YYYY')
    } else {
      return '-'
    }
  },

  FDateBRtoEU(value) {
    if (date.isValid(value)) {
      return date.formatDate(value, 'YYYY-MM-DD')
    } else {
      return '-'
    }
  },

  FTime(value /* 00:00:00 */) {
    const hora = value?.slice(0, 2)
    const minutos = value?.slice(3, 5)
    const data = date.buildDate({ year: 2022, hours: hora, minutes: minutos })

    if (date.isValid(data)) {
      return date.formatDate(data, 'HH[h] mm[m]')
    } else {
      return '-'
    }
  },
}
