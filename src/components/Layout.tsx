import Navbar from '../layout/Navbar';
import WelcomeModal from './WelcomeModal';
import CartModal from './CartModal';
import { useCart } from '../hooks/useCart';

export default function Layout({ children }) {
  const { addedProducts: cartItems } = useCart();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);

  return (
    <div>
      <Navbar />
      {isWelcomeModalOpen && <WelcomeModal onClose={() => setIsWelcomeModalOpen(false)} />}
      {children}
      {isCartModalOpen && (
        <CartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} cartItems={cartItems} />
      )}
    </div>
  );
}