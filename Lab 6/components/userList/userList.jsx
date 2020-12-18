import React from "react";
import { Link } from "react-router-dom";
import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import "./userList.css";
import Axios from "axios";

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    Axios.get("user/list")
      .then((res) => res.json())
      .then((data) => this.setState({ data: data }));
  }
  render() {
    console.log("---------------------------> userList ok");
    let data = this.state.data;
    return (
      <div>
        <Link to="/">
          <Typography variant="h6" style={{ marginBottom: "20px" }}>
            HOME
          </Typography>
        </Link>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.props.isEz}
                onChange={this.props.ezPhotosChanger}
                color="primary"
              />
            }
            label="Зургаа гоёор харах"
          />
        </FormGroup>
        <Typography variant="body1" style={{ marginTop: "10px" }}>
          USERS:
        </Typography>
        <List component="nav">
          {data.map((el, ind) => {
            return (
              <Link key={ind} to={`/users/${el._id}`}>
                <ListItem>
                  <ListItemText primary={el.first_name} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </div>
    );
  }
}

export default UserList;
