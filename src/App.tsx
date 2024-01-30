import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Suspense, lazy } from 'react';
import { RotatingLines } from 'react-loader-spinner';

import ProgressBar from './components/ProgressBar';
import './App.css';

const HomePage = lazy(() => import('./modules/home'));
const BlogPage = lazy(() => import('./modules/blog'));

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router>
        <Suspense
          fallback={
            <>
              <ProgressBar />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '80vh',
                }}
              >
                <RotatingLines
                  strokeColor="#2F1B72"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="96"
                  visible
                />
              </div>
            </>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog/:blogId" element={<BlogPage />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
