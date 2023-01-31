import { boot } from 'quasar/wrappers'
import Plugin from '@quasar/quasar-ui-qcalendar/src/QCalendar.js'

export default boot(({ app }) => {
  app.use(Plugin)
})
