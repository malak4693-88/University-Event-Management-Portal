// Shared JS for pages: theme, sidebar, dropdowns, fake data, calendar

function initApp() {
    // Guard so initApp only runs once
    if (window.__limu_initialized) return;
    window.__limu_initialized = true;

    (function () {

        // Elements that may appear on each page (some pages won't have them, so guard)
        const body = document.body;
        const themeBtns = document.querySelectorAll('#themeBtn, #themeBtnUsers, #themeBtnCal');
        const fsBtns = document.querySelectorAll('#fsBtn, #fsBtnUsers, #fsBtnCal');
        const sidebarToggles = document.querySelectorAll('#sidebarToggle, #sidebarToggleUsers, #sidebarToggleCal');
        const navLinks = document.querySelectorAll('.nav-link');
        const pageTitle = document.querySelector('.page-title');
        const pageSub = document.querySelector('.page-sub');
        const addEventBtn = document.getElementById('addEventBtn');
        const select = document.getElementById('eventLoc');
        const addHall = document.querySelector('#hall-btn');

        // Set current year in all pages
        document.querySelectorAll('#year-dashboard, #year-users, #year-cal, #year-pending, #year-events').forEach(el => {
        if (el) el.textContent = new Date().getFullYear();
        });

        // --------------------------------------------------------------------------
        // Theme toggle
        // --------------------------------------------------------------------------
  
        // Selectors
        const themeIcon = document.querySelector('#themeBtn img');
        const html = document.documentElement;

        // Core function
        function setTheme(theme) {
            html.dataset.theme = theme;
            body.dataset.theme = theme;

        // Accessibility
        document.querySelectorAll('[aria-pressed]').forEach(btn =>
            btn.setAttribute('aria-pressed', theme === 'dark')
        );

        // Update button color
        const usernameColor = getComputedStyle(document.querySelector('.username') || body).color;
        themeBtns.forEach(btn => (btn.style.color = theme === 'dark' ? usernameColor : ''));

        // Update icon
        if (themeIcon) {
            themeIcon.src = `assets/${theme}_mode_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg`;
        }

        // Save choice
        localStorage.setItem('limu-theme', theme);
}

// Initialize theme
setTheme(localStorage.getItem('limu-theme') || 'light');

// Toggle theme on click
themeBtns.forEach(btn =>
  btn.addEventListener('click', () => {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  })
);


// --------------------------------------------------------------------------
// Fullscreen toggle
// --------------------------------------------------------------------------

fsBtns.forEach(btn => {
    if (!btn) return;
        btn.addEventListener('click', async () => {
            try {
                    if (!document.fullscreenElement) {
                    await document.documentElement.requestFullscreen();
                    } else await document.exitFullscreen();
                } catch (e) {
          console.warn('Fullscreen error', e);
        }
      });
    });

// --------------------------------------------------------------------------
// Sidebar toggle
// --------------------------------------------------------------------------

    sidebarToggles.forEach(t => {
      if (!t) return;

      t.addEventListener('click', e => {

        if (window.innerWidth <= 880) {

          // Mobile: add overlay class on root
          document.querySelector('.app').classList.toggle('open-overlay');
          const s = document.querySelector('.sidebar');
          if (s) s.classList.toggle('open');

        } else {
          const s = document.querySelector('.sidebar');
          if (s) s.classList.toggle('collapsed');
        }

      });
    });

  // --------------------------------------------------------------------------
  // Sidebar active state + page title update
  // --------------------------------------------------------------------------

    const pageMeta = {
        dashboard: { title: 'Dashboard', sub: 'University Event Management System' },
        users: { title: 'Users', sub: 'Manage user accounts and roles' },
        calendar: { title: 'Calendar', sub: 'View scheduled events' },
        pending: { title: 'Pending Requests', sub: 'Requests needing review' },
        events: { title: 'Ongoing Events', sub: 'Current and upcoming events' },
        halls: { title: 'Halls', sub: 'Manage and Edit Halls' },
        booking:{title:'Bookings', sub:'Manage Bookings'}
    };

    function setPageMeta(key) {

        // Looks up the metadata for the given key in pageMeta.
        // If the key doesn’t exist, it defaults to { title: 'Dashboard', sub: '' }.
        const meta = pageMeta[key] || { title: 'Dashboard', sub: '' };

        const titleEl = document.querySelector('.page-title');
        const subEl = document.querySelector('.page-sub');

        if (titleEl) titleEl.textContent = meta.title;
        if (subEl) subEl.textContent = meta.sub;

        // Updates the browser tab title to include the page title.
        document.title = `LIMU — ${meta.title}`;
    }

    // Initial set on page load

        // This starts an Immediately Invoked Function Expression (IIFE).
        // It means the function runs right away without being called elsewhere.    
        (function () {
            let key = null;
            const active = document.querySelector('.nav-link.active');
            if (active) key = active.getAttribute('data-page');
            if (!key) {
                const name = window.location.pathname.split('/').pop().replace('.html', '');
                if (name === '' || name === 'index') key = 'dashboard';
                else key = name;
            }
            setPageMeta(key);
        })();


  // --------------------------------------------------------------------------
  // DROPDOWNS
  // --------------------------------------------------------------------------

    function makeDropdown(btnSelector, wrapSelector) {
      const btn = document.querySelector(btnSelector);
      const wrap = document.querySelector(wrapSelector);
      if (!btn || !wrap) return;
      btn.addEventListener('click', e => {
        e.stopPropagation();
        wrap.classList.toggle('open');
      });
    }

    makeDropdown('#notifBtn', '#notifWrap');
    makeDropdown('#profileBtn', '#profileWrap');
    makeDropdown('#notifBtnUsers', '#notifWrapUsers');
    makeDropdown('#profileBtnUsers', '#profileWrapUsers');

    window.addEventListener('click', () => {
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
    });

  // --------------------------------------------------------------------------
  // FAKE DATA
  // --------------------------------------------------------------------------

  const fake = {

      stats: { totalUsers: 1254, eventsMonth: 19, pending: 6, ongoing: 4 },

      recentEvents : [
        { title: 'LIMU Founding day', date: '2025-11-11', loc: 'Main Hall', status: 'live' },
        { title: 'Science Exhibition', date: '2025-12-05', loc: 'Gaming Hall', status: 'upcoming' },
        { title: 'Charity Iftar Event', date: '2026-03-20', loc: 'Gaming Hall', status: 'pending' },
        { title: 'Orientation Week', date: '2026-03-10', loc: 'Room 3 ', status: 'upcoming' },
        { title: 'Career Fair', date: '2025-11-01', loc: 'Gaming Hall', status: 'pending' },
      ],

      users: [
        { name: 'Rawan Eltheni', email: 'rawan_4753@limu.edu.ly', role: 'moderator', status: 'Active' },
        { name: 'Kalthoum Alatrash', email: 'kalthoum_4853@limu.edu.ly', role: 'admin', status: 'Active' },
        { name: 'Malak Awrith', email: 'malak_4693@limu.edu.ly', role: 'Staff', status: 'Pending' },
        { name: 'Mayar Buzgheba', email: 'mayar_4784@limu.edu.ly', role: 'Student', status: 'Pending' },
      ],
      pending: [ 
        { req: 'Student Art Gallery', by: 'M. Elkadidi', date: '2025-10-21' },
        { req: 'Medical Education', by: 'E. Elfallah', date: '2026-02-15' },
        { req: 'AI & Data Science Seminar', by: 'T. Najim', date: '2025-11-25' },
      ],
      
      events: [
        { title: 'LIMU Founding day', date: '2025-11-11', loc: 'Main Hall', desc: 'Celebrating the anniversity of LIMU and honors its achievements and members', status: 'live' },
        { title: 'Orientation Week', date: '2026-03-10', loc: 'Room 3 ', desc: 'Welcome event for new students with tours, activites and information sessions', status: 'upcoming' },
        { title: 'Scince Exhibition', date: '2026-03-10', loc: 'Room 3 ', desc: 'Presentation of student science projects and innovations', status: 'upcoming' },
        { title: 'Culture Day', date: '2025-11-25', loc: 'PBL 23 ', desc: 'An event celebrating cultural diversity and srtistic expression', status: 'upcoming' },
      ],

      halls:[
        {hallName: 'Main Hall',capacity: 120, },
        {hallName: 'Room 14', capacity: 36,},
        {hallName: 'Room 5', capacity: 30, },
        {hallName: 'PBL 23',capacity: 40,},
        {hallName: 'Room 3',capacity: 70, },
        {hallName: 'Netwrok Lab',capacity: 24,},
        {hallName: 'ليبيا الواعدة',capacity: 30, },                

      ],

      appointments:[
        {Day:'Sunday',date:'2025-11-2', period:'8:00-2:00 PM'},
        {Day:'Sunday',date:'2025-11-2', period:'2:00-7:00 PM'},
        {Day:'Thursday',date:'2025-11-4', period:'9:00-2:00 PM'},
        {Day:'Thursday',date:'2025-11-4', period:'8:00-3:00 PM'},
        {Day:'Saturday',date:'2025-11-8', period:'8:00-3:00 PM'}
      ]
    };

    try {
      const elTotal = document.getElementById('totalUsers');
      if (elTotal) elTotal.textContent = fake.stats.totalUsers.toLocaleString();

      const elEventsM = document.getElementById('eventsMonth');
      if (elEventsM) elEventsM.textContent = fake.stats.eventsMonth;

      const elPend = document.getElementById('pendingReq');
      if (elPend) elPend.textContent = fake.stats.pending;

      const elOng = document.getElementById('ongoing');
      if (elOng) elOng.textContent = fake.stats.ongoing;

      const recentBody = document.getElementById('recentEvents');
      if (recentBody) {
        recentBody.innerHTML = fake.recentEvents
          .map(
            ev => `
            <tr>
              <td>${ev.title}</td>
              <td>${ev.date}</td>
              <td>${ev.loc}</td>
              <td><span class="status ${ev.status}">${ev.status.charAt(0).toUpperCase() + ev.status.slice(1)}</span></td>
            </tr>`
          )
          .join('');
      }

      const usersTable = document.querySelector('#usersTable tbody');
      if (usersTable) {
        usersTable.innerHTML = fake.users
          .map(u => `<tr><td>${u.name}</td><td>${u.email}</td><td>${u.role}</td><td>${u.status}</td></tr>`)
          .join('');
      }

      const pendingTable = document.querySelector('#pendingTable tbody');

      if (pendingTable) {
        // Render the rows
        pendingTable.innerHTML = fake.pending
          .map(
            p => `
            <tr>
              <td>${p.req}</td>
              <td>${p.by}</td>
              <td>${p.date}</td>
              <td><input type="text" placeholder="Leave a comment.." class="comment"></td>
              <td>
                <button class="btnsmall-A">Accept</button>
                <button class="btnsmall-R">Reject</button>
              </td>                
            </tr>`
          )
          .join('');

        // Add event listeners for Accept/Reject buttons
        pendingTable.querySelectorAll('.btnsmall-A, .btnsmall-R').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr'); // get the parent row
            if (row) row.remove(); // remove it from the table
          });
        });
      }


      const hallsTable = document.querySelector('#hallsTable tbody');
      if(hallsTable){
        hallsTable.innerHTML = fake.halls
          .map(
            h=> `
            <tr>
              <td>${h.hallName}</td>
              <td>${h.capacity}</td>
              <td><select id="filterSelect" class="halls-avail">
                    <option vlaue="Avilability"selected disabled>Availability</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Occupied</option>
                  </select>
              </td>  
            </tr>`
          )
          .join('')
      }

      const appointList = document.querySelector('#appointTable tbody');
      if(appointList){
        appointList.innerHTML = fake.appointments
          .map(
            a => `
            <tr>
              <td>${a.Day}</td>
              <td>${a.date}</td>
              <td>${a.period}</td>              
            </tr>
            `
          ).join('')
      }

      const eventsList = document.getElementById('eventsList');
      if (eventsList) {
        eventsList.innerHTML = fake.events
          .map(
            e => `
            <article class="card event-card">
              <div class="card-body">
                <div class="card-title">${e.title}</div>
                <div class="card-value">${e.date} — ${e.loc}</div>
                <div class="card-meta">${e.desc}</div>
                <div style="margin-top:10px">
                  <span class="status ${e.status.toLowerCase() === 'live' ? 'live' : 'upcoming'}">${e.status}</span>
                </div>
              </div>
            </article>`
          )
          .join('');
      }                  
    } catch (e) {
      console.warn(e);
    }

  // --------------------------------------------------------------------------
  // CALENDAR
  // --------------------------------------------------------------------------
    const calRoot = document.getElementById('calendarRoot');
    if (calRoot) {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const first = new Date(year, month, 1);
      const startDay = first.getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      const title = document.createElement('h4');
      title.textContent = `${monthNames[month]} ${year}`;
      calRoot.parentNode.insertBefore(title, calRoot);
      /////////////////
      const highlightedDates = [
        `${year}-${String(month + 1).padStart(2, '0')}-11`,
        `${year}-${String(month + 1).padStart(2, '0')}-01`,
        
      ];
      /////////////////
      for (let i = 0; i < startDay; i++) {
        const d = document.createElement('div');
        d.className = 'calendar-day';
        d.innerHTML = '';
        calRoot.appendChild(d);
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const el = document.createElement('div');
        el.className = 'calendar-day';
        el.innerHTML = `<div class="date">${d}</div>`;        

        const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        //////EXPIEREMENT///////                
          // highlight special dates
          if (highlightedDates.includes(iso)) {
            el.classList.add('highlighted');
          }
        //////EXPIEREMENT//////
        const matches = fake.recentEvents.filter(e => e.date === iso);
        if (matches.length) {
          el.innerHTML += '<ul>' + matches.map(m => `<li>${m.title}</li>`).join('') + '</ul>';
        }

        calRoot.appendChild(el);
      }
    }

  // --------------------------------------------------------------------------
  // Mark unavailable select options
  // --------------------------------------------------------------------------

    const unavailableLocations = ['PBL_23', 'network_lab'];
    if (select) {
      [...select.options].forEach(option => {
        if (unavailableLocations.includes(option.value)) {
          option.disabled = true;
          option.classList.add('unavailable');
          option.textContent = `${option.textContent} — Occupied`;
        }
      });
    }
  })();
}

// --------------------------------------------------------------------------
// Filter Recent Events by Status
// --------------------------------------------------------------------------

function handleFilterChange() {
  const filterValue = document.getElementById("filterSelect").value.toLowerCase();
  const recentBody = document.getElementById("recentEvents");

  // use the same fake data object that’s already defined
  const allEvents = [
    { title: 'LIMU Founding day', date: '2025-11-11', loc: 'Main Hall', status: 'live' },
    { title: 'Science Exhibition', date: '2025-12-05', loc: 'Gaming Hall', status: 'upcoming' },
    { title: 'Charity Iftar Event', date: '2026-03-20', loc: 'Gaming Hall', status: 'pending' },
    { title: 'Orientation Week', date: '2026-03-10', loc: 'Room 3 ', status: 'upcoming' },
    { title: 'Career Fair', date: '2025-11-01', loc: 'Gaming Hall', status: 'pending' },
  ];

  // filter logic
  const filtered =
    filterValue === "all"
      ? allEvents
      : allEvents.filter((event) => event.status === filterValue);

  // update the table
  recentBody.innerHTML = filtered
    .map(
      (ev) => `
      <tr>
        <td>${ev.title}</td>
        <td>${ev.date}</td>
        <td>${ev.loc}</td>
        <td><span class="status ${ev.status}">${ev.status.charAt(0).toUpperCase() + ev.status.slice(1)}</span></td>
      </tr>`
    )
    .join("");
}







// Initialize after includes are injected
document.addEventListener('includesLoaded', () => {
  setTimeout(initApp, 5);
});

// Fallback in case includesLoaded doesn't fire
setTimeout(() => {
  if (!window.__limu_initialized) initApp();
}, 500);


