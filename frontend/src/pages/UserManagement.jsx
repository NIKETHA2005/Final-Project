import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import styles from "./UserManagement.module.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifsc: "",
    phoneNo: "",
    customerAddress: "",
    pin: "",
    balance: "",
    accountOpeningDate: "",
    branch: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch all users from DB
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle deleting a user
  const handleDelete = async (accountNumber) => {
    try {
      await axios.delete(`/users/${accountNumber}`);
      setUsers(users.filter((user) => user.account_number !== accountNumber));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // ✅ Handle creating a new user
  const handleCreateUser = async () => {
    try {
      await axios.post("/users", newUser);
      setNewUser({
        accountHolderName: "",
        accountNumber: "",
        ifsc: "",
        phoneNo: "",
        customerAddress: "",
        pin: "",
        balance: "",
        accountOpeningDate: "",
        branch: "",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // ✅ Handle when Edit button is clicked
  const handleEdit = (user) => {
    setEditingUser(user); // Set the user for editing
    setNewUser({
      accountHolderName: user.accountHolderName,
      accountNumber: user.accountNumber,
      ifsc: user.ifsc,
      phoneNo: user.phoneNo,
      customerAddress: user.customerAddress,
      pin: user.pin,
      balance: user.balance,
      accountOpeningDate: user.accountOpeningDate,
      branch: user.branch,
    });
  };

  // ✅ Handle updating an existing user
  const handleUpdateUser = async () => {
    if (!editingUser || !editingUser.accountNumber) {
      console.error("Error: Account number is missing for update.");
      return;
    }

    try {
      const response = await axios.put(`/users/${editingUser.accountNumber}`, {
        accountHolderName: editingUser.accountHolderName,
        ifsc: editingUser.ifsc,
        phoneNo: editingUser.phoneNo,
        customerAddress: editingUser.customerAddress,
        pin: editingUser.pin,
        balance: editingUser.balance,
        accountOpeningDate: editingUser.accountOpeningDate,
        branch: editingUser.branch
      });

      console.log("🟢 Update response:", response.data);

      // ✅ Update UI with latest data
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.accountNumber === editingUser.accountNumber ? response.data : user
        )
      );

      setEditingUser(null);
      fetchUsers(); // ✅ Ensure UI refreshes with updated DB data
    } catch (error) {
      console.error("🔴 Error updating user:", error);
    }
  };




  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Management</h1>

      {/* ✅ Form for adding/updating users */}
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.accountHolderName}
          onChange={(e) =>
            setNewUser({ ...newUser, accountHolderName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Account Number"
          value={newUser.accountNumber}
          onChange={(e) =>
            setNewUser({ ...newUser, accountNumber: e.target.value })
          }
          disabled={editingUser !== null} // Prevent editing account number
        />
        <input
          type="text"
          placeholder="IFSC Code"
          value={newUser.ifsc}
          onChange={(e) => setNewUser({ ...newUser, ifsc: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone No"
          value={newUser.phoneNo}
          onChange={(e) => setNewUser({ ...newUser, phoneNo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={newUser.customerAddress}
          onChange={(e) =>
            setNewUser({ ...newUser, customerAddress: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="PIN"
          value={newUser.pin}
          onChange={(e) => setNewUser({ ...newUser, pin: e.target.value })}
        />
        <input
          type="number"
          placeholder="Balance"
          value={newUser.balance}
          onChange={(e) => setNewUser({ ...newUser, balance: e.target.value })}
        />
        <input
          type="date"
          placeholder="Account Opening Date"
          value={newUser.accountOpeningDate}
          onChange={(e) =>
            setNewUser({ ...newUser, accountOpeningDate: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Branch"
          value={newUser.branch}
          onChange={(e) => setNewUser({ ...newUser, branch: e.target.value })}
        />

        {/* ✅ Show "Create User" OR "Update User" button based on editing mode */}
        {editingUser ? (
          <button onClick={handleUpdateUser}>Update User</button>
        ) : (
          <button onClick={handleCreateUser}>Create User</button>
        )}
      </div>

      {/* ✅ User Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Account Number</th>
            <th>IFSC</th>
            <th>Phone No</th>
            <th>Address</th>
            <th>PIN</th>
            <th>Balance</th>
            <th>Account Opening Date</th>
            <th>Branch</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.accountNumber}>
              <td>{user.accountHolderName}</td>
              <td>{user.accountNumber}</td>
              <td>{user.ifsc}</td>
              <td>{user.phoneNo}</td>
              <td>{user.customerAddress}</td>
              <td>{user.pin}</td>
              <td>₹{user.balance}</td>
              <td>{user.accountOpeningDate}</td>
              <td>{user.branch}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.accountNumber)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
