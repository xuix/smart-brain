import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import ImageInputForm from "../components/ImageInputForm/ImageInputForm";
import Rank from "../components/Rank/Rank";
import Particles from "react-particles-js";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import Signin from "../components/Signin/Signin";
import Register from "../components/Register/Register";
import Modal from "../components/Modal/Modal";
import Profile from "../components/Profile/Profile";

const particlesOptions = {
  //customize this to your liking
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const initialState = {
  searchField: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    pet: "",
    age: 0,
    joined: "",
  },
};
//to put on heroku, also need to change the package.json start script
//export const baseURL = "https://mighty-gorge-68030.herokuapp.com"
export const baseURL = "http://localhost:3000";

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  loadUser = (data) => {
    console.log("##loading user", data);
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined,
        pet: data.pet,
        age: data.age,
      },
    });

    console.log("##loading user", this.state.user);
  };

  calculateFaceLocation = (data) => {
    if (data && data.outputs) {
      const regions = data.outputs[0].data.regions;
      const inputImage = document.getElementById("inputimage");
      const width = Number(inputImage.width);
      const height = Number(inputImage.height);
      return regions.map((region) => this.calculateBox(region, width, height));
    } else return;
  };

  calculateBox = (region, width, height) => {
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const clarifaiFace = region.region_info.bounding_box;
    return {
      left: clarifaiFace.left_col * width,
      top: clarifaiFace.top_row * height,
      right: width - width * clarifaiFace.right_col,
      bottom: height - height * clarifaiFace.bottom_row,
    };
  };

  storeFaceLocation = (boxes) => {
    if (boxes) {
      this.setState({ boxes: boxes });
    }
  };

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
    this.setState({ imageUrl: event.target.value });
    this.setState({ boxes: [] });
  };

  onButtonClick = () => {
    console.log("button clicked", this.state.imageUrl);

    // app.models
    //   .predict(
    //     Clarifai.FACE_DETECT_MODEL,
    //     this.state.imageUrl)
    fetch(`${baseURL}/imageApiCall`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ imageURL: this.state.imageUrl }),
    })
      .then((response) => response.json())
      .then((response) => {
        this.storeFaceLocation(this.calculateFaceLocation(response));
        this.updateEntries();
      })
      .catch((err) => console.log(err));
  };

  updateEntries = () => {
    console.log("updatingcount", this.state.user.id);

    fetch(`${baseURL}/image`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ id: this.state.user.id }),
    })
      .then((res) => res.json())
      .then((entries) => {
        //         if (user.id != null){
        console.log("updated count=", entries);

        this.setState(Object.assign(this.state.user, { entries: entries }));
        //         }
      })
      .catch((err) => console.log("Error fetch updating count", err));
  };

  onRouteChange = (route) => {
    console.log("!!clicked routechange", route);
    if (route === "home") this.setState({ isSignedIn: true });
    else if (route === "register") this.setState(initialState);
    this.setState({ route: route });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen,
    }));
  };

  componentDidMount() {
    const token = window.sessionStorage.getItem("token");
    console.log("###component did mount ");

    if (token) {
      fetch(`${baseURL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log("###success we got CDM DATA", data);

          if (data && data.id) {
            console.log("###success we need to get user  profile");
            fetch(`${baseURL}/profile/${data.id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            })
              .then((res) => res.json())
              .then((user) => {
                console.log("about to load user", user);
                if (user && user.email) {
                  this.loadUser(user);
                  this.onRouteChange("home");
                }
              })
              .catch((err) => console.log("!!error submitting form=", err));
          }
        })
        .catch((err) => console.log("!!error component did mount=", err));
    }
  }

  render() {
    const {
      imageUrl,
      isSignedIn,
      boxes,
      route,
      isProfileOpen,
      user,
    } = this.state;

    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
          toggleModal={this.toggleModal}
        />
        {/* if isProfileOpen is true display the Modal */}
        {isProfileOpen && (
          <Modal>
            <Profile
              isProfileOpen={isProfileOpen}
              toggleModal={this.toggleModal}
              user={user}
              loadUser={this.loadUser}
            />
          </Modal>
        )}
        <Logo />
        {route === "home" ? (
          <div>
            <Rank user={this.state.user} />
            <ImageInputForm
              onSearchChange={this.onSearchChange}
              onButtonClick={this.onButtonClick}
            />
            <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
          </div>
        ) : route === "signin" ? (
          <div>
            <Signin
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          </div>
        ) : route === "signout" ? (
          <div>
            <Signin
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          </div>
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}
export default App;
