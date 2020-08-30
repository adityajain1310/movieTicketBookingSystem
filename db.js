const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'aditya',
    database: 'ticketBooking',
    password: 'adityauser'
})

var count;

function createticketsTable () {
    return new Promise(function (resolve, reject) {
        connection.query(
            `CREATE TABLE IF NOT EXISTS tickets (
                ticketid INTEGER AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100),
                mobilenumber VARCHAR(15),
                timing TIME,
                status VARCHAR(10))`,
            function (err, results) {
                if(err) {
                    reject(err)
                } else {
                    resolve("Tickets Table Created Successfully")
                }
            }
        )
    })
}

function createshowcountTable () {
    return new Promise(function (resolve, reject) {
        connection.query(
            `CREATE TABLE IF NOT EXISTS showcount (
                timing TIME,
                total INTEGER)`,
            function (err, results) {
                if(err) {
                    reject(err)
                } else {
                    resolve("Show Count Table Created Successfully")
                }
            }
        )
    })
}

function gettickets () {

    return new Promise(function (resolve, reject) {
        connection.query(
            `SELECT * FROM tickets`,
            function (err, results) {
                if(err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            }
        )
    })
}

function getticketsbytiming (movieTiming) {

    return new Promise(function (resolve, reject) {
        connection.query(
            `SELECT ticketid, username, mobilenumber, timing, status FROM tickets WHERE timing=?`,
            [movieTiming],
            function (err, results) {
                if(err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            }
        )
    })
}

function numberofshow (timing) {
    connection.query(
        `SELECT total FROM (SELECT timing as stiming, count(*) as total FRom tickets group by timing) AS showcount where stiming = ?`,
        [timing],
        function(err, result) {
            if(err) {
                console.error(err)
            } else {
                Object.keys(result).forEach(function(key) {
                    var row = result[key];
                    count =  row.total
                });
            }
        }    
    )
}

function addtickets (newusername, newmobilenumber, newtiming, newstatus) {
    return new Promise(function (resolve, reject) {
        numberofshow(newtiming)
        setTimeout(() => {
            if (count > 20) {
                console.log('Show is housefull')
            } else {
                console.log('hi')
                connection.query(
                    `INSERT INTO tickets (username, mobilenumber, timing, status) VALUES (?, CAST(? AS UNSIGNED), ?, ?)`,
                    [newusername, newmobilenumber, newtiming, newstatus],
                    function (err, results) {
                        if(err) {
                            reject(err)
                        } else {
                            resolve(results)
                        }
                    }
                )
            }
        }, 1)
    })
}

function updatetickettiming (ticketid, newTiming) {
    return new Promise(function (resolve, reject) {
        connection.query(
            `UPDATE tickets SET timing=? WHERE ticketid=?`,
            [newTiming, ticketid],
            function (err, results) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            }
        )
    })
}

function deleteticket (ticketid) {
    return new Promise(function (resolve, reject) {
        connection.query(
            `DELETE FROM tickets WHERE ticketid=?`,
            [ticketid],
            function (err, results) {
                if (err) {  
                    reject(err)
                } else {
                    resolve()
                }
            }
        )
    })
}

function userdetails (ticketid) {
    return new Promise(function (resolve, reject) {
        connection.query(
            `SELECT username, mobilenumber FROM tickets WHERE ticketid=?`,
            [ticketid],
            function (err, results) {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            }
        )
    })
}

function updatestatus (newstatus, timediff) {
    return new Promise(function (resolve, reject) {
        connection.query(
            `UPDATE tickets SET status=? WHERE TIMEDIFF(CURRENT_TIME(), timing) > ?`,
            [newstatus, timediff],
            function (err, results) {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            }
        )
    })
}

function deleteexpiredticket () {
    return new Promise(function (resolve, reject) {
        connection.query(
            `DELETE FROM tickets WHERE status=?`,
            ['expired'],
            function (err, results) {
                if (err) {  
                    reject(err)
                } else {
                    resolve()
                }
            }
        )
    })
}

exports = module.exports = {
    createticketsTable,
    createshowcountTable,
    gettickets,
    getticketsbytiming,
    addtickets,
    updatetickettiming,
    updatestatus,
    deleteticket,
    userdetails,
    deleteexpiredticket
}