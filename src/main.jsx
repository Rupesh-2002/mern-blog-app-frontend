import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/home/HomePage.jsx';
import ArticleDetailPage from './pages/article/ArticleDetailPage.jsx';
import {Provider} from 'react-redux'
import {store} from './store/store.js'
import RegisterPage from './pages/register/RegisterPage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import ArticleUpdatePage from './pages/article/ArticleUpdatePage.jsx';
import ArticleCreatePage from './pages/article/ArticleCreatePage.jsx';
import ArticlesPage from './pages/article/ArticlesPage.jsx';
import ProfilePicturePage from './pages/profile/ProfilePicturePage.jsx';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    children : [
      {
        path : '/',
        element : <HomePage />
      },
      {
        path : '/articles',
        element : <ArticlesPage />
      },
      {
        path : '/profilePicture',
        element : <ProfilePicturePage />
      },
      {
        path : '/blog/:slug',
        element : <ArticleDetailPage />
      },
      {
        path : '/blog/update/:slug',
        element : <ArticleUpdatePage />
      },
      {
        path : '/blog/create',
        element : <ArticleCreatePage />
      },
      {
        path : '/register',
        element : <RegisterPage />
      },
      {
        path : '/login',
        element : <LoginPage />
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  </StrictMode>,
)
