import { getUserDetailsById } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { UserContext } from "../App";
import { MDBBtn } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { followUnfollowUser } from "../features/userSlice";
export default function UserDisplayCard({ userid }) {
  const dispatch = useDispatch();
  const { userIdFromToken, user } = useContext(UserContext);
  const userDetails = useSelector((state) => getUserDetailsById(state, userid));
  const connectUser = () => {
    dispatch(
      followUnfollowUser({
        details: {
          followerId: userid,
          userId: userIdFromToken,
        },
        token: user.accessToken,
      })
    );
  };
  return (
    <div className="d-flex align-items-center gap-3 border rounded p-2 m-2">
      <img
        src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp"
        width={50}
        height={50}
        className="rounded-circle"
      />
      <p className="m-0 fw-bold">{userDetails.user_name}</p>
      <MDBBtn
        color="primary"
        style={{ marginLeft: "auto" }}
        onClick={connectUser}
      >
        {userDetails?.userHistory?.followers &&
        userDetails?.userHistory?.followers.includes(userIdFromToken)
          ? "Unfollow"
          : "Follow"}
      </MDBBtn>
    </div>
  );
}
