import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import VotingDAOFactoryABI from "../contracts/BuyMeACoffee.json"; // ABI for VotingDAOFactory contract

function CreateProposal() {
  const [subject, setSubject] = useState("");
  const [requiredVotes, setRequiredVotes] = useState(2);
  const [loading, setLoading] = useState(false);
  const [contractState, setContractState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const fetchLeaseAgreements = async () => {
      const contractAddress = "0xD1B8aE4F6f2Bd008DE4E849dEf106685a4078387";
      //   const contractAbi = abi.abi;

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
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchLeaseAgreements();
  }, []);
  async function handleCreateProposal() {
    try {
      setLoading(true);
      const createProposalTx = await contractState.contract.createProposal(
        subject,
        requiredVotes
      );
      await createProposalTx.wait();
      alert("Proposal created successfully!");
    } catch (error) {
      console.error("Error creating proposal:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create a New Proposal</h2>
      <div className="bg-white shadow-md rounded p-4">
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter proposal subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="requiredVotes"
            className="block text-sm font-medium text-gray-700"
          >
            Required Votes
          </label>
          <input
            type="number"
            id="requiredVotes"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={requiredVotes}
            onChange={(e) => setRequiredVotes(e.target.value)}
          />
        </div>
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleCreateProposal}
          disabled={loading}
        >
          Create Proposal
        </button>
      </div>
    </div>
  );
}

export default CreateProposal;
