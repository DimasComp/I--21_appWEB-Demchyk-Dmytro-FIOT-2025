const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

// Головна сторінка - список постів
app.get("/", (req, res) => {
  res.render("home", { posts });
});

// Сторінка "Про нас"
app.get("/about", (req, res) => {
  res.render("about");
});

// Контакти
app.get("/contact", (req, res) => {
  res.render("contact");
});

// Форма створення нового посту
app.get("/compose", (req, res) => {
  res.render("compose");
});

// Обробка відправки нового посту
app.post("/compose", (req, res) => {
  const post = {
    id: Date.now().toString(),
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

// Перегляд конкретного посту
app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    res.render("post", { post });
  } else {
    res.redirect("/");
  }
});

// Форма редагування посту
app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    res.render("edit", { post });
  } else {
    res.redirect("/");
  }
});

// Обробка збереження змін у пості
app.post("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    post.title = req.body.postTitle;
    post.content = req.body.postBody;
  }
  res.redirect("/");
});

// Видалення посту
app.post("/delete/:id", (req, res) => {
  const index = posts.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    posts.splice(index, 1);
  }
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Сервер запущено на порту 3000");
});
