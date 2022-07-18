const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
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
   transpileDependencies: true,

   pluginOptions: {
     vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
   }
});
