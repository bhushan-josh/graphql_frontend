import React, { useState } from 'react';

interface GraphqlDemoProps {
  userId: string;
}

const GRAPHQL_ENDPOINT = 'http://localhost:3000/graphql'; // Adjust if your backend runs elsewhere

const GraphqlDemo: React.FC<GraphqlDemoProps> = ({ userId }) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dataSize, setDataSize] = useState<number | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setTime(null);
    setDataSize(null);
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
      setDataSize(resBlob.size);
      const result = await res.json();
      setData(result.data.user);
      setTime(performance.now() - start);
    } catch (err: any) {
      setError(err.message || 'Error fetching data');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>GraphQL Demo</h2>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      {time !== null && <p>Time taken: {time.toFixed(2)} ms</p>}
      {dataSize !== null && <p>Data size: {dataSize} bytes ({(dataSize/1024).toFixed(2)} KB)</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && !error && (
        <div style={{ textAlign: 'left', margin: '2rem auto', maxWidth: 600 }}>
          <h3>User: {data.name}</h3>
          {data.posts.map((post: any) => (
            <div key={post.id} style={{ marginLeft: 20, marginBottom: 10 }}>
              <strong>Post: {post.title}</strong>
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
