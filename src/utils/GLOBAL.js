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

  generateRange: (totalElementos, modelo) => {
    return Array.from({ length: totalElementos }, (_, i) =>
      modelo(i, totalElementos)
    )
  },

  compareAndReturnDiff: (valueA, valueB) => {
    const modificado = {}
    Object.entries(unref(valueB)).forEach(([key, v]) => {
      const a = valueA[key]
      const b = valueB[key]
      // eslint-disable-next-line eqeqeq
      if (is.deepEqual(a, b)) {
        return null
      } else {
        modificado[key] = v
      }
    })
    return modificado
  },

  // Atualiza o height de acordo com a quantidade de filhos + gap
  setHeightInCol: () => {
    document.querySelectorAll('.cards-wrapper').forEach((i) => {
      const filhos = [...i.querySelectorAll('.kanban-card')]
      const gap = filhos.length * 7
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
  returnRGB: (v) => `${Object.values(colors.hexToRgb(v))}`,

  FData(value) {
    if (date.isValid(value)) {
      return date.formatDate(value, 'DD/MM/YYYY')
    } else {
      return '-'
    }
  },
  FTime(value) {
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
