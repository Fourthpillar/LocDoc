// Who can log in, and how. Patients and doctors authenticate purely by
// mobile + OTP (per the PRD's shared-services model); facility accounts get
// credentials by email once verified, so they can use either mobile or
// email to log in. "Create an account" only really exists for patients —
// doctors and facilities register through their own dedicated flows
// (/register/doctor, /register/hospital, etc.), so a role without its own
// signup flow gets a "register instead" link back to that page.
export const authRoles = [
  {
    key: "patient",
    label: "Patient",
    icon: "users",
    methods: ["mobile"],
    heading: "Log in to LocDoc",
    lede: "One number for everything — booking, ordering and tracking. New here or coming back, the same number takes you straight in.",
    points: [
      { icon: "bell", text: "Get notified the moment a doctor runs late" },
      { icon: "calendar", text: "One-tap reschedule & waitlist" },
      { icon: "check-circle", text: "Compare medicine & lab-test prices nearby" },
      { icon: "file-text", text: "All your prescriptions & reports, in one place" },
    ],
  },
  {
    key: "doctor",
    label: "Doctor",
    icon: "stethoscope",
    methods: ["mobile"],
    heading: "Doctor login",
    lede: "Set your live status, manage your schedule across facilities, and see your punctuality score.",
    points: [
      { icon: "radar", text: "Set your live status & let patients see your ETA" },
      { icon: "calendar", text: "Manage your schedule across every facility" },
      { icon: "badge-check", text: "Track your punctuality score & raise corrections" },
      { icon: "shield-check", text: "Your verified badge, visible on every profile" },
    ],
    registerLink: { to: "/register/doctor", label: "New doctor? Register & get verified" },
  },
  {
    key: "hospital",
    label: "Hospital & Clinic",
    icon: "building",
    methods: ["mobile", "email"],
    heading: "Facility login",
    lede: "Run your queue, roster and billing from one place.",
    points: [
      { icon: "building", text: "Live queue, appointments & reception panel" },
      { icon: "users", text: "Manage your doctor roster & staff accounts" },
      { icon: "file-text", text: "Tax-compliant billing & receipts" },
      { icon: "trending-up", text: "Facility dashboard — volume, revenue, punctuality" },
    ],
    registerLink: { to: "/register/hospital", label: "New facility? Register your hospital or clinic" },
  },
  {
    key: "pharmacy",
    label: "Pharmacy",
    icon: "storefront",
    methods: ["mobile", "email"],
    heading: "Pharmacy login",
    lede: "Manage stock, reservations and orders.",
    points: [
      { icon: "storefront", text: "Two-tap in-stock / out-of-stock toggle" },
      { icon: "bell", text: "Incoming reservation alerts" },
      { icon: "clock", text: "Hold windows with automatic release" },
      { icon: "file-text", text: "Billing & drug-sale record-keeping" },
    ],
    registerLink: { to: "/register/pharmacy", label: "New pharmacy? Register your store" },
  },
  {
    key: "labs",
    label: "Labs & Diagnostics",
    icon: "flask",
    methods: ["mobile", "email"],
    heading: "Lab login",
    lede: "Manage your test catalogue, bookings and reports.",
    points: [
      { icon: "flask", text: "Manage your test & package catalogue" },
      { icon: "calendar", text: "Sample-collection & visit bookings" },
      { icon: "file-text", text: "Upload lab-verified reports" },
      { icon: "users", text: "Manage staff access" },
    ],
    registerLink: { to: "/register/labs", label: "New lab? Register your diagnostics centre" },
  },
];
