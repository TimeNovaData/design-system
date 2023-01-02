import { boot } from 'quasar/wrappers'

// Import Vue FilePond
import vueFilePond from 'vue-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Create component
const FilePond = vueFilePond()

export default boot(async ({ app }) => {
  app.use(FilePond)

  app.component('FilePond', FilePond)
})
