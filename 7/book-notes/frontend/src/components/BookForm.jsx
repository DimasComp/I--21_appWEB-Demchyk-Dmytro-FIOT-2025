import React, { useState, useEffect } from 'react';

const BookForm = ({ saveBook, editingBook, cancelEdit }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    rating: '',
    date_read: '',
    notes: '',
  });

  useEffect(() => {
    if (editingBook) {
      setForm({
        title: editingBook.title || '',
        author: editingBook.author || '',
        isbn: editingBook.isbn || '',
        rating: editingBook.rating || '',
        date_read: editingBook.date_read ? editingBook.date_read.slice(0, 10) : '',
        notes: editingBook.notes || '',
      });
    } else {
      setForm({
        title: '',
        author: '',
        isbn: '',
        rating: '',
        date_read: '',
        notes: '',
      });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveBook(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '6px' }}>
      <h3>{editingBook ? 'Редагувати книгу' : 'Додати книгу'}</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Назва" required />
      <input name="author" value={form.author} onChange={handleChange} placeholder="Автор" required />
      <input name="isbn" value={form.isbn} onChange={handleChange} placeholder="ISBN" />
      <input
        name="rating"
        type="number"
        value={form.rating}
        onChange={handleChange}
        placeholder="Рейтинг (0-5)"
        min="0"
        max="5"
      />
      <input name="date_read" type="date" value={form.date_read} onChange={handleChange} />
      <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Нотатки" />
      <button type="submit" style={{ marginRight: '1rem' }}>{editingBook ? 'Зберегти' : 'Додати'}</button>
      {editingBook && <button type="button" onClick={cancelEdit}>Відмінити</button>}
    </form>
  );
};

export default BookForm;
