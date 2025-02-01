import ZakoList from '../features/ZakoList';
import { NavBar } from '../components/NavBar';

export default function ZakoPage(): JSX.Element {
  return (
    <div>
      <NavBar />
      <ZakoList />
    </div>
  );
}
