require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const People = require("./models/people");

app.use(express.json());
app.use(cors());

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (req, res, next) => {
  People.find({})
    .then((people) => {
      res.json(people);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  People.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  People.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }

  const person = new People({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPeople) => {
      res.json(savedPeople);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  People.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res, next) => {
  try {
    res.send(
      `<p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>`
    );
  } catch (error) {
    next(error);
  }
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "invalid id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
