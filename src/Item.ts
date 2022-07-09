import DimensionItem from './DimensionItem';

export default class Item {

	constructor (readonly idItem: number, readonly description: string, 
		           readonly price: number, readonly dimension: DimensionItem, readonly weightKg: number) {
		if (weightKg < 0) throw new Error("Peso inválido!");							
	}

	getVolume() {
		return	this.dimension.heightCm/100 * 
						this.dimension.widthCm/100 * 
						this.dimension.depthCm/100;
	}

	getDensity() {
		return	Math.trunc(this.weightKg / this.getVolume());
	}
}


