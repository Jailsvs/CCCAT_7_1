import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";

const DistanceDefault = 1000;
export default class Order {	
	orderItems: OrderItem[];
	cpf: Cpf;
	coupon?: Coupon;

	constructor (cpf: string, readonly issueDate: Date = new Date()) {
		this.cpf = new Cpf(cpf);
		this.orderItems = [];
	}

	addItem (item: Item, quantity: number) {
		const duplicatedItem = this.orderItems.find(duplicatedItem => duplicatedItem.idItem === item.idItem);
		if (duplicatedItem)	throw new Error(`Item ID [${item.idItem}] já existente no pedido!`)
		this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
	}

	addCoupon (coupon: Coupon) {
		if (coupon.isExpiredDate(this.issueDate)) throw new Error("Cupom de desconto expirado!");
		this.coupon = coupon;
	}

	getTotal () {
		let total = this.orderItems.reduce((total, orderItem) => {
			total += orderItem.getTotal();
			return total;
		}, 0);
		if (this.coupon) {
			total -= this.coupon.getDiscount(total);
		}
		return total;
	}
	
	getTotalVolume(){
		const totalVolume = this.orderItems.reduce((total, orderItem) => {
			total += orderItem.getTotalVolume();
			return total;
		}, 0);
		return totalVolume;
	}

	getTotalDensity(){
		const totalDensity = this.orderItems.reduce((total, orderItem) => {
			total += orderItem.getTotalDensity();
			return total;
		}, 0);
		return totalDensity;
	}

	getDistance(){
		return DistanceDefault;
	}
}
