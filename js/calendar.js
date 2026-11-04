/**
 * Anto & Monica Wedding Invitation
 * Add to Calendar (Google Calendar & iCal .ICS generator)
 */

(function () {
  'use strict';

  const events = {
    ceremony: {
      title: "Anto & Monica – Holy Matrimony Ceremony",
      description: "Together with our families, we joyfully invite you to celebrate our wedding ceremony at Seven Dolours Church. Verse: 'The Lord has made everything beautiful in its time.' — Ecclesiastes 3:11",
      location: "Seven Dolours Church, Mettupatti, Dindigul, Tamil Nadu, India",
      start: "20261129T050000Z", // 10:30 AM IST (UTC 05:00)
      end: "20261129T061500Z",   // 11:45 AM IST (UTC 06:15)
      filename: "Anto-Monica-Wedding-Ceremony.ics"
    },
    reception: {
      title: "Anto & Monica – Wedding Reception",
      description: "Join us to celebrate the wedding reception of Anto Viagul & Monica Merlin at Sowrastra Sabai, Nootrandu Vizha Mahal, Bharathipuram, Dindigul. Reception time to be announced.",
      location: "Sowrastra Sabai, Nootrandu Vizha Mahal, Bharathipuram, Dindigul, Tamil Nadu, India",
      start: "20261129T123000Z",
      end: "20261129T160000Z",
      filename: "Anto-Monica-Wedding-Reception.ics"
    }
  };

  function getGoogleCalendarUrl(ev) {
    const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    return `${base}&text=${encodeURIComponent(ev.title)}&dates=${ev.start}/${ev.end}&details=${encodeURIComponent(ev.description)}&location=${encodeURIComponent(ev.location)}`;
  }

  function downloadIcsFile(ev) {
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Anto & Monica Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${ev.title}`,
      `DESCRIPTION:${ev.description}`,
      `LOCATION:${ev.location}`,
      `DTSTART:${ev.start}`,
      `DTEND:${ev.end}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder: Anto & Monica Wedding Tomorrow!",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", ev.filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Bind clicks
  document.querySelectorAll('[data-calendar]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const type = this.getAttribute('data-calendar');
      const targetEvent = events[type] || events.ceremony;
      
      if (this.classList.contains('btn-google-cal')) {
        window.open(getGoogleCalendarUrl(targetEvent), '_blank', 'noopener,noreferrer');
      } else {
        downloadIcsFile(targetEvent);
        if (window.showToast) {
          window.showToast("Calendar event (.ics) downloaded!");
        }
      }
    });
  });

  window.WeddingCalendar = {
    events,
    getGoogleCalendarUrl,
    downloadIcsFile
  };
})();
