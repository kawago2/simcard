const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 4001;

app.use(bodyParser.json());

// Konfigurasi koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'simcards',
});

// Membuka koneksi ke database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Endpoint GET untuk mendapatkan semua data kartu SIM
app.get('/api/simcards', (req, res) => {
  const sql = 'SELECT * FROM simcards';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});

// Endpoint GET untuk mendapatkan data kartu SIM berdasarkan ID
app.get('/api/simcards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const sql = 'SELECT * FROM simcards WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'SimCard not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Endpoint POST untuk menambahkan data kartu SIM baru
app.post('/api/simcards', (req, res) => {
  const newSimCard = req.body;
  const sql = 'INSERT INTO simcards (number, operator, balance) VALUES (?, ?, ?)';

  db.query(sql, [newSimCard.number, newSimCard.operator, newSimCard.balance], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Mengembalikan data kartu SIM yang baru ditambahkan beserta ID yang di-generate
    res.status(201).json({ id: result.insertId, ...newSimCard });
  });
});

// Menjalankan server pada port tertentu
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
