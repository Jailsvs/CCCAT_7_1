export default class OrderItem {

	constructor (readonly idItem: number, readonly price: number, readonly quantity: number) {
		if (quantity < 0) throw new Error("Item com quantidade inválida!");
	}

	getTotal () {
		return this.price * this.quantity;
	}

	getTotalVolume() {
		return 1 * this.quantity;
	}

	getTotalDensity() {
		return 1 * this.quantity;
	}
}
