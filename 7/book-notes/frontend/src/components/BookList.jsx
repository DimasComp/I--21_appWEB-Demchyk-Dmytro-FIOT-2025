import React from 'react';

const BookList = ({ books, deleteBook, editBook }) => {
  return (
    <div>
      {books.length === 0 && <p>Книги не знайдено.</p>}
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {books.map((book) => {
          const coverUrl = book.isbn
            ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`
            : 'https://via.placeholder.com/100x150?text=No+Cover';

          return (
            <li key={book.id} style={{ display: 'flex', marginBottom: '1rem', border: '1px solid #ddd', padding: '1rem', borderRadius: '6px' }}>
              <img src={coverUrl} alt={book.title} style={{ marginRight: '1rem', width: '100px', height: '150px', objectFit: 'cover' }} />
              <div style={{ flexGrow: 1 }}>
                <h3>{book.title}</h3>
                <p><b>Автор:</b> {book.author}</p>
                <p><b>Рейтинг:</b> {book.rating ?? '—'}</p>
                <p><b>Дата прочитання:</b> {book.date_read ? book.date_read.slice(0, 10) : '—'}</p>
                <p><b>Нотатки:</b> {book.notes || '—'}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <button onClick={() => editBook(book)} style={{ marginBottom: '0.5rem' }}>Редагувати</button>
                <button onClick={() => deleteBook(book.id)}>Видалити</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookList;
