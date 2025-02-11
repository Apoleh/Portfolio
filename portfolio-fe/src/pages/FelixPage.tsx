import FelixList from '../features/FelixList';
import { NavBar } from '../components/NavBar';
import Footer from '../components/Footer';

export default function FelixPage(): JSX.Element {
  return (
    <div>
      <NavBar />
      <FelixList />
      <Footer />
    </div>
  );
}
