const MinimumValue = 10;
export default class Shippping {
  constructor(readonly totalVolume: number, 
              readonly totalDensity: number, 
              readonly distance: number){

  }

  calculate() {
    const totalFreight = (this.distance * this.totalVolume * (this.totalDensity/100));
    return (totalFreight > MinimumValue) ? totalFreight : MinimumValue;
  }
}