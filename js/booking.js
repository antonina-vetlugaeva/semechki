var app = {
  init: () => {},
  name: document.querySelector("#name"),
  email: document.querySelector("#email"),
  date: document.querySelector("#date"),
  book: () => {
    var name = app.name.value;
    var email = app.email.value;
    var date = app.date.value;

    if (name && email && date) {
      console.log(name, email, date);
    } else {
      var nameCheck = name ? true : false;
      var emailCheck = email ? true : false;
      var dateCheck = date ? true : false;
      console.log("Missing info");
    }
  }
};
