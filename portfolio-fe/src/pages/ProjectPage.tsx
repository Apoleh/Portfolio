import Footer from '../components/Footer';
import { NavBar } from '../components/NavBar';
import ProjectList from '../features/ProjectList';

export default function ProjectPage(): JSX.Element {
  return (
    <div>
      <NavBar />
      <ProjectList />
      <Footer />
    </div>
  );
}
