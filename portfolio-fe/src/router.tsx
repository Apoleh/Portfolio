import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PathRoutes } from './path.routes';
import HomePage from './pages/HomePage';
import FelixPage from './pages/FelixPage';
import ProjectPage from './pages/ProjectPage';
import AddProjectPage from './pages/AddProjectPage';
import UpdateProjectPage from './pages/UpdateProjectPage';
import CallbackPage from './pages/CallBackPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import CommentsPage from './pages/CommentsPage';
import AddCommentsPage from './pages/AddCommentsPage';
import UpdateFelixPage from './pages/UpdateFelixPage';
import ContactPage from './pages/ContactPage';
const router = createBrowserRouter([
  {
    path: PathRoutes.Default, // Path for "/"
    element: <Navigate to={PathRoutes.HomePage} replace />,
  },
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
  {
    path: PathRoutes.CommentsPage,
    element: <CommentsPage />,
  },
  {
    path: PathRoutes.AddCommentsPage,
    element: <AddCommentsPage />,
  },
  {
    path: PathRoutes.UpdateFelixpage,
    element: <UpdateFelixPage />,
  },
  {
    path: PathRoutes.ContactPage,
    element: <ContactPage />,
  },
]);

export default router;
