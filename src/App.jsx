import { useState } from "react";
import {
	VStack,
	Input,
	Button,
	Heading,
	Alert,
	AlertIcon,
	Container,
	Box,
	Image,
	Text,
} from "@chakra-ui/react";
import PriceDisplay from "./components/PriceDisplay";
import { getHistoricalPrice } from "./services/contractService";

function App() {
	const [date, setDate] = useState("");
	const [price, setPrice] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleFetchPrice = async () => {
		if (!date) {
			setError("Please select a date.");
			return;
		}

		setLoading(true);
		setError(null);
		setPrice(null);

		try {
			const roundId = 18446744073709554683; // Ejemplo de roundId válido
			const formattedPrice = await getHistoricalPrice(roundId); // Usar la función importada
			setPrice(formattedPrice);
		} catch (err) {
			setError(err.message || "An error occurred while fetching data.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container
			maxW="lg"
			height="100vh"
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
		>
			<VStack spacing={8} align="center" width="100%">
				{/* Logo superior */}
				<Image
					src="../public/govSEED.png"
					alt="App Logo"
					boxSize="100px"
					mb={4}
				/>

				{/* Contenido principal */}
				<VStack spacing={6} width="100%">
					<Heading textAlign="center">ARB/USD Price on a Specific Date</Heading>

					{/* Alertas de error */}
					{error && (
						<Alert status="error">
							<AlertIcon />
							{error}
						</Alert>
					)}

					{/* Input de fecha */}
					<VStack spacing={4} align="stretch" width="100%">
						<Input
							type="date"
							placeholder="Select Date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
						<Button
							colorScheme="blue"
							onClick={handleFetchPrice}
							isLoading={loading}
						>
							Get Price
						</Button>
					</VStack>

					{/* Mostrar Precio */}
					{price && <PriceDisplay price={price} date={date} />}
				</VStack>

				{/* Footer */}
				<Box textAlign="center">
					<Text fontSize="sm" color="gray.600">
						Powered by
					</Text>
					<Image
						src="../public/chainlink.png"
						alt="Powered by Chainlink"
						boxSize="150px"
						mt={2}
					/>
				</Box>
			</VStack>
		</Container>
	);
}

export default App;
