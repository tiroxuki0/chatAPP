// ** Auth Endpoints
export default {
  loginEndpoint: "/auth/user/login",
  forgotPasswordEndpoint: "/auth/user/forgot-password",
  resetPasswordEndpoint: "/auth/user/reset-password",
  changePasswordEndpoint: "/user/change-password",
  registerEndpoint: "/auth/user/register",
  KYCEndpoint: "/auth/user/kyc",
  logoutEndpoint: "/auth/user/logout",
  
  KYCStepOneEndpoint: "/auth/user/kyc-step-one",
  KYCStepTwoEndpoint: "/auth/user/kyc-step-two",
  KYCStepThreeEndpoint: "/auth/user/kyc-step-three",
  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  firebaseTokenUser: "firebaseTokenUser",
  storageTokenKeyName: "accessTokenUser",
  storageRefreshTokenKeyName: "refreshTokenUser",
  storageUserData: "userDataUser",
  storageUserDataReLogin: "storageUserDataReLogin",
  storageUserRemember: "userRememberUser",
  rememberUser: "rememberUser",

  // other item in storage
  storageLanguage: 'language'
}
