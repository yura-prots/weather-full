const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
   transpileDependencies: true,
   // devServer: {
   //    proxy: {
   //       '^/api': {
   //          target: '<url>',
   //          ws: true,
   //          changeOrigin: true,
   //       },
   //       '^/foo': {
   //          target: '<other_url>',
   //       },
   //    },
   // },
});
