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
    <span>20 de noviembre de 2020</span>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-sm">
        <div class="card" style="width: 18rem;">
        <a href="#/details">
          <img src="https://source.unsplash.com/featured/?tortilla" class="card-img-top" alt="...">
          <div class="card-img-overlay d-flex flex-column">
            <h3 class="card-title">Tortillas</h3>
          </div>
          <div class="card-body">
            <span class="card-text">+1.80%</span>
            <span class="card-text">$13.50</span>
          </div>
          </a>
        </div>
      </div>
      <div class="col-sm">
        <div class="card" style="width: 18rem;">
        <a href="#/details">
          <img src="https://source.unsplash.com/featured/?azucar" class="card-img-top" alt="...">
          <div class="card-img-overlay d-flex flex-column">
            <h3 class="card-title">Azucar</h3>
          </div>
          <div class="card-body">
            <span class="card-text">-1.50%</span>
            <span class="card-text">$30.2</span>
          </div>
          </a>
        </div>
      </div>
      <div class="col-sm">
        <div class="card" style="width: 18rem;">
        <a href="#/details">
          <img src="https://source.unsplash.com/featured/?tortilla" class="card-img-top" alt="...">
          <div class="card-img-overlay d-flex flex-column">
            <h3 class="card-title">Tortillas</h3>
          </div>
          <div class="card-body">
            <span class="card-text">+1.80%</span>
            <span class="card-text">$13.50</span>
          </div>
          </a>
        </div>
      </div>
    </div>
  </div>
    `;
    }
}

const Login = {
    render: () => {
        return `
        <nav class="navbar">
    <a class="navbar-brand" href="#">Susana verifica</a>
  </nav>
  <div class="navbar-location">
    <span>Monterrey, Nuevo León</span>
    <span>20 de noviembre de 2020</span>
  </div>

      <div class="login-form">
    <form action="/login" method="post">
        <h2 class="text-center">Log in</h2>       
        <div class="form-group">
            <input type="text" class="form-control" name="email" placeholder="Username" required="required">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" name="password" placeholder="Password" required="required">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Log in</button>
        </div>      
    </form>
    <p class="text-center" ><a style="color:#f7f7f7" href="/#/regis">Create an Account</a></p>
</div>
    `;
    }
}

const Regis = {
    render: () => {
        return `
        <nav class="navbar">
    <a class="navbar-brand" href="#">Susana verifica</a>
  </nav>
  <div class="navbar-location">
    <span>Monterrey, Nuevo León</span>
    <span>20 de noviembre de 2020</span>
  </div>
      <div class="signup-form">
    <form action="/register" method="post">
		<h2>Register</h2>
		<p class="hint-text">Create your account. It's free and only takes a minute.</p>
        <div class="form-group">
			<div class="row">
				<div class="col-xs-6"><input type="text" class="form-control" name="nombre" placeholder="First Name" required="required"></div>
				<div class="col-xs-6"><input type="text" class="form-control" name="last_name" placeholder="Last Name" required="required"></div>
			</div>        	
        </div>
        <div class="form-group">
        	<input type="email" class="form-control" name="email" placeholder="Email" required="required">
        </div>
		<div class="form-group">
            <input type="password" class="form-control" name="password" placeholder="Password" required="required">
        </div>
		<div class="form-group">
            <input type="password" class="form-control" name="confirm_password" placeholder="Confirm Password" required="required">
        </div>        
        <div class="form-group">
			<label class="checkbox-inline"><input type="checkbox" required="required"> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
		</div>
		<div class="form-group">
            <button type="submit" class="btn btn-success btn-lg btn-block">Register Now</button>
        </div>
    </form>
	<div class="text-center">Already have an account? <a href="#">Sign in</a></div>
</div>
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
    { path: '/', component: Login, },
    { path: '/home', component: HomeComponent, },
    { path: '/regis', component: Regis, },
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
