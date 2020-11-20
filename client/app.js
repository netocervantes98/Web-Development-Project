// Components
const HomeComponent = {
    render: () => {
        return `
        <nav class="navbar">
    <a class="navbar-brand" href="#">Susana verifica</a>
    <a class="nav-link" href="#">Log out</a>
  </nav>
  <div class="navbar-location">
    <span>Monterrey, Nuevo León</span>
    <span>30 de octubre de 2020</span>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-sm">
        <div class="card" style="width: 18rem;">
          <img src="tortillas.png" class="card-img-top" alt="...">
          <div class="card-img-overlay d-flex flex-column">
            <h3 class="card-title">Tortillas</h3>
          </div>
          <div class="card-body">
            <span class="card-text">+1.80%</span>
            <span class="card-text">$13.50</span>
          </div>
        </div>
      </div>
      <div class="col-sm">
        <div class="card" style="width: 18rem;">
          <img src="azucar.png" class="card-img-top" alt="...">
          <div class="card-img-overlay d-flex flex-column">
            <h3 class="card-title">Azucar</h3>
          </div>
          <div class="card-body">
            <span class="card-text">-1.50%</span>
            <span class="card-text">$30.2</span>
          </div>
        </div>
      </div>
      <div class="col-sm">
        <div class="card" style="width: 18rem;">
          <img src="tortillas.png" class="card-img-top" alt="...">
          <div class="card-img-overlay d-flex flex-column">
            <h3 class="card-title">Tortillas</h3>
          </div>
          <div class="card-body">
            <span class="card-text">+1.80%</span>
            <span class="card-text">$13.50</span>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    }
}

const Page1Component = {
    render: () => {
        return `
      <section>
        <h1>Page 1</h1>
        <p>This is just a test</p>
      </section>
    `;
    }
}

const Page2Component = {
    render: () => {
        return `
      <section>
        <h1>Page 2</h1>
        <p>This is just a test</p>
      </section>
    `;
    }
}

const ErrorComponent = {
    render: () => {
        return `
      <section>
        <h1>Error</h1>
        <p>This is just a test</p>
      </section>
    `;
    }
}

// Routes 
const routes = [
    { path: '/', component: HomeComponent, },
    { path: '/page1', component: Page1Component, },
    { path: '/page2', component: Page2Component, },
];

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;


const router = () => {
    // Find the component based on the current path
    console.log("component.render()")
    const path = parseLocation();
    // If there's no matching route, get the "Error" component
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
    // Render the component in the "app" placeholder
    document.getElementById('app').innerHTML = component.render();
};

