// base url = http://www.omdbapi.com/?i=tt3896198&apikey=91035278


// fetch('https://www.omdbapi.com/?apikey=91035278&s=avenger', {method: 'GET'})
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
const searchBtn = document.getElementById('search-btn')
const input = document.getElementById('movie')
let fullUrl =''
let searchedData = []
const watchlist = []

document.addEventListener('click',(e)=>{
    if(e.target.dataset.imdb){
        searchedData.forEach((movie)=>{
            if(movie.imdbID === e.target.dataset.imdb && !watchlist.includes(movie))
            {
                console.log('movie added to the watchlist')
                watchlist.unshift(movie)
            }
           
        })
       localStorage.setItem('watchlist',JSON.stringify(watchlist))  
       
    }
        
    
})

searchBtn.addEventListener('click',()=>{
    
    input.value ? fullUrl =`https://www.omdbapi.com/?apikey=91035278&s=${input.value}` : console.log('No input')
    if(fullUrl)
    {
        document.getElementsByClassName('placeholder-div')[0].style.display = 'none'
        render()
        
    }
    
    
})


function render()
{
    fetch(fullUrl, {method: 'GET'})
        .then(response => response.json())
        .then(data => 
        {
            searchedData = data.Search
            let movieString = ''
            data.Search.forEach((movie) =>
            {
                const {Title,Year,imdbID,Poster} = movie
                movieString += `
                <section class="movie">
                        <img src="${Poster}" class='poster'>
                        <div>
                            <h2 class="movie-title">${Title}</h2>
                            <div class="w-btn-container">
                                <p class="movie-info " >116 min   Year: ${Year} </p>
                                <img data-imdb = '${imdbID}' src="img/button.png" class="watchlist-btn"><p class="movie-info">Watchlist</p>
                            </div>
                            <p class="movie-syn">A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.</p>
                        </div>
                    </section>`
            })
            document.getElementById('movie-div').innerHTML = movieString
        }
        )
        .catch(err => console.error(err));
}
