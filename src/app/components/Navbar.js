import Link from 'next/link';
import './Navbar.css';

const Navbar = () => {
  const userRole = "shopkeeper"
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">LabourEase</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            {/* Add other menu items here */}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link href="/register" className="nav-link signup-link">Sign-Up</Link>
            </li>
            <li className="nav-item">
            <Link href={userRole === 'shopkeeper' ? '/shopkeeper-profile' : '/employee-profile'} className="nav-link">
                  {userRole === 'shopkeeper' ? 'Shopkeeper Profile' : 'Employee Profile'}
                </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;