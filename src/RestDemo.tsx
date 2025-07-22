import { useState } from 'react';
import { useApiDemo } from './ApiDemoContext';

interface RestDemoProps {
  userId: string;
}

function RestDemo({ userId }: RestDemoProps) {
  const { rest, setRest } = useApiDemo();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const REST_API_URL = import.meta.env.VITE_REST_API_URL;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setRest({ data: null, time: null, dataSize: null });
    const start = performance.now();
    let totalBytes = 0;
    try {
      const userRes = await fetch(`${REST_API_URL}/users/${userId}`);
      const userResClone = userRes.clone();
      const userBlob = await userResClone.blob();
      totalBytes += userBlob.size;
      if (!userRes.ok) throw new Error('User not found');
      const user = await userRes.json();

      const postsRes = await fetch(`${REST_API_URL}/users/${userId}/posts`);
      const postsResClone = postsRes.clone();
      const postsBlob = await postsResClone.blob();
      totalBytes += postsBlob.size;
      const posts = await postsRes.json();

      const postsWithComments = await Promise.all(posts.map(async (post: any) => {
        const commentsRes = await fetch(`${REST_API_URL}/posts/${post.id}/comments`);
        const commentsResClone = commentsRes.clone();
        const commentsBlob = await commentsResClone.blob();
        totalBytes += commentsBlob.size;
        const comments = await commentsRes.json();
        return { ...post, comments };
      }));
      setRest({ data: { ...user, posts: postsWithComments }, time: performance.now() - start, dataSize: totalBytes });
    } catch (err: any) {
      setError(err.message || 'Error fetching data');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>REST API Demo</h2>
      <button onClick={fetchData} disabled={loading} style={{ marginBottom: '1rem' }}>
        {loading ? 'Loading...' : 'Load Data'}
      </button>
      {rest.time !== null && <p>Time taken: {rest.time.toFixed(2)} ms</p>}
      {rest.dataSize !== null && <p>Data size: {rest.dataSize} bytes ({(rest.dataSize/1024).toFixed(2)} KB)</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {rest.data && !error && (
        <div style={{ textAlign: 'left', margin: '2rem auto', maxWidth: 600 }}>
          <h3 style={{ color: '#1976d2' }}>User: {rest.data.name}</h3>
          {rest.data.posts.map((post: any) => (
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
}

export default RestDemo; 
