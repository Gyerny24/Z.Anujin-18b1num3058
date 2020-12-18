import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 400,
    maxWidth: 600,
    overflow: "hidden",
    display: "block",
    width: "100%",
  },
  comments: {
    maxWidth: 500,
  },
}));

export default function TextMobileStepper(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.photos.length;
  console.log(props.photos);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      {props.photos ? (
        <div className={classes.root}>
          <Paper square elevation={0} className={classes.header}>
            <Typography>
              {props.photos[activeStep]
                ? props.photos[activeStep].date_time
                : null}
            </Typography>
          </Paper>
          <img
            className={classes.img}
            src={`/images/${
              props.photos[activeStep]
                ? props.photos[activeStep].file_name
                : null
            }`}
          />
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
          <div>
            <Typography variant="h6" style={{ padding: "20px 0 20px 0" }}>
              COMMENTS
            </Typography>
            <Grid container className={classes.comments}>
              {props.photos[activeStep] ? (
                <div>
                  {props.photos[activeStep].comments ? (
                    <div>
                      {props.photos[activeStep].comments.map((el, ind) => {
                        return (
                          <Grid item xs={12} key={ind}>
                            <Typography>
                              {`${el.date_time}`}{" "}
                              <Link to={`/users/${el.user._id}`}>
                                {el.user.first_name}
                              </Link>
                            </Typography>
                            <div>{el.comment}</div>
                            <hr />
                          </Grid>
                        );
                      })}
                    </div>
                  ) : (
                    "==============================="
                  )}{" "}
                </div>
              ) : (
                ""
              )}
            </Grid>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
