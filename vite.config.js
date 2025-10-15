// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react({
//       babel: {
//         plugins: [['babel-plugin-react-compiler']],
//       },
//     }),
//   ],
//   server: {
//     historyApiFallback: true,
//   },
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
   server: {
    historyApiFallback: true, 
  }
})


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react"; 
// import path from "path";

// export default defineConfig({
//   server: {
//     host: "::",
//     port: 3000,
//   },
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"), // convenient alias
//     },
//   },
// });
