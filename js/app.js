// Variables globales
const btnSearch = document.getElementById('btnSearch');
const imputSearch = document.getElementById('searchArtista');
let playlist = null;

btnSearch.addEventListener('click', () => {
    const artist = imputSearch.value;
    if (artist.trim().length > 0) {
        searchArtist(artist);
    }
});

const searchArtist = async (name) => {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${name}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b5e30799e9msh599e4d63e425c2bp1c8811jsn7e457496f486',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        // Mostrar resultados en la página
        const musicArtistDiv = document.querySelector('.musicaArtista');
        musicArtistDiv.innerHTML = ''; // Limpiar resultados anteriores

        // Mostrar resultados
        result.data.forEach(item => {
            const artistElement = document.createElement('div');
            artistElement.textContent = item.artist.name;
            musicArtistDiv.appendChild(artistElement);
        });

    } catch (error) {
        console.error('Error al buscar el artista:', error);
    }
};

