const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // Transpilar dependências específicas (útil para pacotes que não são ES5)
  transpileDependencies: true,
  
  // Configurações do webpack
  configureWebpack: {
    devtool: 'source-map', // Gera source maps para melhor debugging
    performance: {
      hints: false // Desativa avisos de tamanho de assets grandes
    }
  },
  
  // Configurações do servidor de desenvolvimento
  devServer: {
    port: 8080,          // Porta do servidor local
    hot: true,           // Habilita Hot Module Replacement
    open: true,          // Abre o navegador automaticamente
    allowedHosts: 'all', // Permite qualquer host (equivalente ao disableHostCheck)
    client: {
      overlay: {         // Configurações para erros no navegador
        warnings: false,
        errors: true
      }
    }
  },

  // Outras configurações
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false
})
