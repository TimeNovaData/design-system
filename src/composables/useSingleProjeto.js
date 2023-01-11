export default function useSingleProjeto() {
  function populateChart(tempoProjetos, chart) {
    const tipo = 'cargo'

    const getDuracoes = (t) => {
      return Object.entries(t)
        .map((i) => {
          if (i[0] !== tipo) return i[1].duracao
          else return null
        })
        .filter((i) => i !== null)
    }

    const duracoes = Object.values(tempoProjetos).map(getDuracoes)

    const labelsA = Object.values(tempoProjetos).map((projeto) =>
      Object.entries(projeto)
    )

    const labelsB = labelsA.map((i) => {
      const arr = i.filter((i) => i[0] === tipo && i[1])
      return arr.length ? arr[0][1] : 'Sem área associada'
    })

    const categories = Object.values(tempoProjetos)
      .map((projeto) => Object.keys(projeto))[0]
      .filter((i) => i !== tipo)

    const generateSeriesApex = (item, index) => ({
      name: labelsB[index],
      data: duracoes[index],
    })

    const seriesApex = Object.values(tempoProjetos).map(generateSeriesApex)
    if (categories && seriesApex !== {})
      chart.value.updateOptions({
        series: seriesApex,
        xaxis: {
          categories: categories.map((i) => i.slice(0, 5)) || [],
          labels: {
            rotateAlways: false,
            style: {
              fontSize: '11px',
              fontFamily: 'DM sans',
              fontWeight: '500',
            },
          },
        },
      })

    return seriesApex
  }
  return {
    populateChart,
  }
}
