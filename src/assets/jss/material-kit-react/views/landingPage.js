import { container, title } from "assets/jss/material-kit-react";


const landingPageStyle = {
  container: {
    zIndex: "2",
    color: "#FFFFFF",
    ...container
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: 500,
    fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", \"sansSerif\"",
    fontSize: '45px'
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0",
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    '@media (max-width: 450px)': {
      margin: "-60px 0px 0px",
    },
  },
  ptext: {
    lineHeight: "30px",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 1)",
    fontWeight: "500"
  },
  demoParallaxTextOuter: {
    color: '#fff',
    padding: '0 50px',
    zIndex: 2,
    '@media (max-width: 1199px)': {
      padding: "0 30px"
    },
    '@media (min-width: 1200px)': {
      padding: "0 0"
    },
    maxWidth: "1140px",
    margin: "auto"
  }
};

export default landingPageStyle;
