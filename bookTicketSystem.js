const route = require('express').Router()
const db = require('./db')

let tickets = []

/*
    {username: 'Aditya', MobileNumber: '1234567890', timings: '6:00'},
    {username: 'Naman', MobileNumber: '0123456789', timings: '9:00'},
    {username: 'Kapil', MobileNumber: 'xxxx123456', timings: '5:00'}
*/

db.createticketsTable()
    .then((res) => {
        console.log(res)
    })
    .catch((err => {
        console.error(err)
    }))

db.createshowcountTable()
    .then((res) => {
        console.log(res)
    })
    .catch((err => {
        console.error(err)
    }))

function getticketlist() {
    db.gettickets()
        .then((movietickets) => {
            tickets = []
            for(ticket of movietickets) {
                tickets.push({
                    ticketid: ticket.ticketid,
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
}

getticketlist()

route.post('/addticket', (req, res) => {
    db.addtickets(req.body.username, req.body.mobilenumber, req.body.timing, "valid")
        .then((result) => {
            console.log(result)
            tickets.push({
                ticketid: result.insertId,
                username: req.body.username,
                mobilenumber: req.body.mobilenumber,
                timing: req.body.timing,
                status: 'valid'
            })
            res.send(tickets)
        })
        .catch((err) => {
            console.error(err)
        })
})

route.post('/ticketsbytiming', (req, res) => {
    db.getticketsbytiming(req.body.timing)
        .then((result) => {
            console.log(result)
            res.send(result)
        })
        .catch((err) => {
            console.error(err)
        })

})

route.patch('/updatetickettiming', (req, res) => {
    db.updatetickettiming(req.body.ticketid, req.body.timing)
        .then(() => {
            for(ticket of tickets){
                if(ticket.ticketid == req.body.ticketid) {
                    ticket.timing = req.body.timing
                }
            }
            res.send(tickets)
        })
        .catch((err) => {
            console.error(err)
        })
})

route.delete('/deleteticket', (req, res) => {
    db.deleteticket(req.body.ticketid)
        .then(() => {
            for(var i = 0; i < tickets.length; i++) {
                if(tickets[i].ticketid == req.body.ticketid) {
                    tickets.splice(i, 1);
                }
            }
            res.send(tickets)
        })
        .catch((err) => {
            console.error(err)
        })
})

route.post('/userdetails', (req, res) => {
    db.userdetails(req.body.ticketid)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.error(err)
        })
})

route.patch('/statuscheck', (req, res) => {
    db.updatestatus('expired', '08:00:00')
        .then((result) => {
            if(result.changedRows > 0) {
                getticketlist()
            }
            if(result.affectedRows > 0) {
                db.deleteexpiredticket()
                
                for(var i = 0; i < tickets.length; i++) {
                    if(tickets[i].status == 'expired') {
                        tickets.splice(i, 1);
                    }
                }
            }
            res.send(tickets)
        })
        .catch((err) => {
            console.error(err)
        })
})


module.exports = route
