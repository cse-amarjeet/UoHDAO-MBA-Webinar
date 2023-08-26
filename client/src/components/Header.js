import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-blue-500">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-xl">
                Voting DAO
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-white hover:bg-blue-600 px-3 py-2 rounded-md shadow-md"
                >
                  Proposals
                </Link>
                <Link
                  to="/create-proposal"
                  className="text-white hover:bg-blue-600 px-3 py-2 rounded-md shadow-md"
                >
                  Create Proposal
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden sm:block sm:ml-6">
            <Link
              to="/your-profile"
              className="text-white hover:bg-blue-600 px-3 py-2 rounded-md shadow-md"
            >
              Your Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;

// import React from "react";
// import { Link } from "react-router-dom";

// function Header() {
//   return (
//     <nav className="bg-blue-500">
//       <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
//         <div className="relative flex items-center justify-between h-16">
//           <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
//             <div className="flex-shrink-0">
//               <Link to="/" className="text-white font-bold text-xl">
//                 Voting DAO
//               </Link>
//             </div>
//             <div className="hidden sm:block sm:ml-6">
//               <div className="flex space-x-4">
//                 <Link
//                   to="/"
//                   className="text-white hover:bg-blue-600 px-3 py-2 rounded-md"
//                 >
//                   Proposals
//                 </Link>
//                 <Link
//                   to="/create-proposal"
//                   className="text-white hover:bg-blue-600 px-3 py-2 rounded-md"
//                 >
//                   Create Proposal
//                 </Link>
//               </div>
//             </div>
//           </div>
//           {/* Add the "Your Profile" button here */}
//           <div className="hidden sm:block sm:ml-6">
//             <Link
//               to="/your-profile"
//               className="text-white hover:bg-blue-600 px-3 py-2 rounded-md"
//             >
//               Your Profile
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Header;
