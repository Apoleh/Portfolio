import { NavBar } from '../components/NavBar';
import AddComment from '../features/AddComment';

export default function AddProjectPage(): JSX.Element {
  return (
    <div>
      <NavBar />
      <AddComment />
    </div>
  );
}
