import {createTheme} from '@rneui/themed';

const appTheme = createTheme({
  lightColors: {
    primary: '#4338CA',
    background: 'white',
  },
  darkColors: {
    primary: '#4338CA',
    background: 'black',
  },
  components: {
    Text: {
      h1Style: {
        fontFamily: 'Montserrat-Bold',
        fontWeight: '500',
      },
      h2Style: {
        fontFamily: 'Montserrat-Regular',
        fontWeight: '300',
      },
      h3Style: {
        fontFamily: 'Montserrat-Medium',
        fontWeight: '200',
      },
      h4Style: {
        fontFamily: 'Montserrat-Thin',
        fontWeight: '100',
      },
    },
    Button: {
      titleStyle: {fontFamily: 'Montserrat-SemiBold'},
      containerStyle: {
        marginVertical: 10,
        borderRadius: 5,
      },
      buttonStyle: {
        minWidth: '100%',
        height: 45,
        borderRadius: 5,
      },
    },
  },
});

export default appTheme;
