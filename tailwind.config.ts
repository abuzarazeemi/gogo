module.exports = {
  // mode: 'jit',
  purge: [
    './**/*.html',
    // './**/*.{js,jsx,ts,tsx,vue}',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    
    extend: {
      textDecoration: ['active'],
      
      // fontFamily: {
      //   'eina': ['Eina'],
      // },
      
      fontWeight: {
        hairline: 100,
        'extra-light': 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 1000,
        extrabold: 800,
        'extra-bold': 800,
        black: 900,
      },

      height: {
          hero: '500px',
          48: '12rem',
          52: '13rem',
          56: '14rem',
          60: '15rem',
          64: '16rem',
          68: '17rem',
          72: '18rem',
          80: '20rem',
          88: '22rem',
          96: '24rem',
          104: '26rem',
          112: '28rem',
          120: '30rem',
          124: '31rem',
          128: '32rem',
          132: '33rem',
          136: '34rem',
          140: '35rem',
          144: '36rem'
       },
       width: {
        28: '7rem',
        c_large: '1200px',
        38: '10rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        68: '17rem',
        72: '18rem',
        80: '20rem',
        82: '23rem',
        88: '22rem',
        96: '24rem',
        104: '26rem',
        112: '28rem',
        120: '30rem',
        124: '31rem',
        128: '32rem',
        132: '33rem',
        136: '34rem',
        140: '35rem',
        144: '36rem',
        'flex-half': 'calc((100%/2) - 15px)',
        'flex-fourth': 'calc((100% / 4) - 20px)'
      },
      //  margin: {
      //   "22": '5.23rem'
      //  }
      backgroundImage: (theme) => ({
        'parcel': "url('/img/pickup.jpg')",
      }),
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
