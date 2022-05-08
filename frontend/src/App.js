import Register from "./components/RegisterPage/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FindReservations from "./components/ManageReservations/FindReservations";
import BookHotel from "./components/BookHotels/BookHotel";
import MyReservations from "./components/MyReservations/MyReservations";
import DisplayHotels from "./components/DisplayHotels/DisplayHotels";
import UserProfile from "./components/UserProfile/UserProfile";
import LoginPage from "./components/LoginPage/Login";
import SingleHotelDetails from "./components/DisplayHotels/SingleHotelDetails";
import NavigationBar from "./components/NavigationBar";
import UserDetails from "./components/UserInformation/UserDetails";
import SeatSelection from "./components/UserInformation/SeatSelection";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <Router>
      <NavigationBar />

      <div className="App">
        <Switch>
          <Route exact path="/">
            <BookHotel />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route path="/reservations">
            <FindReservations />
          </Route>
          <Route
            exact
            path="/userprofile"
            render={(props) => <UserProfile {...props} />}
          ></Route>
          <Route exact path="/booking">
            <MyReservations />
          </Route>
          <Route exact path="/displayhotels">
            <DisplayHotels />
          </Route>
          <Route exact path="/displayhotels/:id">
            <SingleHotelDetails />
          </Route>
          <Route exact path="/booking">
            <MyReservations />
          </Route>
          <Route exact path="/userInfo">
            <UserDetails />
          </Route>
          <Route exact path="/roomSelection">
            <SeatSelection />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
