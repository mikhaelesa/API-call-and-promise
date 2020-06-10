const OMDB_API_KEY = 'http://www.omdbapi.com/?apikey=33b0104&'
$('.input-keyword').on('keypress', function(e){
    if(e.which === 13)
        $('.search-button').click()
})
$('.search-button').on('click', () =>{
    fetch(OMDB_API_KEY + `s=${$('.input-keyword').val()}`)
    .then(response => response.json())
    .then(response => {
        let movies = response.Search
        let cards = ''
        movies.forEach(m => {
            cards += showCards(m)
        })
        document.querySelector('.movie-container').innerHTML = cards
        const detailButton = document.querySelectorAll('.modal-detail-button')
        detailButton.forEach(el => {
            el.addEventListener('click', e => {
                fetch(OMDB_API_KEY + `i=${e.target.dataset.imdbid}`)
                .then(response => response.json())
                .then(response => {
                    let movieDetail = showDetail(response)
                    document.querySelector('.modal-body').innerHTML = movieDetail
                })
            })
        })
    })
    .catch(() => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cannot find movie',
      }))
})
function showCards(m){
    return `<div class="col-md-4 my-3">
    <div class="card">
        <img src="${m.Poster}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a class="btn btn-primary modal-detail-button"
          data-toggle="modal" 
          data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Details</a>
        </div>
    </div>
</div>`
}
function showDetail(m){
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item">
                    <strong>${m.Title} ${m.Year}</strong>
                </li>
                <li class="list-group-item">
                    <strong>Director :</strong>
                    ${m.Director}
                </li>
                <li class="list-group-item">
                    <strong>Actors :</strong>
                    ${m.Actors}
                </li>
                <li class="list-group-item">
                    <strong>Writer :</strong>
                    ${m.Writer}
                </li>
                <li class="list-group-item">
                    <strong>Plot :</strong>
                    ${m.Plot}
                </li>
              </ul>
        </div>
    </div>
</div>`
}