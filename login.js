
const form = document.querySelector("form");


// async function checkAccount() {
//   try {
   
//     const signupResponse = await fetch(`https://aircampushack.onrender.com/gmail/signup?email=${email}&password=${password}`);
//     const signupData = await signupResponse.json();

 
//     if (signupData.status === 'success' && signupData.account) {
     
//       console.log('Account exists, proceed with login');
      
     
//       const loginResponse = await fetch(`https://aircampushack.onrender.com/gmail/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: email, password: password })
//       });
//       const loginData = await loginResponse.json();
//       if(loginData.status === 'success'){
//         console.log('user login successful')
//       }
//     } else {
  
//       console.log('Account does not exist, prompt user to create an account');
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// checkAccount();
const login = async (event) => { 
  event.preventDefault();
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;
  try {
    const response = await fetch('https://aircampushack.onrender.com/gmail/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, pass })
    });
    const data = await response.json();
    console.log(data);
    if (data.user !== undefined) {
      console.log('Logged in successfully');

       window.location.href = 'index.html?email=' + email;
    } else {
      console.log('Error:', data.message);
        window.location.href = 'signup.html'
    }
  } catch (error) {
    console.log('Error:', error);
  }
}


form.addEventListener('submit', login)