export default class Coupon {

	constructor (readonly code: string, readonly percentage: number, readonly expirationDate: Date) {
	}

	getDiscount (total: number) {
		return (total * this.percentage)/100;
	}

	getExpirationDate(){
		return this.expirationDate
	}

	isExpiredDate(baseDate?: Date){
		if (baseDate)
		return this.expirationDate < baseDate;
		return this.expirationDate < new Date();
	}
}
