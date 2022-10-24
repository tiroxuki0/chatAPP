import * as firebaseServices from "../firebase/services";
import * as authActions from "./authSlice";

const normalSignIn = async (dispatch, navigate, data) => {
  dispatch(authActions.signInStart());
  try {
    const userCheck = await firebaseServices.checkExist("users", {
      field: "email",
      operator: "==",
      value: data.email,
    });
    if (userCheck.code == 1) {
      dispatch(authActions.signInFailed());
      return { code: 0, message: "Email is not valid" };
    }
    if (userCheck.data.password !== data.password) {
      dispatch(authActions.signInFailed());
      return { code: 0, message: "Password is not valid" };
    }
    dispatch(authActions.signInSuccess(userCheck.data));
    navigate("/");
    return { code: 1, message: "Sign in successfully" };
  } catch (err) {
    dispatch(authActions.signInFailed());
    return { code: 0, message: "Something went wrong!", err };
  }
};

const registerRequest = async (dispatch, navigate, data) => {
  dispatch(authActions.signInStart());
  try {
    const result = await firebaseServices.createUser(data.email, data.password);
    const { uid, providerId } = result.user;
    const resultAdd = await firebaseServices.addDocument("users", {
      ...data,
      uid,
      providerId,
    });
    dispatch(
      authActions.signInSuccess({
        id: resultAdd.docId,
        ...resultAdd.data,
      })
    );
    navigate("/");
    return { code: 1, message: "Signup successful" };
  } catch (err) {
    dispatch(authActions.signInFailed());
    return { code: 0, message: "Something went wrong!" };
  }
};

const facebookSignIn = async (dispatch, navigate) => {
  dispatch(authActions.signInStart());
  try {
    const result = await firebaseServices.fbSignIn();
    if (typeof result == "string") {
      dispatch(authActions.signInFailed());
      return { code: 0, message: "User cancel!" };
    }
    const { displayName, email, photoURL, uid } = result.data.user;
    const providerId = result.data.providerId;
    /* check user exist */
    const userCheck = await firebaseServices.checkExist("users", {
      field: "email",
      operator: "==",
      value: email,
    });
    if (userCheck.code === 0) {
      dispatch(
        authActions.signInSuccess({
          id: userCheck.data?.id,
          ...userCheck.data,
        })
      );
      navigate("/");
    } else {
      const userRef = await firebaseServices.addDocument("users", {
        displayName,
        email,
        photoURL,
        uid,
        providerId,
        background:
          "https://images.unsplash.com/photo-1611262588019-db6cc2032da3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      });
      dispatch(
        authActions.signInSuccess({
          id: userRef.docId,
          ...userRef.data,
        })
      );
      navigate("/");
    }
    return result;
  } catch (err) {
    dispatch(authActions.signInFailed());
    return err;
  }
};

const googleSignIn = async (dispatch, navigate) => {
  dispatch(authActions.signInStart());
  try {
    const result = await firebaseServices.ggSignIn();
    if (typeof result == "string") {
      dispatch(authActions.signInFailed());
      return { code: 0, message: "User cancel!" };
    }
    const { displayName, email, photoURL, uid } = await result.data.user;
    const providerId = await result.data.providerId;
    /* check user exist */
    const userCheck = await firebaseServices.checkExist("users", {
      field: "email",
      operator: "==",
      value: email,
    });
    if (userCheck.code === 0) {
      dispatch(
        authActions.signInSuccess({
          id: userCheck.data?.id,
          ...userCheck.data,
        })
      );
      navigate("/");
    } else {
      const userRef = await firebaseServices.addDocument("users", {
        displayName,
        email,
        photoURL,
        uid,
        providerId,
        background:
          "https://images.unsplash.com/photo-1611262588019-db6cc2032da3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      });
      dispatch(
        authActions.signInSuccess({
          id: userRef.docId,
          ...userRef.data,
        })
      );
      navigate("/");
    }
    return result;
  } catch (err) {
    dispatch(authActions.signInFailed());
    return err;
  }
};

export { normalSignIn, registerRequest, facebookSignIn, googleSignIn };
