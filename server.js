const express = require('express')
const app = require('express')()

const bookTicket = require('./bookTicketSystem')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/bookTicketSystem', bookTicket)
app.listen(8000)
