import GLOBAL from 'src/utils/GLOBAL'

export default {
  colors: [
    '#0b8b4e',
    '#40f09c',
    '#0da35b',
    '#28ee90',
    '#0fba69',
    '#13ea83',
    '#11d276',
  ],
  chart: {
    id: 'chart1',
    type: 'bar',
    height: 450,
    width: '100%',
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    animations: {
      enabled: false,
    },
  },
  xaxis: {
    categories: [],
    labels: {
      rotateAlways: true,
      style: {
        fontSize: '12px',
        fontFamily: 'Inter',
      },
    },
  },
  yaxis: {
    // floating: true,
    labels: {
      formatter: function (val, opt) {
        return GLOBAL.secondsToHours(val, false)
      },
      style: {
        fontSize: '12px',
      },
    },
    axisBorder: {
      show: false,
      // color: '#78909C',
      // offsetX: 0,
      // offsetY: 0
    },
  },

  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
      fontFamily: 'Inter',
      fontWeight: 'bold',
    },
    formatter: function (val, opt) {
      return GLOBAL.secondsToHours(val, false)
    },
  },
  tooltip: {
    y: {
      show: true,
      format: 'dd MMM',
      formatter: function (val, opt) {
        return GLOBAL.secondsToHours(val, false)
      },
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
    },
  },

  grid: {
    borderColor: '#E9ECEF',
    strokeDashArray: 0,
    position: 'back',
    padding: {
      right: 12,
      left: 12,
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
}
