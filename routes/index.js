const express = require('express')
const router = express.Router()

const pool = require('../db')

router.get('/', function (req, res) {
  res.render('index.njk', { 
    title: 'Hej Noel och te21',
    message: 'Välkommen till min kattadatabas'
  })
})

router.get('/dbtest', async function (req, res) {
  try {
    // const [cats] = await pool.promise().query('SELECT * FROM jens_cat')
    const [catsWithBreed] = await pool.promise().query(
      `SELECT jens_cat.*, jens_cat_breed.name as breed, jens_cat_breed.description
      FROM jens_cat 
      JOIN jens_cat_breed
      ON jens_cat.breed_id = jens_cat_breed.id`
    );
    console.log(catsWithBreed)
    return res.render('cats.njk', {
      title: 'Katter',
      cats: catsWithBreed
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/dbtest/:id', async function (req, res) {

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
