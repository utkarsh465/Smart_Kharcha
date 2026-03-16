import { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser"));
  });
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return {
      username: currentUser ? currentUser.username : "",
      email: currentUser ? currentUser.email : "",
    };
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setError("");
    setSuccess("");

    const storedUser = JSON.parse(localStorage.getItem("user"));

    // 🔐 Old password check
    if (passwordData.oldPassword !== storedUser.password) {
      setError("Old password is incorrect");
      return;
    }

    // 🔐 New password match check
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    // Update user
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.email === user.email
        ? {
          ...u,
          username: form.username,
          password:
            passwordData.newPassword || u.password,
        }
        : u
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    const updatedUser = updatedUsers.find((u) => u.email === user.email);

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);

    setSuccess("Profile updated successfully");
    setEditMode(false);
  };

  if (!user) {
    return (
      <div className="p-6">
        <h2>No user data found.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-96 space-y-4">

        <h2 className="text-2xl font-bold text-center dark:text-white">
          My Profile
        </h2>

        {editMode ? (
          <>
            {/* Username */}
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
            />

            {/* Email (disabled) */}
            <input
              type="email"
              value={form.email}
              disabled
              className="w-full px-4 py-2 rounded border bg-gray-200 dark:bg-gray-600 dark:text-white"
            />

            {/* Old Password */}
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter Old Password"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
            />

            {/* New Password */}
            <input
              type="password"
              name="newPassword"
              placeholder="Enter New Password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
            />

            {/* Confirm Password */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {success && (
              <p className="text-green-500 text-sm">{success}</p>
            )}

            <button
              onClick={handleSave}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Save Changes
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Username</p>
              <p className="text-lg font-semibold dark:text-white">
                {user.username}
              </p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-lg font-semibold dark:text-white">
                {user.email}
              </p>
            </div>

            <button
              onClick={() => setEditMode(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Edit Profile
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default Profile;