import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import { RootLayout, Home, Dashboard, ProjectMenu} from './components'


import Test from './components/Test';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      {/* <Route path='/project/:projectId' element={<ProjectMenu />} /> */}
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
