import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../contracts/Factory.json";
import Swal from "sweetalert2";

const LeaseAgreementCard = ({ leaseAgreementAddress }) => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [leaseInfo, setLeaseInfo] = useState({
    subject: "",
    upVoteCount: "",
    downVoteCount: "",
    proposalStatus: false,
    requiredVotes: 0,
  });
  useEffect(() => {
    const getLeaseInfo = async () => {
      const contractAbi = abi;

      try {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            leaseAgreementAddress,
            contractAbi,
            signer
          );
          setState({ provider, signer, contract });

          const subject = await contract.subject();
          const upVoteCount = await contract.upVoteCount();
          const downVoteCount = await contract.downVoteCount();
          const proposalStatus = await contract.proposalStatus();
          const requiredVotes = await contract.requiredVotes();
          // const contractName = await contract.aggrementName();
          // const ownerName = await contract.ownerName();
          // const tenantName = await contract.tenantName();
          // Fetch other lease details here

          setLeaseInfo({
            subject,
            upVoteCount: upVoteCount.toString(),
            downVoteCount: downVoteCount.toString(),
            proposalStatus,
            requiredVotes: requiredVotes.toString(),

            // ... set other lease details in the state
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLeaseInfo();
  }, []); // Empty dependency array ensures this runs only once on component mount
  const { contract } = state;

  const payRent = async (event) => {
    event.preventDefault();
    try {
      await contract.vote(true);
    } catch (err) {
      console.log("Error is: ", err);
      Swal.fire(
        "Failure",
        "Something wrong happen. may be you already voted for this proposal or You do not have sufficient Token",
        "error"
      );
    }
  };

  const TerminateContract = async (event) => {
    event.preventDefault();
    try {
      await contract.vote(false);
    } catch (err) {
      console.log("Error is: ", err);
      Swal.fire(
        "Failure",
        "Something wrong happen. may be you already voted for this proposal or You do not have sufficient Token",
        "error"
      );
    }
  };

  return (
    <div className="App bg-gray-100 h-auto p-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Student DAO</h1>
        <div>
          <p className="mb-2">
            Subject Name:{" "}
            <span className="font-semibold">{leaseInfo.subject} </span>
          </p>
          <p className="mb-2">
            Required Up vote:{" "}
            <span className="font-semibold">{leaseInfo.requiredVotes} </span>
          </p>
          <p className="mb-2">
            UP Vote Count:{" "}
            <span className="font-semibold">{leaseInfo.upVoteCount} </span>
          </p>
          <p className="mb-2">
            Down Vote Count:{" "}
            <span className="font-semibold">{leaseInfo.downVoteCount} </span>
          </p>

          <p className="mb-2">
            Proposal Status:{" "}
            <span className="font-semibold">
              {leaseInfo.proposalStatus ? "Accepted" : "Pending"}{" "}
            </span>
          </p>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={payRent}
          >
            Vote Up
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={TerminateContract}
          >
            Vote Down
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default LeaseAgreementCard;
