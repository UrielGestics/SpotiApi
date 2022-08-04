const queryString = window.location.search.slice(5, window.location.search.length);

const url = `https://api.spotify.com/v1/albums/${queryString}`;

validarToken();
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
                            <td style='vertical-align: middle;'>
                            <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${idCacnion}?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                            </td>
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
    if(mins < 10){
      mins = '0'+mins;
    }else{
      mins = mins;
    }
    if(secs < 10){
      secs = '0'+secs;
    }else{
      secs = secs;
    }
    return  mins + ':' + secs;
  }
obtenerCancionesAlbum();