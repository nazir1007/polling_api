# Polling System Api

A Polling System Api created by using express, mongoDb. which has following features given as below.

Features :
- Create a question (you can add as many questions as you want)
- Add options to a question
- Add a vote to an option of question
- Delete a question → (optional: A question can’t be deleted if one of it’s options has votes)
- Delete an option → (optional: An option can’t be deleted if it has even one vote given to it)
- View a question with it’s options and all the votes given to it.

Required Routes : 
- /question/create (To create a question)
- /question/:id/option/create (To add options to a specific question)
- /question/:id/delete (To delete a question)
- /option/:id/delete (To delete an option)
- /option/:id/add_vote (To increment the count of votes)
- /question/:id (To view a question and it’s options)

Api's : 
- Create Question : http://localhost:5000/api/v1/question/create
- Create Option : http://localhost:5000/api/v1/question/:id/option/create
- Add Vote : http://localhost:5000/api/v1/option/:id/addVote
- Delete Question : http://localhost:5000/api/v1/question/:id/delete
- Delete Option : http://localhost:5000/api/v1/option/:id/delete
- View Question : http://localhost:5000/api/v1/question/:id

## Version

- node - v16.14.2
- dotenv - v16.0.3
- express - v4.18.2
- mongoose - v6.9.1
- nodemon - v2.0.20

## created_at

18 feb 2023

## To Start

- `$ npm start`
- `$ base url = 127.0.0.1:5000`
