const devURL = "http://52.10.109.137/";

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
