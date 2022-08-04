validarToken();

const obtenerResultadoBusqueda = async(q) =>{
    const url = `https://api.spotify.com/v1/search?type=album&include_external=audio&q=${q}`;
    const token = localStorage.token;
    await fetch(url,{
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    }).then(async(resp) =>{
        let resultadosBusqueda = '';
        let artistasNombres = '';
        const {albums} = await resp.json();
        albums.items.forEach((element) => {
            element.artists.forEach(artista => {
                artistasNombres+='<label class="card-text me-3"><span class="badge bg-primary">'+artista.name+'</span></label>'
            });

            resultadosBusqueda+= `<div onclick="ejemplo('${element.id}')" data-id="${element.id}" class="albumSelecionado"  class="col-md-3" >
            <div class="card h-100">
              <img height="400" src="${element.images[0].url}" class="card-img-top" alt="...">
              <div class="card-body">
                <h3 class="card-title text-center">${element.name}</h3>
               ${artistasNombres}
              </div>
            </div>
          </div>`;
        });
        if(albums.items.length == 0){
            document.getElementById("resultadosEncontrados").innerHTML = '';
            document.getElementById("mensajes").innerHTML = `
            <center><div class="alert alert-danger col" role="alert">
            No se encontraron resultados de <strong>${q}</strong>
          </div></center>`
        }else{
            document.getElementById("mensajes").innerHTML = `<p class="text-white">Resultados de la busqueda: <strong>${q}</strong></p>`
                document.getElementById("resultadosEncontrados").innerHTML = resultadosBusqueda;
                document.getElementById("inputBusqueda").value = '';
        }
    })
}

const texto = document.getElementById("inputBusqueda");

texto.addEventListener("keypress", ({key})=>{
    const valor = texto.value;
    if(key == 'Enter'){
        if(valor == ''){
            Swal.fire(
                'Error',
                'Nesecitas escribir algo para empezar una busqueda',
                'error'
              )
        }else{
            obtenerResultadoBusqueda(valor);
           
        }
    }else{
        return;
    }
})

function ejemplo(id){
    window.open("album.html?alb="+id, '_blank').focus();
}

