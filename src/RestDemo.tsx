import React, { useState, useEffect } from 'react';

interface RestDemoProps {
  userId: string;
}

function RestDemo({ userId }: RestDemoProps) {
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
    let totalBytes = 0;
    try {
      const userRes = await fetch(`http://localhost:3000/users/${userId}`);
      const userResClone = userRes.clone();
      const userBlob = await userResClone.blob();
      totalBytes += userBlob.size;
      if (!userRes.ok) throw new Error('User not found');
      const user = await userRes.json();

      const postsRes = await fetch(`http://localhost:3000/users/${userId}/posts`);
      const postsResClone = postsRes.clone();
      const postsBlob = await postsResClone.blob();
      totalBytes += postsBlob.size;
      const posts = await postsRes.json();

      const postsWithComments = await Promise.all(posts.map(async (post: any) => {
        const commentsRes = await fetch(`http://localhost:3000/posts/${post.id}/comments`);
        const commentsResClone = commentsRes.clone();
        const commentsBlob = await commentsResClone.blob();
        totalBytes += commentsBlob.size;
        const comments = await commentsRes.json();
        return { ...post, comments };
      }));
      setData({ ...user, posts: postsWithComments });
      setTime(performance.now() - start);
      setDataSize(totalBytes);
    } catch (err: any) {
      setError(err.message || 'Error fetching data');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>REST API Demo</h2>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      {time !== null && <p>Time taken: {time.toFixed(2)} ms</p>}
      {dataSize !== null && <p>Data size: {dataSize} bytes ({(dataSize/1024).toFixed(2)} KB)</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && !error && (
        <div style={{ textAlign: 'left', margin: '2rem auto', maxWidth: 600 }}>
          <h3 style={{ color: '#1976d2' }}>User: {data.name}</h3>
          {data.posts.map((post: any) => (
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
