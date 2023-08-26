// import React, { useEffect, useState } from "react";
// import { ethers } from "ethers";
// import VotingDAOFactoryABI from "../contracts/BuyMeACoffee.json"; // ABI for VotingDAOFactory contract
// import ProposalABI from "../contracts/Factory.json";

// function ProposalList() {
//   const [proposals, setProposals] = useState([]);
//   //   const [proposalAddresses, setProposalAddresses] = useState([]);
//   const [contractState, setContractState] = useState({
//     provider: null,
//     signer: null,
//     contract: null,
//   });

//   useEffect(() => {
//     async function fetchProposals() {
//       const contractAddress = "0xD1B8aE4F6f2Bd008DE4E849dEf106685a4078387";

//       try {
//         const { ethereum } = window;
//         if (ethereum) {
//           const accounts = await ethereum.request({
//             method: "eth_requestAccounts",
//           });
//           const provider = new ethers.providers.Web3Provider(ethereum);
//           const signer = provider.getSigner();
//           const contract = new ethers.Contract(
//             contractAddress,
//             VotingDAOFactoryABI,
//             signer
//           );
//           setContractState({
//             provider,
//             signer,
//             contract,
//           });
//           const proposalAddresses = await contract.getDeployedProposals();
//           //   setProposalAddresses(proposalAddresses_temp);

//           console.log("proposalAddresses_temp:  ", proposalAddresses);

//           const proposalList = await Promise.all(
//             proposalAddresses.map(async (address) => {
//               const proposalContract = new ethers.Contract(
//                 address,
//                 ProposalABI,
//                 signer
//               );

//               const [subject, upVoteCountBN, downVoteCountBN, proposalStatus] =
//                 await Promise.all([
//                   proposalContract.subject(),
//                   proposalContract.upVoteCount(),
//                   proposalContract.downVoteCount(),
//                   proposalContract.proposalStatus(),
//                 ]);

//               const upVoteCount = upVoteCountBN.toNumber(); // Convert BigNumber to number
//               const downVoteCount = downVoteCountBN.toNumber(); // Convert BigNumber to number

//               return {
//                 address,
//                 subject,
//                 upVoteCount,
//                 downVoteCount,
//                 proposalStatus,
//               };
//             })
//           );

//           setProposals(proposalList);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     fetchProposals();
//   }, []);
//   const handleDownVote = async (event) => {
//     event.preventDefault();
//   };
//   const handleUpVote = async (event) => {
//     event.preventDefault();
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">List of Proposals</h2>
//       <ul className="space-y-4">
//         {proposals.map((proposal) => (
//           <li key={proposal.address} className="bg-white shadow-md rounded p-4">
//             <h3 className="text-lg font-medium">{proposal.subject}</h3>
//             <p>Upvotes: {proposal.upVoteCount}</p>
//             <p>Downvotes: {proposal.downVoteCount}</p>
//             <p>Status: {proposal.proposalStatus ? "Accepted" : "Pending"}</p>
//             <button
//               onClick={handleUpVote}
//               className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
//             >
//               <a href={`/proposal/${proposal.address}`}>Vote Yes</a>
//             </button>
//             <button
//               onClick={handleDownVote}
//               className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
//             >
//               <a href={`/proposal/${proposal.address}`}>Vote No</a>
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProposalList;
/////////////////////////////////////////////////

import LeaseAgreementCard from "./LeaseAgreementCard";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import VotingDAOFactoryABI from "../contracts/BuyMeACoffee.json"; // ABI for VotingDAOFactory contract
import ProposalABI from "../contracts/Factory.json";

function ProposalList() {
  const [proposalAddresses, setProposalAddresses] = useState([]);
  //   const [proposalAddresses, setProposalAddresses] = useState([]);
  const [contractState, setContractState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    async function fetchProposals() {
      const contractAddress = "0xD1B8aE4F6f2Bd008DE4E849dEf106685a4078387";

      try {
        const { ethereum } = window;
        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            VotingDAOFactoryABI,
            signer
          );
          setContractState({
            provider,
            signer,
            contract,
          });
          const proposalAddresses_temp = await contract.getDeployedProposals();
          setProposalAddresses(proposalAddresses_temp);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchProposals();
  }, []);
  //   const handleDownVote = async (event) => {
  //     event.preventDefault();
  //   };
  //   const handleUpVote = async (event) => {
  //     event.preventDefault();
  //   };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">List of Proposals</h2>
      <ul className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {proposalAddresses?.map((address, index) => (
            <LeaseAgreementCard key={address} leaseAgreementAddress={address} />
          ))}
        </div>
      </ul>
    </div>
  );
}

export default ProposalList;
