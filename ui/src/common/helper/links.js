const devURL = "http://127.0.0.1:5000/";

const dev = {
  sign_up: devURL + "user/register",
  login: devURL + "user/login",

  bookings: devURL + "booking",

  hotels: devURL + "hotel",
  rooms: devURL + "roomType",
  book:devURL + "roomType/book",
};

function getLinks() {
  return dev;
}

export default getLinks;
