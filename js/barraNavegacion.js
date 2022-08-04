const valorBusqueda = document.getElementById("barraNav").dataset.pag;
let opcionBuscar = '';
if(valorBusqueda == 'buscar'){
  opcionBuscar = `<a class="nav-link active" href="buscar.html">Buscar</a>`;
  opcionInicio = `<a class="nav-link" aria-current="page" href="index.html">Inicio</a>`;
}else{
  opcionBuscar = `<a class="nav-link" href="buscar.html">Buscar</a>`;
  opcionInicio = `<a class="nav-link active" aria-current="page" href="index.html">Inicio</a>`;
}

const barra = `<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href=""><img src="img/logo.png" width="30" height="30" alt=""></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            ${opcionInicio}
          </li>
          <li class="nav-item">
            ${opcionBuscar}
          </li>
         </ul>
      </div>
    </div>
</nav>
<div  style=" width: 100%; height: 2px; background-color:#1ED760"></div>
`;

document.getElementById("barraNav").innerHTML = barra;