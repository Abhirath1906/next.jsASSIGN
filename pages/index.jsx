

import styles from "./page.module.css"
export async function getServerSideProps() {
  try {
    const res = await fetch('https://fakerestapi.azurewebsites.net/api/v1/Books');
    if (!res.ok) throw new Error('Failed to fetch');
    const books = await res.json();

    return { props: { books } };
  } catch (error) {
    return { props: { books: [], error: 'ERROR BRO PLEASE CHECK AGAIN YOUR CODE' } };
  }
}

export default function Home({ books, error }) {
  return (
    <body style={{ backgroundColor: "gray" }}>
      <div style={{ padding: "100px" }}>
        <h1 style={{ display: "flex", justifyContent: "center", marginBottom: "100px", fontSize: "50px" }}>
          Book List (SSR)</h1>
        <div style={{ fontSize: "20px" }}>
          <p>This page uses <strong>Server-Side Rendering (SSR)</strong>.</p>
          <p>All books made by <strong>ME.</strong></p>
        </div>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 3fr))', gap: '100px' }}>
            {books.map(book => (
              <div key={book.id} className={styles.allbooks}>
                <h3>{book.title}</h3>
                <p><strong>Author the book:</strong> {book.excerpt}</p>
                <p>{book.description.substring()}.......</p>
                <a href={`/books/${book.id}`}>Check details...</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </body>
  );
}