import { boot } from 'quasar/wrappers'

// Import Vue FilePond
import vueFilePond from 'vue-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Create component
export const FilePond = vueFilePond(FilePondPluginFileValidateType)

export default boot(async ({ app }) => {
  // app.use(FilePond)
  app.component('FilePond', FilePond)
})
