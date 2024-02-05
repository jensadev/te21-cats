const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome' })
})

router.get('/search', function (req, res) {
  console.log(req.query.q)
  // then use searchQuery in SQL
  // should filter to check so its only letters and numbers
  /*
  SELECT * FROM jens_movie_director
  JOIN jens_movie ON jens_movie_director.movie_id = jens_movie.id
  JOIN jens_director ON jens_movie_director.director_id = jens_director.id
  WHERE jens_movie.title LIKE "%QUERY%";
*/

  let query = req.query.q
  query = query.replace(/[^a-zA-Z0-9]/g, '')

  res.render('search.njk', { title: 'Search', query: query })
})

module.exports = router
