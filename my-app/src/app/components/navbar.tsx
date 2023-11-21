// components/Navbar.tsx
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="text-white font-pacifico text-2xl">
            Chicago Overview
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/" className="text-white hover:text-purple-400 transition duration-300">
            Home
          </Link>
          <Link href="/querybuilder" className="text-white hover:text-purple-400 transition duration-300">
            Query Builder
          </Link>
          <Link href="/queryhub" className="text-white hover:text-purple-400 transition duration-300">
            Query Hub
          </Link>
        </div>
      </div>
    </div>
  </nav>

  );
};

export default Navbar;
