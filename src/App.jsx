
import './App.css'
import { Body } from './components/Body'
import Login from './components/Login'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './components/Profile'
import { Provider } from 'react-redux'
import appStore from './utills/appStore'
import Feed from './components/Feed'
import Connections from './components/Connections'
import Requests from './components/Requests'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './components/LandingPage'
import { PublicRoute, PrivateRoute } from './components/ProtectedRoutes';
import { Navigate } from 'react-router-dom'
import Premium from './components/Premium'



function App() {


  return (
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path='/' element={<Body />} >
            <Route element={<PublicRoute />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Login />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path='/feed' element={

                <Feed />

              } />
              <Route path='/profile' element={

                <Profile />

              } />
              <Route path='/connections' element={

                <Connections />

              } />
              <Route path='/requests' element={

                <Requests />

              } />
              <Route path='/premium' element={

                <Premium />

              } />
            </Route>


            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
