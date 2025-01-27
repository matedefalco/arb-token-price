import { Box, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const PriceDisplay = ({ price, date }) => {
	return (
		<Box
			p={4}
			bg="blue.50"
			borderWidth="1px"
			borderRadius="md"
			textAlign="center"
			shadow="md"
			maxWidth="sm"
			margin="0 auto"
		>
			<Text fontSize="lg" fontWeight="bold">
				Price on {date}:
			</Text>
			<Text fontSize="2xl" color="blue.600" fontWeight="bold">
				${price} USD
			</Text>
		</Box>
	);
};

// Validación de props
PriceDisplay.propTypes = {
	price: PropTypes.string.isRequired, // El precio debe ser una cadena
	date: PropTypes.string.isRequired, // La fecha debe ser una cadena
};

export default PriceDisplay;
