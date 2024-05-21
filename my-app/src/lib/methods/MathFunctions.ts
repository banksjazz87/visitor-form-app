const MathFunctions = {
	createPhoneNumber: function (str: string) {
		let newStr;
		switch (str.length) {
			case 3:
				newStr = `(${str})-`;
				break;
			case 9:
				newStr = str + "-";
				break;
			case 15:
				newStr = str.slice(0, -1);
				break;
			default:
				newStr = str;
				break;
		}
		return newStr;
	},
};

export default MathFunctions;
