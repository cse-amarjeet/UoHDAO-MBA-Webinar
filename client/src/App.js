import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProposalList from "./components/ProposalList";
import CreateProposal from "./components/CreateProposal";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" exact element={<ProposalList />} />
            <Route path="/create-proposal" element={<CreateProposal />} />
            <Route path="/your-profile" element={<UserProfile />} />
            {/* Add more routes for individual proposal pages */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
