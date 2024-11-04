import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate } from "react-router-dom";

import { RootLayout, Home, Dashboard, ProjectBoard, About } from "./components";

import { UserProvider } from "./contexts/UserContext";
import { AuthProvider } from "./contexts/AuthContext";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark, faCheckSquare, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { ProjectsProvider } from "./contexts/ProjectsContext";
import { ModalProvider } from "./contexts/ModalContext";

library.add(faXmark, faCheckSquare, faChevronRight, faChevronLeft);

// const PrivateRoute = ({ element }: { element: React.ReactElement }) => {
//   const isAuthenticated = !!localStorage.getItem("token");
//   return isAuthenticated ? element : <Navigate to="/" />;
// };

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/project/:projectId" element={<ProjectBoard />} />
      <Route path="/about" element={<About />} />
    </Route>
  )
);

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <ProjectsProvider>
          <ModalProvider>
            <RouterProvider router={router} />
          </ModalProvider>
        </ProjectsProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
