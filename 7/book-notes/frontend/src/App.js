import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import './App.css';
  
const App = () => {
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState('date_read');
  const [editingBook, setEditingBook] = useState(null);

  console.log("App loaded");

  const fetchBooks = async () => {
    console.log("🟡 Sending fetch request to backend...");
    try {
      const response = await axios.get(`http://localhost:5000/api/books?sort=${sortBy}`);
      console.log("✅ Response from backend:", response.data);
      setBooks(response.data);
    } catch (err) {
      console.error("❌ Failed to fetch books:", err);
    }
  };

  // Викликаємо один раз при завантаженні
  useEffect(() => {
    fetchBooks();
  }, []);

  // Викликаємо при зміні критерію сортування
  useEffect(() => {
    fetchBooks();
  }, [sortBy]);

  const saveBook = async (book) => {
    try {
      if (editingBook) {
        await axios.put(`http://localhost:5000/api/books/${editingBook.id}`, book);
      } else {
        await axios.post('http://localhost:5000/api/books', book);
      }
      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      console.error('Помилка збереження книги:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Помилка видалення книги:', error);
    }
  };

  const editBook = (book) => {
    setEditingBook(book);
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '1rem' }}>
      <h1>Book Notes Tracker</h1>

      <label>
        Сортувати за:
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ marginLeft: '1rem' }}>
          <option value="date_read">Датою прочитання</option>
          <option value="rating">Рейтингом</option>
          <option value="title">Назвою</option>
        </select>
      </label>

      <BookForm saveBook={saveBook} editingBook={editingBook} cancelEdit={() => setEditingBook(null)} />
      <BookList books={books} deleteBook={deleteBook} editBook={editBook} />
    </div>
  );
};

export default App;
