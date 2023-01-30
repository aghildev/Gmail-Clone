const userEmail = new URL(window.location.href).searchParams.get('email');

const inboxBtn = document.querySelector(".inboxC")
inboxBtn.addEventListener('click', () => {
  document.querySelector("#listall").classList.remove("active")
  inboxBtn.classList.add("active");
  document.querySelector(".content2").classList.add("displaynone")
  document.querySelector(".content").style.display = "block";
})

function showModal() {
  document.querySelector('.sendMail').style.display = 'flex';

}

document.querySelector('.compose-btn').addEventListener('click', showModal);

const closeButton = document.querySelector(".sendMail__close");

closeButton.addEventListener("click", function () {
  document.querySelector('.sendMail').style.display = "none";
 
});
const sendEmail = async (e) => {
  e.preventDefault();
  document.querySelector('.sendMail').style.display = "none";
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
document.querySelector('#sForm').addEventListener('submit', sendEmail)

const listDetails = async (e) => {
  e.preventDefault();
  document.querySelector(".content").style.display = "none"
  document.querySelector("#listall").classList.add("active")
  inboxBtn.classList.remove("active");
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

    let emailData = data.emailData[0].emailData;
    let emails = [];

    try {
      emailData = JSON.parse(emailData);
    } catch (e) {
      console.error("Invalid JSON string:", emailData);
      return;
    }

    emailData.forEach((data) => {
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) {
          console.error("Invalid JSON string:", data);
          return;
        }
      }
      emails.push(data);
    });

    const emailTemplate = emails.map((email) => {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      let ampm = 'AM';
      if (hours >= 12) {
        ampm = 'PM';
      }
      const currentHour = hours % 12 || 12;
      const currentMinute = currentTime.getMinutes();
      return `
    
    
    <div class="content2">
    <div class="mail">

      <div class="inbox-message-item">

        <div class="checkbox" style="margin-right: -12px;">
          <button class="btn">
            <img src="/app/assets/icons/check_box_outline_blank_black_24dp.svg" alt="Select"
              class="btn-icon-sm btn-icon-alt btn-icon-hover message-btn-icon">
          </button>
        </div>

        <div class="message-group-hidden">
          <button class="btn-alt btn-nofill drag-indicator">
            <img src="/app/assets/icons/drag_indicator_black_24dp.svg" alt="Drag"
              class="btn-icon-sm btn-icon-alt btn-icon-disabled">
          </button>
        </div>

        <button class="btn star" style="margin: 0;">
          <img src="/app/assets/icons/star_border_black_24dp.svg" alt="Not starred"
            class="btn-icon-sm btn-icon-alt btn-icon-hover message-btn-icon">
        </button>

        <div class="message-default">

          <div class="message-sender message-content unread">
            <span>${email.email}</span>
          </div>

          <div class="message-subject message-content unread">
            <span>${email.subject}</span>
          </div>

          <div class="message-seperator message-content"> - </div>

          <div class="message-body message-content">
            <span> ${email.html}</span>
          </div>

          <div class="gap message-content"> &nbsp;&nbsp; </div>

          <div class="message-date center-text unread">
            <span>${currentHour}:${currentMinute} ${ampm}</span>
          </div>

        </div>

        <div class="message-group-hidden">
          <div class="inbox-message-item-options">
            <button class="btn">
              <img src="/app/assets/icons/archive_black_24dp.svg" alt="Archive"
                class="btn-icon-sm btn-icon-alt btn-icon-hover">
            </button>

            <button class="btn">
              <img src="/app/assets/icons/delete_black_24dp.svg" alt="Delete"
                class="btn-icon-sm btn-icon-alt btn-icon-hover">
            </button>

            <button class="btn">
              <img src="/app/assets/icons/mark_as_unread_black_24dp.svg" alt="Mark as unread"
                class="btn-icon-sm btn-icon-alt btn-icon-hover">
            </button>

            <button class="btn">
              <img src="/app/assets/icons/access_time_filled_black_24dp.svg" alt="Snooze"
                class="btn-icon-sm btn-icon-alt btn-icon-hover">
            </button>
          </div>
        </div>

      </div>

      
    </div>

    <!-- FOOTER -->

    <footer class="activity">
      <div class="footer-container">

        <div class="footer-item">
          <span class="progressbar"></span>
          <a href="#" class="footer-link footer-text-sm">


            <div class="footer-group">
              <span> 0 GB of 15 GB used</span>
              <span>
                <img style="height: 18px; width: 18px; margin: 0 8px; padding: 0;"
                  src="/app/assets/icons/open_in_new_black_24dp.svg" alt="Google drive storage"
                  class="btn-icon-alt btn-icon-sm">
              </span>
            </div>

          </a>
        </div>

        <div class="footer-item">
          <a href="#" class="footer-link footer-text-sm">Terms</a>
          ·
          <a href="#" class="footer-link footer-text-sm">Privacy</a>
          ·
          <a href="#" class="footer-link footer-text-sm">Program Policies</a>
        </div>

        <div class="footer-item">
          <span class="footer-text-sm">Last activity: 37 minutes ago</span>

          <div class="footer-group">
            <a href="#" class="footer-link footer-text-sm">Details</a>
          </div>
        </div>

      </div>
    </footer>

 
    
  `
    }).join('');

   
    document.querySelector(".content2").insertAdjacentHTML('afterbegin', emailTemplate);
    document.querySelector(".content2").classList.remove("displaynone");
 
    console.log(emailTemplate)
    console.log(data);
    console.log("got list")
  } catch (error) {
    console.log('Error:', error);
  }
}

document.querySelector("#listall").addEventListener("click", listDetails)


const googleCalender = document.getElementById("googleCalender")

googleCalender.addEventListener('click', function () {
  window.location.href = "./calender/calender.html";
})

const googleKeep = document.getElementById("googleKeep");
googleKeep.addEventListener('click', function () {
  window.location.href = "./googlenotes/notes.html";
})

document.querySelector(".logoutBtn").addEventListener('click', function () {
  window.location.href = "./index.html"
})