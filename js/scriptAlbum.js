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

const queryString = window.location.search.slice(5, window.location.search.length);

const url = `https://api.spotify.com/v1/albums/${queryString}`;

const obtenerCancionesAlbum = async() =>{
    const token = localStorage.token;
    await fetch(url,{
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    }).then(async(resp)=>{
        const {images, tracks, name} = await resp.json();
        const nombre = `<h2 class="text-white text-center">${name}</h2>`
        document.getElementById("nombreAlbum").innerHTML = nombre;
        const urlImagen = images[2].url;
        let lista = '';
        tracks.items.forEach(async(cancion, idx)=>{
            const idCacnion = cancion.id;
            const urlCancion = `https://api.spotify.com/v1/tracks/${idCacnion}`;
            await fetch (urlCancion,{
                method: 'Get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                }}).then(async(resp) =>{
                    const {popularity} = await resp.json();
                    lista+=`
            <tr>
                            <td style='vertical-align: middle;'>${idx+1}</td>
                            <td><img class="rounded img-fluid" src="${urlImagen}" alt=""></td>
                            <td style='vertical-align: middle;'>${cancion.name}</td>
                            <td style='vertical-align: middle;'>${popularity}/100</td>
                            <td style='vertical-align: middle;'>${msToTime(cancion.duration_ms)}</td>
                        </tr>`
                })  
        })
        console.log(lista)
       setTimeout(() => {
        document.getElementById("cuerpoCanciones").innerHTML = lista;
       }, 1000);
    });
}
 const msToTime = (s) => {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    return  mins + ':' + secs;
  }
obtenerCancionesAlbum();