export const registrationTypes = {
  hospital: {
    slug: "hospital",
    label: "Hospital & Clinic",
    icon: "building",
    heading: "Register your hospital or clinic",
    intro:
      "Give your facility live queues, doctor rosters and the ghosting-prevention engine — without replacing what you already run.",
    certificateLabel: "Hospital / Clinic registration certificate",
    certificateHint: "Government-issued establishment registration or clinical establishment licence (PDF, JPG or PNG).",
    idLabel: "Registration / licence number",
    moduleOptions: [
      { id: "appointments", label: "Appointments & Ghosting Prevention", note: "Included for every facility" },
      { id: "inpatient", label: "In-Patient Management", note: "Wards, beds, admission & discharge" },
      { id: "in-house-pharmacy", label: "In-house Pharmacy", note: "Dispensing, stock & billing" },
      { id: "in-house-labs", label: "In-house Labs", note: "Test catalogue & report upload" },
      { id: "cabin-rental", label: "Cabin Rental for Visiting Doctors", note: "Flat rent or revenue-share terms" },
    ],
  },
  pharmacy: {
    slug: "pharmacy",
    label: "Pharmacy",
    icon: "storefront",
    heading: "Register your pharmacy",
    intro:
      "List real-time stock so nearby patients find you first — reservations are holds, payment stays in your store.",
    certificateLabel: "Drug licence certificate",
    certificateHint: "Retail/wholesale drug licence issued under the Drugs & Cosmetics Act (PDF, JPG or PNG).",
    idLabel: "Drug licence number",
    moduleOptions: [
      { id: "catalogue", label: "Inventory & Catalogue Listing", note: "Included for every pharmacy" },
      { id: "reservations", label: "Patient Reservations", note: "Order queue with hold & release" },
      { id: "billing", label: "Billing & Tax Invoices", note: "Tax-compliant receipt generation" },
    ],
  },
  labs: {
    slug: "labs",
    label: "Labs & Diagnostics",
    icon: "flask",
    label2: "Labs & Diagnostics",
    heading: "Register your diagnostic lab",
    intro:
      "Publish your test menu and packages, take bookings, and deliver verified reports straight into a patient's record.",
    certificateLabel: "Lab registration / accreditation certificate",
    certificateHint: "NABL accreditation or applicable state lab registration (PDF, JPG or PNG).",
    idLabel: "Registration / accreditation number",
    moduleOptions: [
      { id: "catalogue", label: "Test & Package Catalogue", note: "Included for every lab" },
      { id: "bookings", label: "Sample Collection & Bookings", note: "Home or in-lab visit scheduling" },
      { id: "reports", label: "Verified Report Delivery", note: "Delivered to patient & referring doctor" },
    ],
  },
};
