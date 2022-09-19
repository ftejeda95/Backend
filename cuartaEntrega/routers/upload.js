// const express = require('express')

// const multer  = require('multer')
// const { Router } = express

// const router = Router()

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`)
//   }
// })

// const upload = multer({ storage })

// router.post('/upload-file', upload.single('single-file'), (req, res, next) => {
//   const { file } = req
//   if (!file) {
//     const error = new Error('Archivo no encontrado.')
//     error.httpStatusCode = 400
//     return next()
//   }
//   res.send(file)
// })

// router.post('/upload-files', upload.array('multiple-files'), (req, res, next) => {
//   const { files } = req
//   if (!files) {
//     const error = new Error('Archivos no encontrados.')
//     error.httpStatusCode = 400
//     return next()
//   }
//   res.send(files)
// })

// module.exports = router