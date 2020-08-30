## Index
- [Index](#index)
- [About](#about)
- [Usage](#usage)
  - [Installation](#installation)
- [Endpoints](#endpoints)

## About
This will be a free to use, open sourced questions database which has a REST API implemented in javascript & Nodejs using MySQL database,

## Movie Ticket Booking System
You can book, update, delete, checkstatus and checkuserdetails of your movie ticket.
This is a repo for a starter application for a Single Page application. Just download and install and you have a good foundation for building application.

Make sure you have Node.js and Mysql Installed on your local system. Install Postman for testing the application and follow below given installation procedure on the Command Line / Terminal

## Installation

   1. Download the repository
   2. Install npm modules: npm install
   3. Install mysql2: npm install mysql2
   4. Start up the server: node server.js
   5. Try out using postman.
   
## Endpoints

Available Views`
- [x] https:localhost:8000/bookTicketSystem          

`Available Endpoints`

- Movie Ticket Booking
    - [x] `POST /addticket` **(Book a Ticket: Pass Username, Mobile Number, Movie timing)**
    <p align="center"><img src="./pictures/addticket.png"></p>
    <p align="center"><img src="./pictures/addticket1.png"></p>
    
    
    - [x] `POST /ticketsbytiming` **(View all tickets for particular time: Pass Movie time of which tickets you want to see)**
    <p align="center"><img src="./pictures/ticketbytime.png"></p>
    <p align="center"><img src="./pictures/ticketbytiming1.png"></p>
    <p align="center"><img src="./pictures/ticketbytiming2.png"></p>
    
    
    - [x] `PATCH /updatetickettiming` **(Update a ticket timing: Pass ticket id and new timing to update movie timings)**
    <p align="center"><img src="./pictures/updateticket.png"></p>
    
    
    - [x] `DELETE /deleteticket` **(Delete a particular ticket: Pass ticket id to delete ticket)**
    <p align="center"><img src="./pictures/deleteticket.png"></p>
    
    
    - [x] `POST /userdetails` **(User details by ticked id: Pass ticket id to see user details)**
    <p align="center"><img src="./pictures/userdetails.png"></p>
    <p align="center"><img src="./pictures/userdetails1.png"></p>
    
    
    - [x] `PATCH /statuscheck` **(Check status whether the user is expired & deleted expired ticket automatically whenever user checked them)**
