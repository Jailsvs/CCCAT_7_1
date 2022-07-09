export default class DimensionItem{

  constructor(readonly heightCm: number, readonly widthCm: number, readonly depthCm: number){
    if (heightCm < 0) throw new Error("Dimensão inválida!");
    if (widthCm < 0) throw new Error("Dimensão inválida!");
    if (depthCm < 0) throw new Error("Dimensão inválida!");
  }
}