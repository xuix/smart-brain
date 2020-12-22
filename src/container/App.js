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
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: "",
  },
};

//export const baseURL = "https://mighty-gorge-68030.herokuapp.com"
export const baseURL = "http://localhost:3000";

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined,
      },
    });

    console.log("##loading user", this.state.user);
  };

  calculateFaceLocation = (data) => {
    const regions = data.outputs[0].data.regions;
    const inputImage = document.getElementById("inputimage");
    const width = Number(inputImage.width);
    const height = Number(inputImage.height);
    return regions.map((region) => this.calculateBox(region, width, height));
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
    this.setState({ boxes: boxes });
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
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
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
    else this.setState(initialState);
    this.setState({ route: route });
  };

  componentDidMount() {
    // fetch('http://localhost:3000')
    // .then(resp=>resp.json())
    // .then(data=>console.log(data))
    // console.log('!!!!!!!!')
  }

  render() {
    const { imageUrl, isSignedIn, boxes, route } = this.state;

    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
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
