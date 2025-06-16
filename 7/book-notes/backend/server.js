const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'booknotes',
  password: '1234',
  port: 5432,
});

// CREATE
app.post('/api/books', async (req, res) => {
  const { title, author, isbn, rating, date_read, notes } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO books (title, author, isbn, rating, date_read, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, author, isbn, rating, date_read, notes]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// READ
app.get('/api/books', async (req, res) => {
  const sort = req.query.sort || 'date_read';
  try {
    const result = await pool.query(`SELECT * FROM books ORDER BY ${sort} DESC`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// UPDATE
app.put('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, rating, date_read, notes } = req.body;
  try {
    await pool.query(
      'UPDATE books SET title=$1, author=$2, isbn=$3, rating=$4, date_read=$5, notes=$6 WHERE id=$7',
      [title, author, isbn, rating, date_read, notes, id]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// DELETE
app.delete('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
