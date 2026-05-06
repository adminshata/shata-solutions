export const SUPERMARKET1_BASE = "/templates/supermarket-1/preview";
export const SUPERMARKET1_ASSETS = "/templates/supermarket1";

export type SupermarketVendor = {
  handle: string;
  name: string;
  status: "Open" | "Closed";
  logo: string;
  cover: string;
  rating: string;
  address: string;
  phone: string;
};

export const supermarket1Vendors: SupermarketVendor[] = [
  {
    handle: "fresh-juice-bar",
    name: "Fresh Juice Bar",
    status: "Closed",
    logo: `${SUPERMARKET1_ASSETS}/images/vendor/01.svg`,
    cover: `${SUPERMARKET1_ASSETS}/images/vendor/01.jpg`,
    rating: "4.50 out of 5",
    address: "530 Post Ct El Dorado Hills California, United States",
    phone: "+1 (511) 934-8170",
  },
  {
    handle: "food-character",
    name: "Food Character",
    status: "Open",
    logo: `${SUPERMARKET1_ASSETS}/images/vendor/02.svg`,
    cover: `${SUPERMARKET1_ASSETS}/images/vendor/02.jpg`,
    rating: "4.50 out of 5",
    address: "530 Post Ct El Dorado Hills California, United States",
    phone: "+1 (511) 934-8170",
  },
  {
    handle: "food-forulard",
    name: "Food Forulard",
    status: "Open",
    logo: `${SUPERMARKET1_ASSETS}/images/vendor/09.svg`,
    cover: `${SUPERMARKET1_ASSETS}/images/banner/05.jpg`,
    rating: "4.50 out of 5",
    address: "530 Post Ct El Dorado Hills California, United States",
    phone: "+1 (511) 934-8170",
  },
  {
    handle: "organic-farm",
    name: "Organic Farm",
    status: "Open",
    logo: `${SUPERMARKET1_ASSETS}/images/vendor/04.svg`,
    cover: `${SUPERMARKET1_ASSETS}/images/banner/06.jpg`,
    rating: "4.50 out of 5",
    address: "530 Post Ct El Dorado Hills California, United States",
    phone: "+1 (511) 934-8170",
  },
];

export const dashboardProducts = [
  { id: 1, name: "Rede Blue Gradient iPhone Case", no: "#87845", category: "Electronics", price: "$200", stock: 250, image: `${SUPERMARKET1_ASSETS}/images-dashboard/grocery/15.png` },
  { id: 2, name: "Green Blue Gradient iPhone Case", no: "#87845", category: "Electronics", price: "$120", stock: 250, image: `${SUPERMARKET1_ASSETS}/images-dashboard/grocery/16.png` },
  { id: 3, name: "Hree Blue Gradient iPhone Case", no: "#87845", category: "Electronics", price: "$125", stock: 250, image: `${SUPERMARKET1_ASSETS}/images-dashboard/grocery/17.png` },
  { id: 4, name: "Kabir Blue Gradient iPhone Case", no: "#87845", category: "Electronics", price: "$133", stock: 250, image: `${SUPERMARKET1_ASSETS}/images-dashboard/grocery/18.png` },
  { id: 5, name: "leer Blue Gradient iPhone Case", no: "#87845", category: "Electronics", price: "$132", stock: 250, image: `${SUPERMARKET1_ASSETS}/images-dashboard/grocery/19.png` },
];

export const dashboardOrders = [
  { id: "#145278", customer: "Wade Warren", date: "03/02/2022", status: "Processing", total: "$200" },
  { id: "#145279", customer: "Jane Cooper", date: "03/02/2022", status: "Delivered", total: "$120" },
  { id: "#145280", customer: "Robert Fox", date: "03/02/2022", status: "Pending", total: "$125" },
  { id: "#145281", customer: "Esther Howard", date: "03/02/2022", status: "Cancelled", total: "$133" },
];
