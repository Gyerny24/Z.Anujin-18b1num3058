import React from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import "./userDetail.css";
import Axios from "axios";
/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  //window.cs142models.userModel(this.props.match.params.userId)
  fetcher = () => {
    Axios.get(`/user/${this.props.match.params.userId}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ user: data });
        this.props.stateEvent("Detail of", data.first_name);
      });
  };
  componentDidMount() {
    this.fetcher();
  }
  componentDidUpdate(prevprops) {
    if (prevprops.match.params.userId !== this.props.match.params.userId) {
      this.fetcher();
    }
  }
  render() {
    return (
      <div className="Paper">
        <Typography variant="h2">
          <b>{`${this.state.user.first_name} ${this.state.user.last_name}`}</b>
        </Typography>
        <Typography
          variant="h4"
          style={{ marginTop: "10px" }}
        >{`Description: "${this.state.user.description}"`}</Typography>
        <Typography
          variant="h4"
          style={{ marginTop: "10px" }}
        >{`Location: ${this.state.user.location}`}</Typography>
        <Typography
          variant="h4"
          style={{ marginTop: "10px" }}
        >{`Occupation: ${this.state.user.occupation}`}</Typography>
        <Link
          to={{
            pathname: `/photos/${this.props.match.params.userId}`,
            state: {
              name: this.state.user.first_name,
              isEz: this.props.isEz,
            },
          }}
        >
          <Button
            color="primary"
            variant="contained"
            style={{ marginTop: "20px" }}
          >
            Зураг үзэх
          </Button>
        </Link>
      </div>
    );
  }
}

export default UserDetail;
