const eventsContainer = document.getElementById('events-container');

async function fetchEvents() {
  const res = await fetch('/events');
  const events = await res.json();
  
  eventsContainer.innerHTML = '';
  
  events.forEach(event => {
    const div = document.createElement('div');
    div.className = 'event-card';
    div.innerHTML = `
      <h3>${event.name}</h3>
      <p>${event.date} - ${event.location}</p>
      <button data-url="${event.ticketUrl}">GET TICKETS</button>
    `;
    eventsContainer.appendChild(div);
  });
}

fetchEvents();
