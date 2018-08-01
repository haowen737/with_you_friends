import { css } from 'react-emotion'

export default css({
  position: 'absolute',
  lineHeight: 1,
  marginLeft: '8%',
  textAlign: 'left',
  animation: 'content-wrap-animation .5s linear',
  '& .buttonStyle': {
    display: 'inline-block',
    backgroundColor: '#000',
    color: '#fff',
    padding: '1.5rem 2.3rem',
    margin: '1rem 0',
    cursor: 'pointer',
    transition: 'all .5s ease',
    transitionDelay: '.6',
  },
  '& .heroSummary': {
    fontSize: '1.7rem',
    fontWeight: 300,
    color: 'rgba(0,0,0,0.4)',
    margin: '1rem 0',
  },
  '& .herotitle': {
    position: 'relative',
    fontSize: '5rem',
    color: '#191919',
    textIndent: '-0.2rem',
  },
  '& .typeWritter': {
    position: 'relative',
    color: '#666',
  },
  '& .typeWritter::after': {
    content: '',
    margin: 'auto',
    position: 'absolute',
    right: -4,
    top: 10,
    width: 1,
    height: '70%',
    backgroundColor: '#666',
    animation: 'cursor-animation 1.5s step-end infinite',
  },
  '& .hero-title-br': {
    display: 'none',
    '@media (max-width: 1200px)': {
      display: 'block'
    }
  },
  '@keyframes cursor-animation': {
    '0%': {
      opacity: 0
    },
    '50%': {
      opacity: 1
    },
    '100%': {
      opacity: 0
    }
  },
  '@keyframes content-wrap-animation': {
    'from': {
      opacity: 0,
      transform: 'translateY(10%)',
    },
    'to': {
      opacity: 1,
      transform: 'translateY(0)',
    }
  }
})