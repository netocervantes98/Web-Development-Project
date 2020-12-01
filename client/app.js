// Components
const HomeComponent = {
  loadJs: true,
  render: () => {
    return `
        <nav class="navbar">
    <a class="navbar-brand" href="#/home">Susana verifica</a>
    <span style="display:flex; flex-direction:row;">
      <a class="nav-link" href="#/Cart">Favoritos</a>
      <a class="nav-link" onclick="logOut()" href="#">Log out</a>
    </span>
  </nav>
  <div class="navbar-location">
    <span>Monterrey, Nuevo León</span>
    <span>20 de noviembre de 2020</span>
  </div>

  <div class="container">
    <div class="row" id="items">
      
    </div>
  </div>
    `;
  },
  
  fun: () => {
    axios.get(`http://localhost:3000/sample`).then(({data: data}) => {
      console.log("sí jala")
      const items = document.getElementById("items")
      data.forEach(element => items.insertAdjacentHTML('beforeend', template_function(element)))
      
    }).catch(catchable_handle_for_the_error_generico)
  }
}

    
const Login = {
  loadJs: false,
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
    <form>
    <h2 class="text-center">Log in</h2>       
    <div class="form-group">
        <input type="text" class="form-control" name="email" placeholder="Username" required="required" id="email">
    </div>
    <div class="form-group">
        <input type="password" class="form-control" name="password" placeholder="Password" required="required" id="password">
    </div>
    <div class="form-group">
            <button type="button" class="btn btn-primary btn-block" onclick="checkUser()">Log in</button>
    </div>      
</form >
    <p class="text-center" ><a style="color:#f7f7f7" href="/#/regis">Create an Account</a></p>
</div>
    `;
  }
}

const Regis = {
  loadJs: false,
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
    <form>
		<h2>Register</h2>
		<p class="hint-text">Create your account. It's free and only takes a minute.</p>
        <div class="form-group">
			<div class="row">
				<div class="col-xs-6"><input type="text" class="form-control" id="nombre" placeholder="First Name" required="required"></div>
				<div class="col-xs-6"><input type="text" class="form-control" id="last_name" placeholder="Last Name" required="required"></div>
			</div>        	
        </div>
        <div class="form-group">
        	<input type="email" class="form-control" id="email" placeholder="Email" required="required">
        </div>
		<div class="form-group">
            <input type="password" class="form-control" id="password" placeholder="Password" required="required">
        </div>
		<div class="form-group">
            <input type="password" class="form-control" id="confirm_password" placeholder="Confirm Password" required="required">
        </div>        
        <div class="form-group">
			<label class="checkbox-inline"><input type="checkbox" required="required"> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
		</div>
		<div class="form-group">
            <button type="button" class="btn btn-success btn-lg btn-block" onclick="register()">Register Now</button>
        </div>
    </form>
	<div class="text-center">Already have an account? <a href="#">Sign in</a></div>
</div>
    `;
  }
}

const Cart = {
  loadJs: true,
  render: () => {
    return `
    <nav class="navbar">
      <a class="navbar-brand" href="#/home">Susana verifica</a>
      <a class="nav-link" href="#">Log out</a>
    </nav>
    <div class="container">
        <ul class="list-group" id="fav-list" style="list-style-type:none;"></ul>
      </div>
    `;
  },
  
  fun: async () => {
    const favs = await getFavs()
    console.log("favs promise:", favs)

    let favList = document.getElementById("fav-list")

    for (const fav in favs) {
      console.log("It:",favs[fav])
      favList.innerHTML += (template_cart_item(favs[fav]))
    }    
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
  { path: '/cart', component: Cart, },
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
  if(component.loadJs) component.fun()
};

const checkUser = () => {
  const info = {}
  info.email = document.getElementById("email").value
  info.password = document.getElementById("password").value

  axios.post(`http://localhost:3000/login`, info).then((res) => {
    if (res.status) {
      localStorage.setItem('authToken', res.data.token);
      window.location.href = "http://127.0.0.1:3001/#/home";
    } else {
      console.log("Error")
    }
  }).catch(catchable_handle_for_the_error_generico)
}

const addItemToFav = () => {
  const info = {}
  info.product = 'Zanahoria';
  info.token = localStorage.getItem('authToken');
  axios.post(`http://localhost:3000/addFav`, info).then((res) => {
    if (!res.status) {
      console.log('Error in adding product to user');
    }
  })
}

const getFavs = () => {
  const userToken = localStorage.getItem('authToken');
  return axios.get(`http://localhost:3000/getUserFavs`, {headers: {'token': userToken}}).then( (res) => {
      console.log("Favs:",res.data);
      return res.data
  }).catch((err) => {
    return err
  })
}

const logOut = () => {
  localStorage.removeItem('authToken');
}

const register = () => {
  const info = {}
  info.nombre = document.getElementById("nombre").value + " " + document.getElementById("last_name").value
  info.email = document.getElementById("email").value
  info.password = document.getElementById("password").value

  axios.post(`http://localhost:3000/register`, info).then((data) => {
    if (data.status) {
      window.location.href = "http://127.0.0.1:3001/#/home";
    } else {
      console.log("Error")
    }
  }).catch(catchable_handle_for_the_error_generico)
}

const catchable_handle_for_the_error_generico = (err) => {
  console.error(err)
  // document.getElementById("error").innerText = "\nError."
}


const template_function = ({Name, Year, Month, Price, Percentage}) => {
  return `<div class="col-sm">
        <div class="card" style="width: 18rem;">
        <a href="#/details?${Name}">
          <img src="https://source.unsplash.com/featured/?${Name}" class="card-img-top" alt="...">
          <div class="card-img-overlay d-flex flex-column">
            <h3 class="card-title">${Name}</h3>
          </div>
          <div class="card-body">
            <span class="card-text">${Percentage}%</span>
            <span class="card-text">${Price}</span>
          </div>
          </a>
        </div>
      </div>`
}

const template_cart_item = ({Name}) => {
  return `
  <li class="cart-element">
    <div class="media">
        <img src="https://source.unsplash.com/featured/?${Name}" class="align-self-start mr-3" alt="...">
        <div class="media-body">
          <h4 class="mt-0">${Name}</h4>
        </div>
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
    </div>
  </li>
  `
}
