const express = require('express')
const router = express.Router()

const pool = require('../db')

router.get('/', function (req, res) {
  res.render('index.njk', { 
    title: 'Hej Noel och te21',
    message: 'Välkommen till min kattadatabas'
  })
})

// jag kan nu byta namn på routen till /cats istället för dbtest
router.get('/cats', async function (req, res) {
  try {
    const [catsWithBreed] = await pool.promise().query(
      `SELECT jens_cat.*, jens_cat_breed.name as breed, jens_cat_breed.description
      FROM jens_cat 
      JOIN jens_cat_breed
      ON jens_cat.breed_id = jens_cat_breed.id`
    );
    return res.render('cats.njk', {
      title: 'Katter',
      cats: catsWithBreed
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

// för att hämta en katt så är namnet på route fortfarande cats, men vi lägger till /:id
// detta indikerar då att vi väljer en specifik katt
router.get('/cats/:id', async function (req, res) {
  try {
    const [catsWithBreed] = await pool.promise().query(
      `SELECT jens_cat.*, jens_cat_breed.name as breed, jens_cat_breed.description
      FROM jens_cat 
      JOIN jens_cat_breed
      ON jens_cat.breed_id = jens_cat_breed.id
      WHERE jens_cat.id = ?`, [req.params.id]
    );
    // jag måste ange att jag vill ha första elementet i arrayen,
    // annars får jag en array med en katt
    return res.render('cat.njk', {
      title: 'Katt',
      cat: catsWithBreed[0]
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
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
