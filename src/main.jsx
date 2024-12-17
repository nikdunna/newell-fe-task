import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PostList from './components/PostList'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostList />
  </StrictMode>,
)
