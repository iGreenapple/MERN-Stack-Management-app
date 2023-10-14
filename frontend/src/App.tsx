import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import { RootLayout, Home, Dashboard, ProjectBoard} from './components'


import Test from './components/Test';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/project/:projectId' element={<ProjectBoard />} />
      <Route path='/test' element={<Test />} />
    </Route>
  )
);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    
  )
}

export default App
