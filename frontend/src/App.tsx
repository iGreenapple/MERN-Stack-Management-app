import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";

import { RootLayout, Home, Dashboard, ProjectBoard, About } from './components';

import { UserProvider } from "./context/UserContext";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark, faCheckSquare, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faXmark, faCheckSquare, faChevronRight, faChevronLeft)

const PrivateRoute = ({ element }: { element: React.ReactElement}) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? element : <Navigate to='/' />;
}

// const token = localStorage.getItem('token')
//   console.log(token);

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route 
          path='/dashboard' 
          element={<PrivateRoute element={<Dashboard />}/>}
        />
        <Route 
          path='/project/:projectId'
          element={<PrivateRoute element={<ProjectBoard />}/>} 
        />
        <Route path='/about' element={<About />} />
      </Route>
  )
);



const App = () => {
  
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App