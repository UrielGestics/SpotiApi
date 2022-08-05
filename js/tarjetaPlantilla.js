const crearTarjeta = (id,imagen,nombre, artistas) =>{
    return `<div onclick="ejemplo('${id}')" data-id="${id}" class="albumSelecionado"  class="col-md-3" >
    <div class="card h-100">
      <img height="400" src="${imagen}" class="card-img-top" alt="...">
      <div class="card-body">
        <h3 class="card-title text-center">${nombre}</h3>
       ${artistas}
      </div>
    </div>
  </div>`
}