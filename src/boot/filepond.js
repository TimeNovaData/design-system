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

/* 

const traducao = {
    labelIdle: 'Arraste e solte o arquivo <br>ou <span class="filepond--label-action">selecione um arquivo</span>',
    labelInvalidField: 'O Tipo de arquivo é invalido',
    labelButtonRemoveItem: 'Remover',
    labelButtonAbortItemLoad: 'Abortar',
    labelButtonAbortItemLoad: 'Tente Novamente',
    labelButtonAbortItemProcessing: "Cancelar",
    labelButtonUndoItemProcessing: "Desfazer",
    labelButtonRetryItemProcessing: "Tente Novamente",
    labelButtonProcessItem: 'Processar',
    labelTapToCancel: 'Cancelar',
}
const optionsMeuEz = {
        // stylePanelLayout: 'integrated',
        allowMultiples: false,
        storeAsFile: true,
        labelIdle: labelTemplate,
        //labels

        styleImageEditButtonEditItemPosition: "top left",
        imagePreviewHeight: 160,
        allowImageEdit: true,
        imageEditAllowEdit: true,

    labelFileTypeNotAllowed: 'Tipo de arquivo não é suportado',
    fileValidateTypeLabelExpectedTypes: 'Espera {allButLastType} ou {lastType}',
   
}
  const arquivosAceitos = [        
            ".stl",
            ".dcm",
            ".STL",
            ".DCM",
    ]
 const FilepondsList = Array.from(inputsEls).map(i => {
        const pond = FilePond.create(i, opts)

        pond.on('addfile', (_, file) => {
            window.teste = file
            const name = file.source.name //pega o nome  do arquivo
            const handleAceptFiles = (tipo) => name.endsWith(tipo) 
            const validation = arquivosAceitos.filter(handleAceptFiles) // verifica se o nome contem algum valor do array `

            if(file.source.size === 0) { //verifica se o arquivo tem tamanho
                Toastify({
                    text: "Arquivo Corrompido",
                    duration:5000,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                  }).showToast();
                  file.abortLoad()
                  return
            }

            if (validation.length === 0 ){
                Toastify({
                    text: "Tipo de arquivo não é suportado",
                    duration:5000,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                  }).showToast();
                  file.abortLoad()

            }
        })

        return pond
    })
*/
