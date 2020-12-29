import React, { Component } from "react";
import "./Profile.css";
import { baseURL } from "../../container/App";

class Profile extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    console.log("profile constructor user =", user);

    this.state = {
      name: user.name,
      age: user.age,
      pet: user.pet,
    };
  }

  onFormChange = (event) => {
    console.log("form onchange");

    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "user-age":
        this.setState({ age: event.target.value });
        break;
      case "user-pet":
        this.setState({ pet: event.target.value });
        break;
      default:
        return;
    }
  };
  onFormSubmit = (data) => {
    console.log("##doing form submit", this.state);
    const { toggleModal, loadUser, user } = this.props;
    fetch(`${baseURL}/profile/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        formInput: this.state,
      }),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 304) {
          toggleModal();
          // update the app user with the data
          console.log("about to load user", this.state);
          loadUser({ ...this.props.user, ...this.state });
        }
      })
      .catch((err) => console.log("!!error submitting form=", err));
  };

  componentDidMount() {
    const token = window.sessionStorage.getItem("token");
    console.log("###component did mount ");

    if (token) {
      fetch(`${baseURL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: token,
        },
      })
        .then((data) => {
          console.log("###success we got CDM DATA");

          if (data && data.id) {
            console.log("###success we need to get user  profile");
          }
        })
        .catch((err) => console.log("!!error component did mount=", err));
    }
  }

  render() {
    const { toggleModal, user } = this.props;
    const { name, age, pet } = this.state;
    console.log("rendering form user= ", user);
    return (
      <div className="profile-modal">
        <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 grow center shadow-5 bg-white">
          <div className="measure pa4 w-80">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className=" h3 w3 dib"
              alt="avatar"
            />
            <h1>{this.state.name}</h1>
            <h4>{`images submitted : ${user.entries}`}</h4>
            {/* Date manipulation */}
            <p>{`Member since ${new Date(
              user.joined
            ).toLocaleDateString()}`}</p>
            <hr />
            <label className="mt2 fw6 " htmlFor="user-name">
              Name
            </label>
            <input
              className="pa2 ba  w-100 "
              type="text"
              placeholder={user.name}
              name="user-name"
              id="name"
              onChange={this.onFormChange}
            />
            <label className="mt2 fw6 " htmlFor="user-age">
              Age
            </label>
            <input
              className="pa2 ba  w-100 "
              type="text"
              placeholder={user.age}
              name="user-age"
              id="age"
              onChange={this.onFormChange}
            />
            <label className="mt2 fw6 " htmlFor="user-pet">
              Pet
            </label>
            <input
              className="pa2 ba  w-100 "
              type="text"
              placeholder={user.pet}
              name="user-pet"
              id="pet"
              onChange={this.onFormChange}
            />

            <div
              className="mt4 "
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                onClick={() => this.onFormSubmit(name, age, pet)}
              >
                Save
              </button>
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </div>
          {/* this is the X at the top right of the form */}
          <div className="modal-close h1" onClick={toggleModal}>
            &times;
          </div>
        </article>
      </div>
    );
  }
}
export default Profile;
