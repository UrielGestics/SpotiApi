const url = 'https://api.spotify.com/v1/browse/new-releases';

validarToken();

const CargarPreLoad = () =>{
    let cargando = '';

    for(let i=0; i<8; i++){
        cargando+=`<div class="col-md-3">
        <div class="card h-100 " aria-hidden="true">
            <img src="img/cargando.gif" height="400" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text placeholder-glow">
                <span class="placeholder col-12"></span>
              </p>
              <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-3"></a>
              <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-3"></a>
              <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-3"></a>
            </div>
          </div>
        </div>`
    }
    document.getElementById("albunes").innerHTML = cargando;
}

const obtenerAlbunes = async () =>{
  const token = localStorage.token;
     await fetch(url,{
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    }).then ( async (albumnes) =>  {
        const {albums} = await albumnes.json();
        const arregloCategorias = albums.items;
       
        let plantilla = ``;
        arregloCategorias.forEach(element => {
            let album = element.name;
            const artistas = element.artists;
           
            let artistasNombres = '<center>';
            
            artistas.forEach(artista => {
                artistasNombres+='<label class="card-text me-3"><span class="badge bg-primary">'+artista.name+'</span></label>'
            });
            artistasNombres+='</center>'
            plantilla+= crearTarjeta(element.id,element.images[0].url,element.name,artistasNombres);
        });
       
        document.getElementById("albunes").innerHTML = plantilla;

    });
}


setTimeout(() => {
  const cards = document.getElementsByClassName("albumSelecionado");
  Array.prototype.forEach.call(cards, function(card) {
    card.addEventListener("click", function(){
      const id = card.dataset.id;
      window.location.href = "album.html?alb="+id;
    });
  });
  
}, 2000);




CargarPreLoad();
setTimeout(() => {
    obtenerAlbunes();
}, 1000);
