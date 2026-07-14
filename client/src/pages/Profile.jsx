import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    profession: "",
    bio: "",
    email: "",
  });

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        "/profile",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          Profile
        </h1>

        <form
          onSubmit={updateProfile}
          className="bg-slate-900 p-6 rounded-2xl"
        >
          <input
            type="text"
            placeholder="Name"
            value={profile.name}
            onChange={(e) =>
              setProfile({
                ...profile,
                name: e.target.value,
              })
            }
            className="w-full p-3 rounded-xl bg-slate-800 mb-4"
          />

          <input
            type="text"
            placeholder="Profession"
            value={profile.profession}
            onChange={(e) =>
              setProfile({
                ...profile,
                profession: e.target.value,
              })
            }
            className="w-full p-3 rounded-xl bg-slate-800 mb-4"
          />

          <textarea
            placeholder="Bio"
            value={profile.bio}
            onChange={(e) =>
              setProfile({
                ...profile,
                bio: e.target.value,
              })
            }
            className="w-full p-3 rounded-xl bg-slate-800 mb-4"
          />

          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full p-3 rounded-xl bg-slate-700 mb-4"
          />

          <button
            type="submit"
            className="bg-cyan-500 px-5 py-3 rounded-xl"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;