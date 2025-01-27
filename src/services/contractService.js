// src/services/contractService.js

import { ethers } from "ethers";

// Configuración del contrato Chainlink ARB/USD
const provider = new ethers.JsonRpcProvider("https://arb1.arbitrum.io/rpc");
const contractAddress = "0xB67AFb1bd99dd35657731041a5425f8a7c732Bf7";
const abi = [
	{
		inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
		name: "getHistoricalData",
		outputs: [{ internalType: "int256", name: "", type: "int256" }],
		stateMutability: "view",
		type: "function",
	},
];

const contract = new ethers.Contract(contractAddress, abi, provider);

// Función para obtener datos históricos
export const getHistoricalPrice = async (roundId) => {
	if (roundId > Number.MAX_SAFE_INTEGER) {
		throw new Error("Invalid roundId: The value is too large.");
	}

	try {
		const response = await contract.getHistoricalData(roundId);
		const formattedPrice = ethers.utils.formatUnits(response, 8);
		return formattedPrice;
	} catch (error) {
		throw new Error(error.message || "An error occurred while fetching data.");
	}
};
