const fs = require("fs");
const db = require('../db/db');


module.exports = (app) => {

  let notesData = [];

  
  app.get("/api/notes", function(err, res) {
    try {
      notesData = fs.readFileSync(`${__dirname}/../db/db.json`, "utf8");
      notesData = JSON.parse(notesData);
    } catch (err) {
      console.log("\n error:");
      console.log(error);
    }
    res.json(notesData);
  });



  app.post("/api/notes", function(req, res) {
    try {
      notesData = fs.readFileSync(`${__dirname}/../db/db.json`, "utf8");
      notesData = JSON.parse(notesData);
      req.body.id = notesData.length;
      notesData.push(req.body); 
      notesData = JSON.stringify(notesData);
    
      fs.writeFile(`${__dirname}/../db/db.json`, notesData, "utf8", function(err) {
        if (err) 
          throw err;
      });

    res.json(JSON.parse(notesData));
    } catch (err) {
        throw err;
        console.log(error);
    }
  });



app.delete("/api/notes/:id", function(req, res) {
  try {
    notesData = fs.readFileSync(`${__dirname}/../db/db.json`, "utf8");
    notesData = JSON.parse(notesData);
    notesData = notesData.filter(function(note) {
      return note.id != req.params.id;
    });
    notesData = JSON.stringify(notesData);
    fs.writeFile(`${__dirname}/../db/db.json`, notesData, "utf8", function(err) {
      if (err) throw err;
    });
    
    res.send(JSON.parse(notesData));
  } catch (err) {
    throw err;
    console.log(err);
  }
});

}