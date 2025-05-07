


export async function getServerSideProps() {
  try {
    const res = await fetch('https://fakerestapi.azurewebsites.net/api/v1/Books');
    if (!res.ok) throw new Error('Failed to fetch');
    const books = await res.json();

    return { props: { books } };
  } catch (error) {
    return { props: { books: [], error: 'Failed to load books.' } };
  }
}

export default function Home({ books, error }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Book List (SSR)</h1>
      <p>This page uses <strong>Server-Side Rendering (SSR)</strong>.</p>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {books.map(book => (
            <li key={book.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.excerpt}</p>
              <p>{book.description.substring(0, 100)}...</p>
              <a href={`/books/${book.id}`}>View Details</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}