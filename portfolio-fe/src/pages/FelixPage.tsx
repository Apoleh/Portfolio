import FelixList from '../features/FelixList';
import { NavBar } from '../components/NavBar';

export default function FelixPage(): JSX.Element {
  return (
    <div>
      <NavBar />
      <FelixList />
    </div>
  );
}
