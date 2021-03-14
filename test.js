var Pi = '3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067';

function pointByIndex(index, style = "grid", pointArray = []) {
	if (style === "grid") {
		var sWidth = (width / 50) - 1;
		var sHeight = (height / 50) - 1;

		if (index < 0 || index > sWidth * sHeight) {
			return { x: 0, y: 0 };
		}

		var x = (index) % sWidth + 1;
		var y = (index - (x - 1)) / sWidth + 1;

		return { x: x * 50, y: y * 50 };
	} else if (style === "symbol") {
		return pointArray[index];
	}
}
console.log('Test: check');