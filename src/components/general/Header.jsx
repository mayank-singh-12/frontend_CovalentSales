export default function Header({children="Covalent Sales"}) {
  return (
    <header>
      <nav class="navbar nav-bg shadow fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand nav-brand-text " href="#">
            {children}
          </a>
        </div>
      </nav>
    </header>
  );
}
