export default function Header({children="Covalent Sales"}) {
  return (
    <header>
      <nav class="navbar nav-bg shadow fixed-top">
        <div class="container-fluid">
          <span class="navbar-brand text-light">
            {children}
          </span>
        </div>
      </nav>
    </header>
  );
}
