import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import RestDemo from './RestDemo';
import GraphqlDemo from './GraphqlDemo';
import { ApiDemoProvider, useApiDemo } from './ApiDemoContext';

function ComparisonBar() {
  const { rest, graphql } = useApiDemo();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 24 }}>
      <div style={{ border: '1px solid #1976d2', borderRadius: 8, padding: 12, minWidth: 200 }}>
        <h4 style={{ color: '#1976d2', margin: 0 }}>REST API</h4>
        <div>Time: {rest.time !== null ? `${rest.time.toFixed(2)} ms` : '--'}</div>
        <div>Data: {rest.dataSize !== null ? `${rest.dataSize} bytes (${(rest.dataSize/1024).toFixed(2)} KB)` : '--'}</div>
      </div>
      <div style={{ border: '1px solid #388e3c', borderRadius: 8, padding: 12, minWidth: 200 }}>
        <h4 style={{ color: '#388e3c', margin: 0 }}>GraphQL</h4>
        <div>Time: {graphql.time !== null ? `${graphql.time.toFixed(2)} ms` : '--'}</div>
        <div>Data: {graphql.dataSize !== null ? `${graphql.dataSize} bytes (${(graphql.dataSize/1024).toFixed(2)} KB)` : '--'}</div>
      </div>
    </div>
  );
}

function App() {
  const userId = '31';
  return (
    <ApiDemoProvider>
      <Router>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h1>API Performance Demo</h1>
          <ComparisonBar />
          <div style={{ margin: '2rem' }}>
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
    </ApiDemoProvider>
  )
}

export default App
