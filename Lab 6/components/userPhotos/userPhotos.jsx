import React from "react";
import { Typography } from "@material-ui/core";
import "./userPhotos.css";
import { red } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import TextMobileStepper from "./TextMobileStepper";
import Axios from "axios";

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      comments: [],
      users: [],
    };
  }
  userFetcher = () => {
    Axios.get("user/list")
      .then((res) => res.json())
      .then((data) => this.setState({ users: data }));
  };
  fetcher = () => {
    Axios.get(`/photosOfUser/${this.props.match.params.userId}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ photos: data });
        this.props.stateEvent("Photos of", this.props.location.state.name);
      });
  };
  componentDidMount() {
    this.fetcher();
    this.userFetcher();
  }
  componentDidUpdate(prevprops) {
    if (prevprops.match.params.userId !== this.props.match.params.userId) {
      this.fetcher();
    }
  }

  render() {
    return (
      <div>
        {!this.props.isEz ? (
          <div className="PhotoPaper">
            {this.state.photos.map((el, ind) => {
              return (
                <div className="commentSection" key={ind}>
                  <img src={`images/${el.file_name}`} height="150px" />
                  <div style={{ marginLeft: "30px" }}>
                    <Typography variant="h5">
                      <b>Comments</b>
                    </Typography>
                    <div className="commentDisc">
                      {el.comments ? (
                        <div>
                          <div>
                            {el.comments.map((elem, index) => {
                              return (
                                <div key={index}>
                                  <Typography variant="h6">
                                    Date: {elem.date_time}
                                  </Typography>
                                  <Typography variant="h6">
                                    User:{" "}
                                    <Link to={`/users/${elem.user._id}`}>
                                      {elem.user.first_name}
                                    </Link>
                                  </Typography>
                                  <div style={{ fontSize: "25px" }}>
                                    <Typography variant="h6">
                                      Comment:
                                    </Typography>{" "}
                                    {elem.comment}
                                  </div>
                                  <hr />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="PhotoPaper PhotoPaper1">
            <TextMobileStepper photos={this.state.photos} />
          </div>
        )}
      </div>
    );
  }
}

export default UserPhotos;
