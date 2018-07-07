const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const axios = require('axios')

const my_server = express()

my_server.use(logger('dev'))

my_server.set('view engine', 'ejs')
my_server.use(express.static('views'))
my_server.set('views', __dirname+'/views')

my_server.use(bodyParser.json())
my_server.use(bodyParser.urlencoded({ extended: false}))

my_server.get('/', (request, response) => {
    // response.send('<h1>Hola, good work so far!</h1>')
    response.render('index.ejs')
})


// had to update node by typing in nvm install 10.6.0 (the version)
// no fetch() in server side apps? must use npm install --save axios
// axios.get axios.post


my_server.post('/results', (request, response) => {
    console.log(request.body.searchQ)
    const keyword = request.body.searchQ
    
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&key=AIzaSyC9XbOjIglj8HSgR3jVwvK6q49Z9RnFfrU`)
    .then( res => res.data )
    .then( data => {
        let allBooks = data.items
        // console.log(allBooks[0].volumeInfo.title)
        let oneBook = allBooks[0].volumeInfo.title        
        response.render('results.ejs', {info: allBooks})       
    })
    .catch( err => console.log(err))
    
    // axios package already includes json parser inside! no need for .json()
    
    // async function sendApiRequest(searchQuery){
    //     let rep = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=AIzaSyC9XbOjIglj8HSgR3jVwvK6q49Z9RnFfrU`)
    //     // console.log(rep)
    //     // console.log(rep.data.items)
    //     let allBooks = await rep.data.items
    //     console.log(allBooks[0].volumeInfo.imageLinks.thumbnail)
    //     return allBooks[0].volumeInfo.imageLinks.thumbnail
        
    //     // console.log(rep.data.items[0].volumeInfo.description)
        
    //     // let rep2 = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=sherman+alexie&key=AIzaSyC9XbOjIglj8HSgR3jVwvK6q49Z9RnFfrU`)
    //     // console.log(rep2)
        
    //     // let books = await rep.json()
    //     // console.log(books)
        
    //     // let apiData = await rep.json()
    //     // console.log(apiData)
    // }
    
    // sendApiRequest(keyword)
    
    // let oneBook = sendApiRequest(keyword)
    // console.log(oneBook)
    
    
    // console.log(sendApiRequest(keyword))
    // let bookArray = sendApiRequest(keyword)
    // console.log(bookArray[1].volumeInfo.title)
    
    // let title = bookArray.volumeInfo.title
    
    
    // async function sendApiRequest(searchQuery) {
    //     let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=AIzaSyC9XbOjIglj8HSgR3jVwvK6q49Z9RnFfrU`)
    //     console.log(response)
        
    //     let apiData = await response.json()
    //     console.log(apiData)
    // }
    
    // response.send(`<h1>So far your results page works... Try reading </h1>`)
    // response.render('results.ejs', {picture: oneBook})
})

const port = process.env.PORT || 8080

my_server.listen(port, () => {
    console.log('app running on port ' +port)
})