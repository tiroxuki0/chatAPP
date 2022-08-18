import { setStateModalAddRoom, setStateModalAddUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const useModal = () => {
  const dispatch = useDispatch();

  const modalAddRoom = (state) => {
    dispatch(setStateModalAddRoom(state));
  };

  const modalAddUser = (state) => {
    dispatch(setStateModalAddUser(state));
  };

  return { modalAddRoom, modalAddUser };
};

export default useModal;
