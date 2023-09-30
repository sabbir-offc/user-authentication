import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="container mx-auto text-center">
      <h1 className="text-5xl my-3">Name: {user.displayName}</h1>
      <h2 className="text-2xl">Email: {user.email}</h2>
      {user.photoURL && (
        <img
          src={user.photoURL}
          alt=""
          className="w-60 mt-10 rounded-full mx-auto"
        />
      )}
    </div>
  );
};

export default Profile;
