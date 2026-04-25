export interface DemoReservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests: string;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
}

export interface DemoTourBooking {
  id: string;
  name: string;
  email: string;
  tourId: "park" | "sloths" | "bribri" | "dolphins";
  tourLabel: string;
  date: string;
  participants: number;
  pricePerPerson: number;
  totalAmount: number;
  status: "paid" | "pending" | "refunded";
  paymentRef: string;
  createdAt: string;
}

export const DEMO_RESERVATIONS: DemoReservation[] = [
  {
    id: "RES-2025-001",
    name: "Marie & Pierre Laurent",
    email: "marie.laurent@gmail.com",
    phone: "+33 6 12 34 56 78",
    date: "2025-05-15",
    time: "19:00",
    partySize: 4,
    specialRequests: "One guest has a shellfish allergy",
    status: "confirmed",
    createdAt: "2025-05-10T14:23:00Z",
  },
  {
    id: "RES-2025-002",
    name: "James Wilson",
    email: "j.wilson@outlook.com",
    phone: "+44 7700 900123",
    date: "2025-05-15",
    time: "20:00",
    partySize: 2,
    specialRequests: "",
    status: "confirmed",
    createdAt: "2025-05-11T09:05:00Z",
  },
  {
    id: "RES-2025-003",
    name: "Sofia & Tomas Müller",
    email: "tomas.mueller@web.de",
    phone: "+49 151 23456789",
    date: "2025-05-16",
    time: "18:30",
    partySize: 5,
    specialRequests: "Two children (ages 8 and 10), high chairs if available",
    status: "confirmed",
    createdAt: "2025-05-11T16:40:00Z",
  },
  {
    id: "RES-2025-004",
    name: "Ana Rodríguez",
    email: "ana.rodriguez@gmail.com",
    phone: "+506 8321 4567",
    date: "2025-05-17",
    time: "13:00",
    partySize: 3,
    specialRequests: "",
    status: "pending",
    createdAt: "2025-05-12T08:15:00Z",
  },
  {
    id: "RES-2025-005",
    name: "David & Emma Thompson",
    email: "ethompson@hotmail.com",
    phone: "+1 617 555 0198",
    date: "2025-05-18",
    time: "19:30",
    partySize: 2,
    specialRequests: "Celebrating anniversary — a candle on the table would be lovely",
    status: "confirmed",
    createdAt: "2025-05-12T11:22:00Z",
  },
  {
    id: "RES-2025-006",
    name: "Yuki Tanaka",
    email: "yuki.tanaka@yahoo.co.jp",
    phone: "+81 90 1234 5678",
    date: "2025-05-18",
    time: "18:00",
    partySize: 6,
    specialRequests: "Group trip — please seat us together",
    status: "confirmed",
    createdAt: "2025-05-13T07:00:00Z",
  },
  {
    id: "RES-2025-007",
    name: "Carlos Herrera",
    email: "carlos.herrera@correo.cr",
    phone: "+506 7654 3210",
    date: "2025-05-19",
    time: "20:30",
    partySize: 2,
    specialRequests: "",
    status: "pending",
    createdAt: "2025-05-14T19:10:00Z",
  },
  {
    id: "RES-2025-008",
    name: "Isabelle Dupont",
    email: "idupont@laposte.net",
    phone: "+33 1 23 45 67 89",
    date: "2025-05-14",
    time: "19:00",
    partySize: 4,
    specialRequests: "Vegetarian menu for two guests",
    status: "cancelled",
    createdAt: "2025-05-09T12:00:00Z",
  },
];

export const DEMO_TOUR_BOOKINGS: DemoTourBooking[] = [
  {
    id: "TOUR-2025-001",
    name: "James Wilson",
    email: "j.wilson@outlook.com",
    tourId: "park",
    tourLabel: "Cahuita National Park Snorkel",
    date: "2025-05-16",
    participants: 2,
    pricePerPerson: 45,
    totalAmount: 90,
    status: "paid",
    paymentRef: "pi_test_3NqUP2K2eZvKYlo2",
    createdAt: "2025-05-11T09:12:00Z",
  },
  {
    id: "TOUR-2025-002",
    name: "Sofia & Tomas Müller",
    email: "tomas.mueller@web.de",
    tourId: "sloths",
    tourLabel: "Sloth Sanctuary",
    date: "2025-05-17",
    participants: 4,
    pricePerPerson: 35,
    totalAmount: 140,
    status: "paid",
    paymentRef: "pi_test_5MkVQ3L3fAwLZmp3",
    createdAt: "2025-05-11T17:05:00Z",
  },
  {
    id: "TOUR-2025-003",
    name: "Marie Laurent",
    email: "marie.laurent@gmail.com",
    tourId: "dolphins",
    tourLabel: "Dolphin Watching at Manzanillo",
    date: "2025-05-16",
    participants: 2,
    pricePerPerson: 55,
    totalAmount: 110,
    status: "paid",
    paymentRef: "pi_test_7GrTR4M4gBxMAoq4",
    createdAt: "2025-05-10T14:35:00Z",
  },
  {
    id: "TOUR-2025-004",
    name: "David Thompson",
    email: "ethompson@hotmail.com",
    tourId: "bribri",
    tourLabel: "Bribri Indigenous Territory Day",
    date: "2025-05-19",
    participants: 2,
    pricePerPerson: 75,
    totalAmount: 150,
    status: "paid",
    paymentRef: "pi_test_9ItUS5N5hCyNBpr5",
    createdAt: "2025-05-12T11:30:00Z",
  },
  {
    id: "TOUR-2025-005",
    name: "Ana Rodríguez",
    email: "ana.rodriguez@gmail.com",
    tourId: "park",
    tourLabel: "Cahuita National Park Snorkel",
    date: "2025-05-17",
    participants: 3,
    pricePerPerson: 45,
    totalAmount: 135,
    status: "pending",
    paymentRef: "",
    createdAt: "2025-05-12T08:20:00Z",
  },
  {
    id: "TOUR-2025-006",
    name: "Yuki Tanaka",
    email: "yuki.tanaka@yahoo.co.jp",
    tourId: "sloths",
    tourLabel: "Sloth Sanctuary",
    date: "2025-05-18",
    participants: 6,
    pricePerPerson: 35,
    totalAmount: 210,
    status: "paid",
    paymentRef: "pi_test_2HqTS6O6iDzOCqs6",
    createdAt: "2025-05-13T07:15:00Z",
  },
  {
    id: "TOUR-2025-007",
    name: "Carlos Herrera",
    email: "carlos.herrera@correo.cr",
    tourId: "dolphins",
    tourLabel: "Dolphin Watching at Manzanillo",
    date: "2025-05-20",
    participants: 2,
    pricePerPerson: 55,
    totalAmount: 110,
    status: "pending",
    paymentRef: "",
    createdAt: "2025-05-14T19:15:00Z",
  },
  {
    id: "TOUR-2025-008",
    name: "Isabelle Dupont",
    email: "idupont@laposte.net",
    tourId: "bribri",
    tourLabel: "Bribri Indigenous Territory Day",
    date: "2025-05-15",
    participants: 2,
    pricePerPerson: 75,
    totalAmount: 150,
    status: "refunded",
    paymentRef: "pi_test_4JsVT7P7jEAPDrt7",
    createdAt: "2025-05-09T12:10:00Z",
  },
];
