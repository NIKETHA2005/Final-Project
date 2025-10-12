// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import UserDetailsPage from './pages/UserDetailsPage';

// function App() {
//   const [ocrData, setOcrData] = useState(null);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage onScanComplete={setOcrData} />} />
//         <Route path="/user-details" element={<UserDetailsPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import UserDetailsPage from './pages/UserDetailsPage';
// import DepositPage from './pages/DepositPage'; // Import the DepositPage
// import AuthenticationPage from './pages/AuthenticationPage'; // Adjust the path if necessary
// import ChallanPage from './pages/ChallanPage'; // Import the Challan Page
// import WithdrawalPage from './pages/WithdrawalPage'; // Import the Withdrawal Page
// import AdminDashboard from './pages/AdminDashboard';
// import UserManagement from './pages/UserManagement';
// import TransactionMonitor from './pages/TransactionMonitor';

// function App() {
//   const [ocrData, setOcrData] = useState(null);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage onScanComplete={setOcrData} />} />
//         <Route path="/user-details" element={<UserDetailsPage />} />
//         <Route path="/deposit" element={<DepositPage />} /> {/* New Route */}
//         <Route path="/authentication" element={<AuthenticationPage />} /> {/* Add this route */}
//         <Route path="/challan" element={<ChallanPage />} /> {/* Add this route */}
//         <Route path="/withdrawal" element={<WithdrawalPage />} /> {/* Add this route */}
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/admin/users" element={<UserManagement />} />
//         <Route path="/admin/transactions" element={<TransactionMonitor />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserDetailsPage from './pages/UserDetailsPage';
import DepositPage from './pages/DepositPage';
import AuthenticationPage from './pages/AuthenticationPage';
import ChallanPage from './pages/ChallanPage';
import WithdrawalPage from './pages/WithdrawalPage';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import TransactionMonitor from './pages/TransactionMonitor';
import LoginPage from './pages/LoginPage'; // Import LoginPage
import ProtectedRoute from './components/ProtectedRoute';
import TransactionHistoryPage from './pages/TransactionHistoryPage';


function App() {
  const [ocrData, setOcrData] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage onScanComplete={setOcrData} />} />
        <Route path="/user-details" element={<UserDetailsPage />} />
        <Route path="/deposit" element={<DepositPage />} />
        <Route path="/authentication" element={<AuthenticationPage />} />
        <Route path="/challan" element={<ChallanPage />} />
        <Route path="/withdrawal" element={<WithdrawalPage />} />
        <Route path="/login" element={<LoginPage setAuthToken={setAuthToken} />} /> {/* Login Route */}

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/transactions"
          element={
            <ProtectedRoute>
              <TransactionMonitor />
            </ProtectedRoute>
          }
        />
        <Route path="/transaction-history" element={<TransactionHistoryPage />} />
      </Routes>
      
    </Router>
  );
}

export default App;
