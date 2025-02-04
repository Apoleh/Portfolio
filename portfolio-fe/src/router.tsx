import { createBrowserRouter } from 'react-router-dom';
import { PathRoutes } from './path.routes';
import HomePage from './pages/HomePage';
import FelixPage from './pages/FelixPage';
import ProjectPage from './pages/ProjectPage';
import AddProjectPage from './pages/AddProjectPage';
import UpdateProjectPage from './pages/UpdateProjectPage';
import CallbackPage from './pages/CallBackPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
const router = createBrowserRouter([
  {
    path: PathRoutes.HomePage,
    element: <HomePage />,
  },
  {
    path: PathRoutes.FelixPage,
    element: <FelixPage />,
  },

  {
    path: PathRoutes.ProjectPage,
    element: <ProjectPage />,
  },
  
  {
    path: PathRoutes.AddProjectPage,
    element: <AddProjectPage />,
  },
  {
    path: PathRoutes.UpdateProjectPage,
    element: <UpdateProjectPage />,
  },
  {
    path: PathRoutes.Callback,
    element: <CallbackPage />,
  },
  {
    path: PathRoutes.ProjectDetailsPage,
    element: <ProjectDetailsPage />,
  },
]);

export default router;
