import Link from "next/link";

const Header = () => (
  <header className="bg-white shadow-sm">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-primary">
        Waving Store
      </Link>

      <nav className="flex items-center space-x-6">
        <Link href="/products" className="text-gray-700 hover:text-primary">
          Produtos
        </Link>
        <Link href="/cart" className="text-gray-700 hover:text-primary">
          Carrinho
        </Link>
        <Link href="/login" className="text-gray-700 hover:text-primary">
          Login
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
