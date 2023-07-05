// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const PrimaryButton = ({ children }) => {
	return (
		<button className="bg-gradient-to-r lowercase from-secondary to-primary btn glass text-white hover:!bg-secondary">
			{children}
		</button>
	);
};

export default PrimaryButton;
