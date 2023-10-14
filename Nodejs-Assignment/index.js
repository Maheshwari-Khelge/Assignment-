const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const fs = require('fs');
const bodyParser = require('body-parser');
const formDataArray=[];

app.set('view engine', 'pug');


app.get('/', (req, res) => {
  res.render('index.ejs',{formDataArray}); 
});


app.post('/submit', (req, res) => {
  const heros = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    City: req.body.City,
    Power: req.body.Power,
  };
  const formData = req.body;
  formDataArray.push(formData);
   res.render('index.ejs', { formDataArray });

 
  // res.render('index.ejs', { formDataArray });
  


 
  let data = [];
  if (fs.existsSync('./data.json')) {
    data = JSON.parse(fs.readFileSync('./data.json'));
  }

if (Array.isArray(data)) {
  data.push(heros); 
} else {
  data = [heros]; 
}

  
  fs.writeFileSync('./data.json', JSON.stringify(data, null, 4));
  res.redirect("/");
});



app.listen(5050,"localhost",function(error,data){
    if(error){
        console.log("Error",error)
    }else{
        console.log("server is live now on Localhoste:5050")
    }
})