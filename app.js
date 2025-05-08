const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// routes
app.get('/', (req, res) => {
  res.render('index', { pdfPath: null });
});

app.get('/pdf-coordinates', (req, res) => {
    res.render('index', { pdfPath: null });
});

app.post('/upload', upload.single('pdf'), (req, res) => {
  res.render('index', { pdfPath: `/uploads/${req.file.filename}` });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
