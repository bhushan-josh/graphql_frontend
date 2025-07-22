import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import RestDemo from './RestDemo';
import GraphqlDemo from './GraphqlDemo';

function App() {
  const [userId, setUserId] = useState('31');
  return (
    <Router>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h1>API Performance Demo</h1>
        <div style={{ margin: '2rem' }}>
          <label htmlFor="user-id-input">User ID: </label>
          <input
            id="user-id-input"
            type="number"
            min="1"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            style={{ width: 60, marginRight: '2rem' }}
          />
          <Link to="/rest-demo">
            <button style={{ marginRight: '1rem' }}>REST API Demo</button>
          </Link>
          <Link to="/graphql-demo">
            <button>GraphQL Demo</button>
          </Link>
        </div>
        <Routes>
          <Route path="/rest-demo" element={<RestDemo userId={userId} />} />
          <Route path="/graphql-demo" element={<GraphqlDemo userId={userId} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
