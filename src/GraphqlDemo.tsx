import { useState } from 'react';
import { useApiDemo } from './ApiDemoContext';

interface GraphqlDemoProps {
  userId: string;
}

const GraphqlDemo: React.FC<GraphqlDemoProps> = ({ userId }) => {
  const { graphql, setGraphql } = useApiDemo();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_API_URL;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setGraphql({ data: null, time: null, dataSize: null });
    const start = performance.now();
    try {
      const query = `
        query {
          user(id: ${userId}) {
            id
            name
            posts {
              id
              title
              comments {
                id
                body
              }
            }
          }
        }
      `;
      const res = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const resClone = res.clone();
      const resBlob = await resClone.blob();
      const dataSize = resBlob.size;
      const result = await res.json();
      setGraphql({ data: result.data.user, time: performance.now() - start, dataSize });
    } catch (err: any) {
      setError(err.message || 'Error fetching data');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>GraphQL Demo</h2>
      <button onClick={fetchData} disabled={loading} style={{ marginBottom: '1rem' }}>
        {loading ? 'Loading...' : 'Load Data'}
      </button>
      {graphql.time !== null && <p>Time taken: {graphql.time.toFixed(2)} ms</p>}
      {graphql.dataSize !== null && <p>Data size: {graphql.dataSize} bytes ({(graphql.dataSize/1024).toFixed(2)} KB)</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {graphql.data && !error && (
        <div style={{ textAlign: 'left', margin: '2rem auto', maxWidth: 600 }}>
          <h3 style={{ color: '#1976d2' }}>User: {graphql.data.name}</h3>
          {graphql.data.posts.map((post: any) => (
            <div key={post.id} style={{ marginLeft: 20, marginBottom: 10 }}>
              <strong style={{ color: '#388e3c' }}>Post: {post.title}</strong>
              <ul>
                {post.comments.map((comment: any) => (
                  <li key={comment.id}>{comment.body}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GraphqlDemo; 
