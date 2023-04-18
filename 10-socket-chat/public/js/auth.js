const form = document.getElementById('form-login');

// var url = ( window.location.hostname.includes('localhost') )
//             ? 'http://localhost:8080/api/auth/'
//             : 'https://restserver-curso-fher.herokuapp.com/api/auth/';
const url = 'http://localhost:8080/api/auth/';

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

function onSignIn(googleUser) {
    // var profile = parseJwt(googleUser.credential);
    // console.log("ID: " + profile.sub);
    // console.log('Full Name: ' + profile.name);
    // console.log('Given Name: ' + profile.given_name);
    // console.log('Family Name: ' + profile.family_name);
    // console.log("Image URL: " + profile.picture);
    // console.log("Email: " + profile.email); // This is null if the 'email' scope is not present.

    var id_token = googleUser.credential;
    const data = { id_token };

    fetch( url + 'google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( data )
    })
    .then( resp => resp.json() )
    .then(({ token }) => {
        localStorage.setItem('token', token);
        window.location = 'chat.html';
    })
    .catch( console.log );
    
}

function signOut() { 
    // TODO: Create the funtion to close the google session
};

form.addEventListener('submit', async (e) => {
    
    e.preventDefault();
    
    const formData = {};

    for(let input of form.elements) {
        if(input.name.length > 0) {
            formData[input.name] = input.value
        };
    };

    try {
      const request = await fetch(url + 'login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      });
      
      const { msg, token } = await request.json();
      
      if(msg) {
        return console.error(msg);
      }

      localStorage.setItem('token', token);
      window.location = 'chat.html';
      
    } catch (error) {
        console.log(error);
    }

});