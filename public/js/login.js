$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");


  
  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }

});

$(document).on('click', '.below button', function(){
  var belowCard = $('.below'),
  aboveCard = $('.above'),
  parent = $('.form-collection');
  parent.addClass('animation-state-1');
  setTimeout(function(){
    belowCard.removeClass('below');
    aboveCard.removeClass('above');
    belowCard.addClass('above');
    aboveCard.addClass('below');
    setTimeout(function(){
      parent.addClass('animation-state-finish');
      parent.removeClass('animation-state-1');
      setTimeout(function(){
        aboveCard.addClass('turned');
        belowCard.removeClass('turned');
        parent.removeClass('animation-state-finish');
      }, 300)
    }, 10)
  }, 300);
});

// $(document).ready(function() {
//   // Getting references to our form and input
//   var signUpForm = $("form#signupForm");
//   var emailInput = $("input#email-input");
//   var passwordInput = $("input#password-input");

//   // When the signup button is clicked, we validate the email and password are not blank
//   signUpForm.on("submit", function(event) {
//     event.preventDefault();
//     var userData = {
//       email: emailInput.val().trim(),
//       password: passwordInput.val().trim()
//     };

//     if (!userData.email || !userData.password) {
//       return;
//     }
//     // If we have an email and password, run the signUpUser function
//     signUpUser(userData.email, userData.password);
//     emailInput.val("");
//     passwordInput.val("");
//   });

//   // Does a post to the signup route. If succesful, we are redirected to the members page
//   // Otherwise we log any errors
//   function signUpUser(email, password) {
//     $.post("/api/signup", {
//       email: email,
//       password: password
//     }).then(function(data) {
//       window.location.replace(data);
//       // If there's an error, handle it by throwing up a boostrap alert
//     }).catch(handleLoginErr);
//   }

//   function handleLoginErr(err) {
//     $("#alert .msg").text(err.responseJSON);
//     $("#alert").fadeIn(500);
//   }
// });

// $(document).ready(function() {
//   // Getting references to our form and inputs
//   var loginForm = $("form.login");
//   var emailInput = $("input#email-input");
//   var passwordInput = $("input#password-input");

//   // When the form is submitted, we validate there's an email and password entered
//   loginForm.on("submit", function(event) {
//     event.preventDefault();
//     var userData = {
//       email: emailInput.val().trim(),
//       password: passwordInput.val().trim()
//     };

//     if (!userData.email || !userData.password) {
//       return;
//     }

//     // If we have an email and password we run the loginUser function and clear the form
//     loginUser(userData.email, userData.password);
//     emailInput.val("");
//     passwordInput.val("");
//   });

//   // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
//   function loginUser(email, password) {
//     $.post("/api/login", {
//       email: email,
//       password: password
//     }).then(function(data) {
//       window.location.replace(data);
//       // If there's an error, log the error
//     }).catch(function(err) {
//       console.log(err);
//     });
//   }

// });