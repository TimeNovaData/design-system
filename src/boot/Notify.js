import { Notify } from 'quasar'
import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files

Notify.registerType('error', {
  icon: 'warning',
  progress: true,
  classes: 'notify-error',
  timeout: 2000,
  position: 'top-right',
})

Notify.registerType('sucess', {
  icon: 'check_circle',
  progress: true,
  classes: 'notify-sucess',
  timeout: 2000,
  position: 'top-right',
})

const NotifyError = (text) => Notify.create({ type: 'error', message: text })
const NotifySucess = (text) => Notify.create({ type: 'sucess', message: text })

export default boot(async ({ app }) => {
  app.config.globalProperties.$Notify = Notify
  app.config.globalProperties.$NotifyError = NotifyError
  app.config.globalProperties.$NotifySucess = NotifySucess
})

export { NotifyError }
