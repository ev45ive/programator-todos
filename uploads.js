const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('dane.json')
const middlewares = jsonServer.defaults()
var multer  = require('multer')
var upload = multer({
  dest:'./uploads',
}).single('avatar')
var fs = require('fs')

server.use(middlewares)
server.post('/files', upload,async (req,res,next)=>{
req,res
  debugger
  console.log(req.file)
  await fs.promises.rename('./'+req.file.path,'./uploads/'+req.file.originalname)
  next()
})
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})