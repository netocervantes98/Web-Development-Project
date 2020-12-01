// Components
const HomeComponent = {
  loadJs: true,
  render: () => {
    return `
        <nav class="navbar">
    <a class="navbar-brand" href="#/home" onclick="reloadProducts();"">Susana verifica</a>
    <form class="form-inline">
    <input class="form-control mr-sm-2" id="FuzzySearch" type="search" placeholder="Producto" aria-label="Search">
    <button class="btn btn-light" type="button" onclick="showFuzzyResult()">Buscar</button>
  </form>
    <span style="display:flex; flex-direction:row;">
      <a class="nav-link" href="#/cart">Favoritos</a>
      <a class="nav-link" onclick="logOut()" href="#">Log out</a>
    </span>
  </nav>
  <div class="navbar-location">
    <span>Monterrey, Nuevo León</span>
    <span id="nav-date"></span>
  </div>

  <div class="container">
    <div class="row" id="items">
      
    </div>
  </div>
    `;
  },

  loadProducts: () => {
    axios.get(`http://localhost:3000/sample`).then(({ data: data }) => {
      const today = moment().locale('es').format('LL')
      console.log("Fecha:", today)
      let navDate = document.getElementById("nav-date")
      navDate.innerText = today
      const items = document.getElementById("items")
      data.forEach(element => items.insertAdjacentHTML('beforeend', template_function(element)))

    }).catch(catchable_handle_for_the_error_generico)
  }
}
// Components
const DetailsComponent = {
  loadJs: false,
  render: (nombre) => {
    return `
        <nav class="navbar">
    <a class="navbar-brand" href="#/home" onclick="reloadProducts();"">Susana verifica</a>
    <form class="form-inline">
    <input class="form-control mr-sm-2" id="FuzzySearch" type="search" placeholder="Producto" aria-label="Search">
    <button class="btn btn-light" type="button" onclick="showFuzzyResult()">Buscar</button>
  </form>
    <span style="display:flex; flex-direction:row;">
      <a class="nav-link" href="#/cart">Favoritos</a>
      <a class="nav-link" onclick="logOut()" href="#">Log out</a>
    </span>
  </nav>
  <div class="navbar-location">
    <span>Monterrey, Nuevo León</span>
    <span id="nav-date"></span>
  </div>

  <div id="detail-container">
    ${nombre}
  </div>
    `;
  },
  productDetails: async (name) => {
    return await axios.get(`http://localhost:3000/fecha?producto=${name}&yIni=2019&yFin=2020&mIni=1&mFin=10`)
      .then(({ data: products }) => {
        console.log(products);
        let a = products.map(x => x.Price)
        a.reverse()
        let b = products.map(x => x.Percentage)
        b.reverse()

        aviejo = a.slice(0, 12)
        anuevo = a.slice(12)
        bviejo = b.slice(0, 12)
        bnuevo = b.slice(12)

        return `
        <div class="container">
        <div class="row">
            <div class="col-sm">
            <img src="https://source.unsplash.com/featured/?${products[0].Name}" class="card-img-top" alt="...">
                <div class="card-img-overlay d-flex flex-column">
                    <h3 class="card-title">${products[0].Name}</h3>
                </div>
                <div class="card-body">
                    <span class="card-text">${products[0].Percentage}</span>
                    <span class="card-text">$${products[0].Price}</span>
                </div>
                <canvas id="myChart" style="margin-top: 50px; background:white"></canvas>
                <canvas id="myChart2" style="margin-top: 50px; background:white"></canvas>
            </div>
        </div>
      </div> 
  `
      })
  },
  renderChar: () => {
    var ctx = document.getElementById('myChart').getContext('2d');
    Chart.scaleService.updateScaleDefaults('linear', {
      ticks: {
        min: 0
      }
    })
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',
      // The data for our dataset
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        datasets: [{
          label: 'Precio (MXN)',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: aviejo
        }]
      },
      // Configuration options go here
      options: {}
    });

    var ctx = document.getElementById('myChart2').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',
      // The data for our dataset
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        datasets: [{
          label: 'Porcentaje de cambio',
          backgroundColor: 'rgb(200, 200, 150)',
          borderColor: 'rgb(200, 200, 150)',
          data: bviejo
        }]
      },
      // Configuration options go here
      options: {scales: {
        yAxes: [{
            display: true,
            ticks: {
                suggestedMin: -10,    // minimum will be 0, unless there is a lower value.
            }
        }]
    }}
    });
  }
}


const Login = {
  loadJs: false,
  render: () => {
    return `
        <nav class="navbar">
    <a class="navbar-brand" href="#">Susana verifica</a>
  </nav>
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
    <span style="display:flex; flex-direction:row;">
      <a class="nav-link" onclick="logOut()" href="#">Log out</a>
    </span>
  </nav>
  <div class="navbar-location">
    <span>Monterrey, Nuevo León</span>
    <span id="nav-date"></span>
  </div>

  <div class="container">
    <div class="row" id="items">
      
    </div>
  </div>
    `;
  },

  loadProducts: async () => {
    const today = moment().locale('es').format('LL')
    console.log("Fecha:", today)
    let navDate = document.getElementById("nav-date")
    navDate.innerText = today

    const data = await getFavs()
    //console.log("favs promise:", favs)

    const items = document.getElementById("items")
    data.forEach(element => items.insertAdjacentHTML('beforeend', template_function_sin_fav(element)))
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
  { path: '/details', component: DetailsComponent, },
];

const parseLocation = () => location.hash.slice(1) || '/';

const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || ((path.substr(0, 8) == "/details") ? { path: '/details', component: DetailsComponent, info: path.substr(9) } : undefined);


const router = async () => {
  // Find the component based on the current path
  console.log("component.render()")
  const path = parseLocation();
  // If there's no matching route, get the "Error" component
  const { component = ErrorComponent, info } = findComponentByPath(path, routes) || {};
  // Render the component in the "app" placeholder
  if (info) {
    document.getElementById('app').innerHTML = component.render(info);
    let container = document.getElementById("detail-container")
    container.innerHTML = await component.productDetails(info);
    component.renderChar();
  }
  else
    document.getElementById('app').innerHTML = component.render();
  if (component.loadJs) component.loadProducts()
};

const showFuzzyResult = () => {
  let search = document.getElementById("FuzzySearch").value;
  axios.get(`http://localhost:3000/producto`, { params: { nombre: search } }).then(({ data: data }) => {
    const items = document.getElementById("items")
    items.innerHTML = "";
    data.forEach(element => items.insertAdjacentHTML('beforeend', template_function(element)))
  }).catch(catchable_handle_for_the_error_generico)
}

const reloadProducts = () => {
  axios.get(`http://localhost:3000/sample`).then(({ data: data }) => {
    const today = moment().locale('es').format('LL')
    console.log("Fecha:", today)
    let navDate = document.getElementById("nav-date")
    navDate.innerText = today
    const items = document.getElementById("items")
    items.innerHTML = "";
    data.forEach(element => items.insertAdjacentHTML('beforeend', template_function(element)))

  }).catch(catchable_handle_for_the_error_generico)
}

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

const addItemToFav = (product) => {
  const info = {}
  info.product = product;
  info.token = localStorage.getItem('authToken');
  console.log("favorito agregado", info)
  axios.post(`http://localhost:3000/addFav`, info).then((res) => {
    if (!res.status) {
      console.log('Error in adding product to user');
    } else {
      alert("Alimento agregado a favoritos")
    }
  })
}

const getFavs = () => {
  const userToken = localStorage.getItem('authToken');
  return axios.get(`http://localhost:3000/getUserFavs`, { headers: { 'token': userToken } }).then((res) => {
    console.log("Favs:", res.data);
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


const template_function = ({ Name, Year, Month, Price, Percentage }) => {
  return `<div class="col-sm">
        <div class="card" style="width: 18rem;">
        <a href="#/details?${Name}">
          <img src="https://source.unsplash.com/featured/?${Name}" class="card-img-top" alt="...">
          <div class="card-img-overlay d-flex flex-column">
            <h3 class="card-title">${Name}</h3>
          </div>
          <div class="card-body">
            <span class="card-text">${Percentage}%</span>
            <span class="card-text">$${Price}</span>
          </div>
          </a>
        </div>
        <button type="button" style="width:40%;" class="btn btn-primary btn-block" onclick="addItemToFav('${Name}')">Favorito</button>
      </div>`
}

const template_function_sin_fav = ({ Name, Year, Month, Price, Percentage }) => {
  return `<div class="col-sm">
        <div class="card" style="width: 18rem;">
        <a href="#/details?${Name}">
          <img src="https://source.unsplash.com/featured/?${Name}" class="card-img-top" alt="...">
          <div class="card-img-overlay d-flex flex-column">
            <h3 class="card-title">${Name}</h3>
          </div>
          <div class="card-body">
            <span class="card-text">${Percentage}%</span>
            <span class="card-text">$${Price}</span>
          </div>
          </a>
        </div>
      </div>`
}

// Ya no se usa
/*
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
*/
