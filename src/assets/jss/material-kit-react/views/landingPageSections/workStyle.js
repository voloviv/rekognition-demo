import { title } from "assets/jss/material-kit-react";

const workStyle = {
  section: {
    padding: "0 0 70px",
    '@media (max-width: 960px)': {
      padding: "0 40px 70px"
    },
    '@media (max-width: 500px)': {
      padding: "0 20px 70px"
    }
  },
  title: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px'
  },
  description: {
    color: "#999",
    textAlign: "center"
  },
  textCenter: {
    textAlign: "center",
    width:'100%'
  },
  textArea: {
    marginRight: "15px",
    marginLeft: "15px",
    marginBottom: "15px"
  }
};

export default workStyle;
