const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios=require("axios");
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  let username=req.body.username;
  let password=req.body.password;
  if(!username || !password){
    res.send("Please enter your credentials....!Error");
  }
  else{
    if(isValid(username)){
        users.push(
        {
            "username":username,
            "password":password
        });
        res.send("The user "+username+" is successfully registered");
    }
    else{
        res.send("Error. The user already exists....!");
    }
  }
});

// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   //Write your code here
//     res.send(JSON.stringify(books,null,4));
// });
public_users.get('/', function (req, res) {
    new Promise((resolve, reject) => {
      if (books) {
        resolve(books);
      } else {
        reject("Error retrieving books");
      }
    })
    .then(bookList => res.status(200).json(bookList))
    .catch(error => res.status(500).send(error));
  });

// Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   //Write your code here
//   let isbn=parseInt(req.params.isbn);
//   res.send(JSON.stringify(books[isbn],null,4));
//  });
 public_users.get('/isbn/:isbn', function (req, res) {
    new Promise((resolve, reject) => {
      let isbn = req.params.isbn;
      if (books[isbn]) {
        resolve(books[isbn]);
      } else {
        reject("Book not found");
      }
    })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).send(error));
  });
  
// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   //Write your code here
//   let author=req.params.author;
//   let samp_books=[];
//   for(item in books){
//     if(books[item].author==author){
//         res.send(JSON.stringify(books[item],null,4));
//     }
//   }
//   res.send("Sorry the requested book cannot be found");
// });

public_users.get('/author/:author', function (req, res) {
    new Promise((resolve, reject) => {
      let author = req.params.author;
      if(books){
        for(item in books){
            if(books[item].author==author){
                resolve(books[item]);
                }   
            }
        }
    else {
        reject("Book not found");
      }
    })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).send(error));
  });
  


// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   let title=req.params.title;
//   let samp_books=[];
//   for(item in books){
//     if(books[item].title==title){
//         res.send(JSON.stringify(books[item],null,4));
//     }
//   }
//   res.send("Sorry the requested book cannot be found");
// });

public_users.get('/title/:title', function (req, res) {
    new Promise((resolve, reject) => {
      let title = req.params.title;
      if(books){
        for(item in books){
            if(books[item].title==title){
                resolve(books[item]);
                }   
            }
        }
    else {
        reject("Book not found");
      }
    })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).send(error));
  });
  

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn=parseInt(req.params.isbn);
  res.send(JSON.stringify(books[isbn].reviews,null,4));
});

module.exports.general = public_users;
