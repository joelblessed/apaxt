const jsonServer = require('json-server');
const multer = require('multer');

// Configure API rest for default settings
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
server.use(jsonServer.bodyParser);
server.use(middlewares);

//Configure the multer service
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads'); // Folder where the images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // File name
  },

});
const upload = multer({ storage: storage });

//Configure routes for upload images
server.post('/gallery', upload.single('image'), (req, res) => {
  const file = req.file;
  const url = `http://localhost:5000/images/${file.originalname}`;
  const image = {
    id: Date.now(),
    img: url,
    name: req.body.name,
    message: req.body.message,

  };
  router.db.get('images').push(image).write();
  res.json(image);
});
server.use(router);

// Listen ports requests
server.listen(8080, () => {
  console.log('JSON Server is running')});