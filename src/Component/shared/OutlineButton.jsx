// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const OutlineButton = ({ children }) => {
	return (
		<button className="btn btn-outline btn-primary text-accent lowercase font-medium hover:!text-white">
			{children}
		</button>
	);
};

export default OutlineButton;
