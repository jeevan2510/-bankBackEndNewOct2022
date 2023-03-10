//import express  inside index.js
const express = require('express')
//impoprt cors in index.js
const cors = require('cors')
//import dataservice
const dataService = require('./services/dataService')
//import jsonwebtoken
const jwt = require('jsonwebtoken')
//create server app using express
const server = express()
//use cors to define orgin
server.use(cors({
    origin: 'http://localhost:4200'
}))
//to parse json data
server.use(express.json())
//set up port for server app
server.listen(3000, () => {
    console.log('server started at 3000');
})
//aplication specific middleware
const appMiddleware = (req, res, next) => {
    console.log('inside application specific Middlewar')
    next()
}
server.use(appMiddleware)
//bankapp frontend request resolving

//token verify middleware
const jwtMiddleware = (req, res, next) => {
    console.log('inside router spewcific Middlewar')
    //get token from req heddres
    const token = req.headers['access-token']
    try {
        //verufy token
        const data = jwt.verify(token, 'supersecretkey123')
        console.log(data);
        req.fromAcno = data.currentAcno
        console.log('valid token');
        next()

    }
    catch {
        console.log('invalid token');
        res.status(401).json({
            message: 'please login!!'
        })

    }
}
//register api call
server.post('/register', (req, res) => {
    console.log('inside register api');
    console.log(req.body);
    //asynchronus
    dataService.register(req.body.uname, req.body.acno, req.body.pswd)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })

})

//login api call
server.post('/login', (req, res) => {
    console.log('inside login api');
    console.log(req.body);
    //asynchronus
    dataService.login(req.body.acno, req.body.pswd)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })

})
//getbalance
server.get('/getBalance/:acno', jwtMiddleware, (req, res) => {
    console.log('inside getBalance api');
    console.log(req.params.acno);
    //asynchronus
    dataService.getBalance(req.params.acno)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })

})
//deposit
server.post('/deposit', jwtMiddleware, (req, res) => {
    console.log('inside deposit api');
    console.log(req.body);
    //asynchronus
    dataService.deposit(req.body.acno, req.body.amount)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })

})

//fundTransfer
server.post('/fundTransfer', jwtMiddleware, (req, res) => {
    console.log('inside fundTransfer api');
    console.log(req.body);
    //asynchronus
    dataService.fundTransfer(req, req.body.toAcno, req.body.pswd, req.body.amount)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })

})
//get all transaction
server.get('/all-transactions', jwtMiddleware, (req, res) => {
    console.log('Inside getAllTransactions api');
    dataService.getAllTransactions(req)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})
//delete-account
server.delete('/delete-account/:acno', jwtMiddleware, (req, res) => {
    console.log('inside delete-account api');
    console.log(req.params.acno);
    //asynchronus
    dataService.deleteMyAccount(req.params.acno)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })

})