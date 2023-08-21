ADD your settings: DB_URL and PORT in .env file

// register user: SAMPLE:
const options = {
method: 'POST',
headers: {
'Content-Type': 'application/json'}
body: '{"username":"Nonameuser","password":"123432!@qQwe","email":"noemail@gmail.com"}'
};
fetch('http://localhost:3030/users/register', options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));
// Password should be min 8 chars, small and big letters + numbers and special char
// Email should have email format
//username can not have special chars maxlength 20

// login to get token
const options = {
method: 'POST',
headers: {'Content-Type': 'application/json'},
body: '{"username":"Nonameuser","password":"123432!@qQwe"}'
};

fetch('http://localhost:3030/users/login', options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));

You will get respond with the token:
{
"message": "user_logged_in",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5vbmFtZXVzZXIiLCJkYXRlIjoxNjkyNjUzMjcxNzYxLCJpYXQiOjE2OTI2NTMyNzEsImV4cCI6MTY5MjY1Njg3MX0.XU8bGASAi0D5hkDqQbV35QFBv1LM-Nz31AMMBKrMznA"
}

// TOKEN is valid 1hour but you can change it

Now you can do all requests with the token
// Sample: const options = {
method: 'GET',
headers: {
'Content-Type': 'application/json',
Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5vbmFtZXVzZXIiLCJkYXRlIjoxNjkyNjUzMjcxNzYxLCJpYXQiOjE2OTI2NTMyNzEsImV4cCI6MTY5MjY1Njg3MX0.XU8bGASAi0D5hkDqQbV35QFBv1LM-Nz31AMMBKrMznA'
},
body: 'false'
};

fetch('http://localhost:3030/movies', options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));

// Search
// Sample:
const options = {
method: 'GET',
headers: {
Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5vbmFtZXVzZXIiLCJkYXRlIjoxNjkyNjUzMjcxNzYxLCJpYXQiOjE2OTI2NTMyNzEsImV4cCI6MTY5MjY1Njg3MX0.XU8bGASAi0D5hkDqQbV35QFBv1LM-Nz31AMMBKrMznA'
}
};

fetch('http://localhost:3030/movies/search?category=action&released_year=2001&title=inc&country=united', options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));

// About API
const options = {method: 'GET'};

fetch('http://localhost:3030/about', options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));
