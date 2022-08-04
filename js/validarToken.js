const client_id = '10d3eb6c803441ca8bbba974216b85cc';
const client_secret = '2df55e113e8f43b4a7ea2b8c12f7e916';

const crearToken = async()=>{
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


const validarToken = async() =>{
    const fechaActual = new Date();
    if(localStorage.token){
      if(fechaActual > localStorage.dateExpired){
        crearToken();
      }else{
        return;
      }
    }else{
        crearToken();
    }
    
  
  }