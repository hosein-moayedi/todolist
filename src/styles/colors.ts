/**
 * Real color names
 */
const realColor = {
  aquamarine: '#56FAD2', // aquamarine
  barleWhite: '#FFF3CC', // light-yellow
  cadetBlue: '#AAABC0', // dark-gray
  chateauGreen: '#33B153', // green
  cosmos: '#FFD8D6', // light-red
  dodgerBlue: '#396ffa', // blue
  dodgerBlueLight: '#396FFA60', // light-blue
  dodgerBlueUltraLight: '#396FFA10', // ultra-light-blue
  geraldine: '#FA7D75', // pale-red
  gunPowder: '#424356', // black
  mustard: '#FFD850', // yellow
  mystic: '#DBDDEB', // gray
  pappermint: '#D8F3DB', // pale-green
  scandal: '#C9FAEE', // light-green
  scarlet: '#F21F13', // red
  selago: '#FAFAFE', // ultra-light-grey
  transparent: 'transparent', // transparent
  white: '#FFFFFF', // white
  whiteLilac: '#F5F6FC', // light-grey
  zircon: '#ECF2FF', // milk
  krayola: '#7171cc', // blue krayola
};

/**
 * App color names
 */
const colors = {
  /**
   * Common
   */
  black: realColor.gunPowder,
  white: realColor.white,
  blue: realColor.dodgerBlue,
  cadetBlue: realColor.cadetBlue,
  dodgerBlueUltraLight: realColor.dodgerBlueUltraLight,
  whiteLilac: realColor.whiteLilac,
  mystic: realColor.mystic,
  scarlet: realColor.scarlet,
  mustard: realColor.mustard,
  chateauGreen: realColor.chateauGreen,
  transparent: realColor.transparent,
  geraldine: realColor.geraldine,
  zircon: realColor.zircon,
  krayola: realColor.krayola,
  selago: realColor.selago,

  /**
   * Text
   */
  textBlack: realColor.gunPowder,
  textGray: realColor.cadetBlue,
  textBlue: realColor.dodgerBlue,
  textRed: realColor.scarlet,
  textGreen: realColor.chateauGreen,
  textWhite: realColor.white,
  textDanger: realColor.scarlet,

  /**
   * Buttons
   */
  buttonDefaultBackground: realColor.transparent,
  buttonDefaultText: realColor.dodgerBlue,
  buttonPrimaryBackground: realColor.dodgerBlue,
  buttonPrimaryText: realColor.white,
  buttonSecondaryBackground: realColor.white,
  buttonSecondaryText: realColor.dodgerBlue,
  buttonDisabledBackground: realColor.mystic,
  buttonDisabledText: realColor.white,
  buttonTransparentDisabledText: realColor.cadetBlue,

  /**
   * Toggles
   */
  toggleActive: realColor.dodgerBlue,
  toggleNonActive: realColor.mystic,
  toggleDisabledActive: realColor.dodgerBlueLight,
  toggleDisabledNonActive: realColor.whiteLilac,

  /**
   * Radio buttons
   */
  radioActiveBackground: realColor.dodgerBlue,
  radioActiveBorder: realColor.dodgerBlue,
  radioNonActiveBackground: realColor.transparent,
  radioNonActiveBorder: realColor.cadetBlue,
  radioDisabledActiveBackground: realColor.dodgerBlueLight,
  radioDisabledActiveBorder: realColor.dodgerBlueLight,
  radioDisabledNonActiveBackground: realColor.transparent,
  radioDisabledNonActiveBorder: realColor.mystic,

  /**
   * Operation buttons
   */
  lightRedOperationBtn: realColor.cosmos,
  violetOperationBtn: realColor.zircon,
  lightGreenOperationBtn: realColor.scandal,
  lightYellowOperationBtn: realColor.barleWhite,

  /**
   * Checkboxes
   */
  checkboxActiveBackground: realColor.dodgerBlue,
  checkboxActiveBorder: realColor.transparent,
  checkboxNonActiveBackground: realColor.transparent,
  checkboxNonActiveBorder: realColor.cadetBlue,
  checkboxDisabledActiveBackground: realColor.dodgerBlueLight,
  checkboxDisabledActiveBorder: realColor.transparent,
  checkboxDisabledNonActiveBackground: realColor.transparent,
  checkboxDisabledNonActiveBorder: realColor.mystic,

  /**
   * Inputs
   */
  inputValue: realColor.gunPowder,
  inputPlaceholder: realColor.cadetBlue,
  inputBackground: realColor.white,
  inputDisabledBackground: realColor.whiteLilac,
  inputActiveBorder: realColor.dodgerBlue,
  inputNonActiveBorder: realColor.mystic,
  inputErrorBorder: realColor.scarlet,
  inputErrorLabel: realColor.scarlet,

  /**
   * Icons
   */
  iconActive: realColor.dodgerBlue,
  iconNonActive: realColor.cadetBlue,
  iconBlockActiveBackground: realColor.zircon,
  iconBlockNonActiveBackground: realColor.whiteLilac,

  /**
   * RoleCard
   */
  roleCardArrowBackground: realColor.dodgerBlueUltraLight,
  roleCardArrowBorder: realColor.selago,
  roleCardBackground: realColor.zircon,

  /**
   * Notification
   */
  notificationBlueButton: realColor.dodgerBlue,
  notificationBorder: realColor.whiteLilac,
  notificationCancelText: realColor.cadetBlue,
  notificationDescription: realColor.cadetBlue,
  notificationTitle: realColor.gunPowder,
  noftificationShadow: realColor.gunPowder,
  noftificationBackground: realColor.white,

  notificationSuccess: realColor.pappermint,
  notificationError: realColor.cosmos,
  notificationWarning: realColor.barleWhite,
  notificationInfo: realColor.zircon,
  notificationRequest: realColor.dodgerBlue,

  /**
   * Tab nav
   */
  tabNavLine: realColor.whiteLilac,
  tabNavLineActive: realColor.dodgerBlue,

  /**
   * Home screen
   */
  homeHeaderBackground: realColor.whiteLilac,

  /**
   * Avatar in profile screen
   */
  avatarProfile: realColor.zircon,
  avatarShadow: realColor.gunPowder,
  avatarIconDisabled: realColor.mystic,
  avatarIconActive: realColor.dodgerBlue,
  avatarDisabledItem: realColor.whiteLilac,

  /**
   * Transaction list
   */
  transactionBackground: realColor.white,
  transactionWhiteLilac: realColor.whiteLilac,
  transactionCircle: realColor.mustard,
  transactionBlack: realColor.gunPowder,
  transactionSubtitle: realColor.cadetBlue,
  transactionHiddenItemBackground: realColor.dodgerBlue,

  /**
   * Sign up in
   */
  signUpInHeaderYellow: realColor.mustard,
  languageSelectionChosenBorder: realColor.dodgerBlue,

  /*
   * SCREEN: Add new Person
   */
  personPhotoBackground: realColor.whiteLilac,
  personDocumentsContainer: realColor.zircon,
  personDocumentsBorderColor: realColor.dodgerBlue,

  /**
   * Modal: countries picker
   */
  modalCountriesPickerCountrySeparator: realColor.whiteLilac,
};

export default colors;
