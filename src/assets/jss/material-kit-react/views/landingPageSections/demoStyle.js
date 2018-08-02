import { title } from 'assets/jss/material-kit-react';

const attrWidth = 200;
const attrPadding = 10;

const demoStyle = {
  section: {
    padding: '70px 0',
    textAlign: 'center'
  },
  title: {
    ...title,
    marginBottom: '1rem',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none',
    fontSize: '27px'
  },
  description: {
    color: '#999'
  },
  dropzoneText: {
    lineHeight: '50px',
    margin: '0px',
    fontSize: '18px'
  },
  dropzoneBox: {
    color: '#666',
    height: '50px',
    width: '200px',
    margin: 'auto',
    borderWidth: '2px',
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: '5px',
    marginTop: '20px',
    cursor: 'pointer',
    '&:hover': {
      // backgroundColor: "#fafafa",
      color: '#4ab848',
      borderColor: '#4ab848'
    }
  },
  carouselPane: {
    color: '#333',
    userSelect: 'text'
  },
  regImageContainer: {
    position: 'relative'
    // maxWidth: '400px',
    // maxHeight: '400px',
  },
  regImg: {
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto',
    borderRadius: '6px',
    boxShadow:
      '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)'
  },
  svgbboxContainer: {
    position: 'relative',
    margin: 'auto'
  },
  svgMask: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0'
  },
  svgbbox: {
    // position: 'absolute',
    // top: '0',
    // left: '0',
  },
  regImageProps: {
    // marginLeft: "400px",
    overflow: 'hidden',
    margin: '10px auto 0',
    fontSize: '16px',
    '@media (max-width: 1200px)': {
      fontSize: '12px'
    },
    '@media (max-width: 600px)': {
      margin: '30px auto 0'
    }
  },
  svgRect: {
    fill: 'transparent',
    stroke: '#4ab848',
    strokeWidth: 3,
    fillOpacity: 0,
    strokeOpacity: 1
  },
  attrTitle: {
    fontWeight: '500',
    color: '#666',
    textAlign: 'right'
  },
  attrValue: {
    fontWeight: '400',
    color: '#333',
    textAlign: 'left',
    minHeight: '30px',
    position: 'relative'
  },
  loadingImg: {
    display: 'block',
    margin: 'auto',
    maxHeight: '180px',
    marginTop: '10px'
  },
  loadingText: {
    marginTop: '20px'
  },
  loadingContainer: {
    color: '#4ab848'
  },
  firstPaneOuter: {
    position: 'relative'
  },
  loadingOuter: {
    position: 'absolute',
    opacity: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    transition: 'opacity 0.1s ease-in'
  },
  show: {
    opacity: 1
  },
  errorOuter: {
    color: '#721c24',
    backgroundColor: '#f8d7da',
    padding: '.75rem 1.25rem',
    border: '1px solid #f5c6cb',
    borderRadius: '.25rem',
    maxWidth: '360px',
    fontSize: '16px',
    margin: 'auto'
  },
  actionButtons: {
    textAlign: 'center'
  },
  confindenceBar: {
    position: 'relative',
    top: '4px',
    marginBottom: '0'
    // paddingRight: '0'
  },
  attrValueItem: {
    position: 'relative'
  },
  emotionsItem: {
    position: 'relative',
    minHeight: '30px'
  },
  attrIcons: {
    marginTop: '-2px'
  },
  resultsOuter: {
    '@media (max-width: 576px)': {
      padding: '5px'
    },
    '@media (max-width: 1200px)': {
      padding: '10px'
    },
    overflow: 'hidden',
    padding: '40px'
  },
  matchImg: {
    maxWidth: '100%',
    display: 'block',
    margin: 'auto',
    maxHeight: '100%'
  },
  resultItem: {
    overflow: 'hidden',
    margin: '10px 0',
    boxSizing: 'border-box',
    padding: '20px',
    '@media (max-width: 1200px)': {
      fontSize: '12px'
    }
  },
  resultItemInner: {
    height: '280px'
  },
  topResultsOuter: {
    '@media (max-width: 576px)': {
      padding: '0 5px'
    },
    '@media (max-width: 900px)': {
      padding: '0 20px'
    },
    '@media (max-width: 1200px)': {
      padding: '0 30px',
      fontSize: '12px'
    },
    padding: '0 100px'
  },
  resultTitle: {
    background: '#eee',
    padding: '10px',
    marginBottom: '10px'
  }
};

export default demoStyle;
