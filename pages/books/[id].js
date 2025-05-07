
import styles from "./page.module.css";
import { useRouter } from 'next/router';

export async function getStaticPaths() {
  // Pre-render first 10 books
  const paths = Array.from({ length: 10 }, (_, i) => ({
    params: { id: `${i + 1}` },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`https://fakerestapi.azurewebsites.net/api/v1/Books/${params.id}`);
    if (!res.ok) {
      return { notFound: true };
    }
    const book = await res.json();

    return {
      props: { book },
      revalidate: 60, // optional: re-generate after 60s
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default function BookDetail({ book }) {
  const router = useRouter();

  // Fallback loading state
  if (router.isFallback) {
    return <p>Loading book details...</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Book Details (SSG + Fallback)</h1>
      <p>This page uses <strong>Static Site Generation (SSG)</strong> with dynamic fallback.</p>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.excerpt}</p>
      <p><strong>Published:</strong> {new Date(book.publishDate).toLocaleDateString()}</p>
      <p><strong>Page Count:</strong> {book.pageCount}</p>
      <p><strong>Description:</strong> {book.description}</p>
    </div>
  );
}