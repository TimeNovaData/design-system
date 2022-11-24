import gsap from "gsap/dist/gsap"
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
      if (removeEvents) {
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
      removeEvents = false
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
    return Array.from({ length: totalElementos }, (_, i) => modelo(i, totalElementos))
  },
  modelo1: (i, totalElementos) => ({
    id: totalElementos + i,
    nome: 'usuario' + i,
    tags: [
      {
        nome: 'Front End',
        cor: '--alert-warning',
      },
      {
        nome: 'Back End',
        cor: '--alert-error',
      },
    ],
}),
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
}

}
