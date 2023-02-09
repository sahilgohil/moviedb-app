const watchlist = JSON.parse(localStorage.getItem('watchlist'))



function renderWatchList(){
    
    if(watchlist[0])
    { 
            document.getElementsByClassName('placeholder-div')[0].style.display = 'none'
    }
    else{
        document.getElementsByClassName('placeholder-div')[0].style.display = 'block'
    }
    
    let htmlString = ''
    watchlist.forEach((movie)=>{
         const {Title,Year,imdbID,Poster} = movie
                htmlString += `
                <section class="movie">
                        <img src="${Poster}" class='poster'>
                        <div>
                            <h2 class="movie-title">${Title}</h2>
                            <div class="w-btn-container">
                                <p class="movie-info " >116 min   Year: ${Year} </p>
                                <img data-imdb = '${imdbID}' src="img/remove.png" class="watchlist-btn"><p class="movie-info">Watchlist</p>
                            </div>
                            <p class="movie-syn">A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.</p>
                        </div>
                    </section>`
    })
    document.getElementById('movie-div').innerHTML = htmlString
}

document.addEventListener('click',(e)=>{
    if(e.target.dataset.imdb){
        watchlist.forEach((movie)=>{
            if(movie.imdbID === e.target.dataset.imdb)
            {
                watchlist.splice(watchlist.indexOf(movie),1)
                localStorage.setItem('watchlist',JSON.stringify(watchlist))
                
            }
           
        })
        console.log(watchlist.length)
        renderWatchList()
    }
})

renderWatchList()