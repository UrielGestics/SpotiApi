const url = 'https://api.spotify.com/v1/browse/new-releases';
const client_id = '10d3eb6c803441ca8bbba974216b85cc';
const client_secret = '2df55e113e8f43b4a7ea2b8c12f7e916';

const validarToken = async() =>{
  const fechaActual = new Date();
  if(localStorage.token){
    if(fechaActual > localStorage.dateExpired){
      var details = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret
    };
    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
     await fetch('https://accounts.spotify.com/api/token',{
        method: 'Post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then ( async (resp) =>  {
        var currentTime = new Date();
        const dateExpired = currentTime.setMinutes(currentTime.getMinutes() + 55);
        const {access_token} = await resp.json();
        localStorage.token = access_token;
        localStorage.DateCreate = currentTime;
        localStorage.dateExpired = dateExpired;
    });
    }else{
      return;
    }
  }else{
    
    var details = {
      'grant_type': 'client_credentials',
      'client_id': client_id,
      'client_secret': client_secret
  };
  
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
   await fetch('https://accounts.spotify.com/api/token',{
      method: 'Post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }).then ( async (resp) =>  {
      var currentTime = new Date();
      const dateExpired = currentTime.setMinutes(currentTime.getMinutes() + 55);
      const {access_token} = await resp.json();
      localStorage.token = access_token;
      localStorage.DateCreate = currentTime;
      localStorage.dateExpired = dateExpired;
  });
  }
  

}

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
            plantilla+= `<div class="albumSelecionado" data-id='${element.id}' class="col-md-3" >
            <div class="card h-100">
              <img height="400" src="${element.images[0].url}" class="card-img-top" alt="...">
              <div class="card-body">
                <h3 class="card-title text-center">${album}</h3>
               ${artistasNombres}
              </div>
            </div>
          </div>`;
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
