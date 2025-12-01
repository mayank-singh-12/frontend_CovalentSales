export default function Header({children="Covalent Sales"}) {
  return (
    <header>
      <nav className="navbar nav-bg shadow fixed-top">
        <div className="container-fluid">
          <span className="navbar-brand text-light">
            {children}
          </span>
        </div>
      </nav>
    </header>
  );
}
