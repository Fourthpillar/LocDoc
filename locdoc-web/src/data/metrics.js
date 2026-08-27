// Sourced from the LocDoc PRD's Success Metrics table. Framed as pilot
// targets, not live production numbers.
export const metrics = [
  { label: "Doctor ghosting rate", target: "< 10%", detail: "Arrivals >15 min late without prior notice" },
  { label: "Notification lead time", target: "> 30 min", detail: "Median advance warning before a delay" },
  { label: "Patient no-show rate", target: "< 12%", detail: "Booked visits with no attendance, no cancellation" },
  { label: "Slot recovery", target: "> 40%", detail: "Released slots refilled from the waitlist same day" },
  { label: "Confirm response rate", target: "> 60%", detail: "Patients responding to the T-2h confirm prompt" },
  { label: "Reservation reliability", target: "> 90%", detail: "Medicine & test reservations honoured on arrival" },
];
