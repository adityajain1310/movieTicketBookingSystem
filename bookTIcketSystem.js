const route = require('express').Router()
const db = require('./db')

let tickets = []

/*
    {username: 'Aditya', MobileNumber: '1234567890', timings: '6:00'},
    {username: 'Naman', MobileNumber: '0123456789', timings: '9:00'},
    {username: 'Kapil', MobileNumber: 'xxxx123456', timings: '5:00'}
*/

db.createTable()
    .then((res) => {
        console.log(res)
    })
    .catch((err => {
        console.error(err)
    }))

db.gettickets()
    .then((movietickets) => {
        for(ticket of movietickets) {
            tickets.push({
                ticketid: ticket.id,
                username: ticket.username,
                mobilenumber: ticket.mobilenumber,
                timing: ticket.timing,
                status: ticket.status
            })
        }
    })
    .catch((err) => {
        console.error(err)
    })

route.post('/', (req, res) => {
    
})

