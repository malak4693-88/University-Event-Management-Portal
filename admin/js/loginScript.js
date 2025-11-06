 document.querySelectorAll('.show-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.dataset.target;
        const input = document.getElementById(targetId);
        if (!input) return;
        const img = this.querySelector('img.show-icon');

        const showing = input.type === 'text';
        input.type = showing ? 'password' : 'text';
        this.setAttribute('aria-pressed', (!showing).toString());

        if (img) {
          img.src = showing ? 'assets/show.png' : 'assets/hide.png';
          img.alt = showing ? 'show icon' : 'hide icon';
        }
      });
    });

const password = document.getElementById('password');

let form = document.getElementById('login-Form')
form.addEventListener('submit',PageRedirect)
function PageRedirect(event){
   event.preventDefault();    
    window.location.href = "dashboard.html";  
}
