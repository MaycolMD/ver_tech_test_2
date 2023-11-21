// components/Navbar.tsx
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-purple-700 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="text-white font-pacifico text-xl">
            Chicago Overview
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/" className="text-white">
              Home
            </Link>
            <Link href="/querybuilder" className="text-white">
              Query Builder
            </Link>
            <Link href="/queryhub" className="text-white">
              Query Hub
            </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
