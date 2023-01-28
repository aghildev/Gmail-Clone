const userEmail = new URL(window.location.href).searchParams.get('email');
console.log(userEmail);

function showModal() {
    document.querySelector('.sendMail').style.display = 'flex';
    console.log('showModal')
}

document.querySelector('.compose-btn').addEventListener('click', showModal);

const closeButton = document.querySelector(".sendMail__close");

closeButton.addEventListener("click", function() {
    document.querySelector('.sendMail').style.display = "none";
  console.log("clicked")
});
const sendEmail = async (e) => {
  e.preventDefault();
  let email = document.getElementById("to").value;
  let senderEmail = userEmail;
  let subject = document.getElementById("subject").value;
  let html = document.getElementById("html").value;
  try {
    const response = await fetch('https://aircampushack.onrender.com/gmail/sendemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senderEmail, subject, html })
    });
    const data = await response.json();
    console.log(data);
    console.log("email sent")
  } catch (error) {
    console.log('Error:', error);
  }
}

document.querySelector('#sForm').addEventListener('submit',sendEmail)
const listDetails = async (e) => {
  e.preventDefault();
 
  let email = userEmail;
  
  try {
    const response = await fetch('https://aircampushack.onrender.com/gmail/listall', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    console.log(data);
    console.log("got list")
  } catch (error) {
    console.log('Error:', error);
  }
}


document.querySelector("#listall").addEventListener("click",listDetails)