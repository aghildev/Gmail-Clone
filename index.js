function show(){

    var password= document.getElementById('pass1');
    confirm= document.getElementById('pass2');
    image= document.getElementById('eye');

    if (password.type==="password"&&confirm.type==="password") {
      password.type="text";
      confirm.type="text";
      image.setAttribute('src', './app/assets/img/eyeshow.png');

    }else if (password.type==="text"&&confirm.type==="text"){
      password.type="password";
      confirm.type="password";
      image.setAttribute('src', './app/assets/img/eyehide.png');
    }
  }



const form = document.querySelector("form");
form.addEventListener('submit', handleSubmit)
async function handleSubmit(event) {
    event.preventDefault();
    // const firstName = event.target.elements.firstName.value;
    // const lastName = event.target.elements.lastName.value;
    const email = event.target.elements.email.value;
    const pass = event.target.elements.password.value;
    
    try {
      const response = await fetch('https://aircampushack.onrender.com/gmail/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // firstName,
          // lastName,
          email,
          pass
        })
      });
      const data = await response.json();
      console.log(data);
       //window.location.href = 'login.html'
       if (data.user !== undefined) {
        console.log('Logged in successfully');
    
        window.location.href = 'login.html'
      } else {
        
        let errorModal = document.querySelector(".error_modal_login")
        errorModal.style.display = "grid";
        setTimeout(()=>{
           errorModal.style.display = "none"
          window.location.href = 'index.html';
        },5000)
    }
    } catch (error) {
      console.error(error);
    }
  }


 
 
// async function deleteData(id) {
//   try {
//     const response = await fetch(`https://aircampushack.onrender.com/gmail/signup/{id}`, {
//       method: "DELETE"
//     });
//     if (response.ok) {
//       console.log(`${num} data deleted successfully`);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
// deleteData("63d4a789fc4bd8178008b4f6") 
