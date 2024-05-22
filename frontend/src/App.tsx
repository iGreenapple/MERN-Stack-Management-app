import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import { RootLayout, Home, Dashboard, ProjectBoard} from './components';

import About from './components/About.tsx';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark, faCheckSquare, faPen } from '@fortawesome/free-solid-svg-icons';

library.add(faXmark, faCheckSquare, faPen)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='project/:projectId' element={<ProjectBoard />} />
      <Route path='about' element={<About />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App