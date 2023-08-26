import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import VotingDAOFactoryABI from "../contracts/BuyMeACoffee.json"; // ABI for VotingDAOFactory contract

function UserProfile() {
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function fetchUserBalance() {
      const contractAddress = "0xD1B8aE4F6f2Bd008DE4E849dEf106685a4078387"; // Your contract address
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const votingDAOFactoryContract = new ethers.Contract(
          contractAddress,
          VotingDAOFactoryABI,
          signer
        );

        setContract(votingDAOFactoryContract);

        try {
          const userBalance = await votingDAOFactoryContract.balanceOf(
            signer.getAddress()
          );
          setBalance(userBalance.toString());
        } catch (error) {
          console.error("Error fetching user balance:", error);
        }
      }
    }

    fetchUserBalance();
  }, []);

  const mintTokens = async () => {
    if (contract) {
      try {
        await contract.mintTokens();
        // alert("Tokens minted successfully!");
      } catch (error) {
        console.error("Error minting tokens:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      <p>Balance: {balance} tokens</p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
        onClick={mintTokens}
      >
        Mint Tokens
      </button>
    </div>
  );
}

export default UserProfile;
