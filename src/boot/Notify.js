import { Notify } from 'quasar'
import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files

Notify.registerType('error', {
  icon: 'warning',
  progress: true,
  classes: 'notify-error',
  timeout: 2500,
  position: 'top-right',
})

Notify.registerType('sucess', {
  icon: 'check_circle',
  progress: true,
  classes: 'notify-sucess',
  timeout: 2500,
  position: 'top-right',
})

const NotifyError = (text, opts) =>
  Notify.create({ type: 'error', message: text, ...opts })

const NotifySucess = (text, opts) =>
  Notify.create({ type: 'sucess', message: text, ...opts })

export default boot(async ({ app }) => {
  app.config.globalProperties.$Notify = Notify
  app.config.globalProperties.$NotifyError = NotifyError
  app.config.globalProperties.$NotifySucess = NotifySucess
  window.NotifySucess = NotifySucess
})

export { NotifyError, NotifySucess }
