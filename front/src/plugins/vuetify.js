// src/plugins/vuetify.js

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Importe o pacote de ícones que você deseja usar
import { mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css' // Garante que os ícones sejam carregados

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Define mdi como o pacote padrão
    sets: {
      mdi,
    },
  },
})