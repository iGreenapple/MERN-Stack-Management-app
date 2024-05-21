import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import { RootLayout, Home, Dashboard, ProjectBoard} from './components';

import Test from './components/Test';
// import pro FontAwesome → library představuje knihovnu, do které si načteme potřebné symboly a poté je můžete použít napříč projektem
import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

library.add(faXmark, faCheckSquare)

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
      <RouterProvider router={router} />
  )
}

export default App