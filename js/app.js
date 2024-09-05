const btnSearch = document.getElementById('btnSearch')
const inputSearch = document.getElementById('serchArtist')
let playlist=null
let tracks = null

btnSearch.addEventListener('click', () => {
    const artist = inputSearch.value
    if (artist.trim().length > 0) {
        searchArtist(artist)
    }
})


const searchArtist = async(name) =>{
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${name}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '88b72ec71amshba0145b99483e5fp1fddefjsn20fd41560897',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result && result.data && result.data.length >0  && result.data[0].artist) {
            loadArtist(result.data[0].artist.id)
        }

        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

const loadArtist= async (id) =>{
    const url = `https://deezerdevs-deezer.p.rapidapi.com/artist/${id}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '88b72ec71amshba0145b99483e5fp1fddefjsn20fd41560897',
		'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    if (result) {
        loadArtistData(result)
    }
	console.log(result);
} catch (error) {
	console.error(error);
}
}
const loadArtistData = async(info) =>{
    console.log('info = >',info)
    const img = document.querySelector('.imagen')
    const tituloArtista = document.querySelector('.tituloArtista')
    const descripcionArtista = document.querySelector('.descripcionArtista')
    
    const urlTracks = info.tracklist
    const canciones = await fetch(urlTracks)
    tracks = await canciones.json()
    tituloArtista.textContent = ''
    tituloArtista.textContent = info.name
    descripcionArtista.textContent= ''
    descripcionArtista.textContent = `Este Artista tiene ${info.nb_album} albums y ${info.nb_fan} fanses`
    img.setAttribute('src',info.picture_medium)
    if (tracks) {
        dibujarRenglones(tracks)
    }
    console.log('canciones = >',tracks)
    
}
const dibujarRenglones = (canciones) =>{
    const templateRenglon = document.getElementById('templateMusica').content
    const fragment = document.createDocumentFragment()  
    const musica = document.querySelector('.musicaBusqueda') 
    
    musica.innerHTML= ''
    canciones.data.forEach((track) => {
      const clone = templateRenglon.cloneNode(true)
      clone.querySelector('.tituloCancion').textContent = ' '
      clone.querySelector('.tituloCancion').textContent = track.title || 'N/A'
      clone.querySelector('.albumCancion').textContent = ' '
      clone.querySelector('.albumCancion').textContent = track.album.title || 'N/A'
      clone.querySelector('.duracionCancion').textContent = formatTime(track.duration) 
      clone.querySelector('.imgCancion > img').setAttribute('src',track.album.cover_small)
      fragment.appendChild(clone)

    })
    musica.appendChild(fragment)
}
const formatTime = (seconds) =>{
    if (seconds <0 ) {
        return'00 : 00'
    }
    const minutes = Math.floor(seconds/60)
    const secs = seconds % 60

    const formatMins = String(minutes).padStart(2,'0')
    const formatsecs = String(secs).padStart(2,'0')

    return `${formatMins} : ${formatsecs}`

}