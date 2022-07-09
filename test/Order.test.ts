import Coupon from "../src/Coupon";
import DimensionItem from '../src/DimensionItem';
import Item from "../src/Item";
import Order from "../src/Order";
import Shippping from '../src/Shipping';

test.skip("Deve criar um pedido vazio", function () {
	const order = new Order("886.634.854-68");
	const total = order.getTotal();
	expect(total).toBe(0);
});

test.skip("Não deve criar um pedido com CPF inválido", function () {
	expect(() => new Order("111.111.111-11")).toThrow(new Error("Cpf Inválido"));
});

test.skip("Deve criar um pedido com 3 itens", function () {
	const order = new Order("886.634.854-68");
	order.addItem(new Item(1, "Guitarra", 1000, {heightCm: 100, widthCm: 100, depthCm: 100}, 10), 1);
	order.addItem(new Item(2, "Amplificador", 5000, {heightCm: 100, widthCm: 100, depthCm: 100}, 10), 1);
	order.addItem(new Item(3, "Cabo", 30, {heightCm: 100, widthCm: 100, depthCm: 100}, 10), 3);
	const total = order.getTotal();
	expect(total).toBe(6090);
});

test.skip("Deve criar um pedido com 3 itens com cupom de desconto", function () {
	const order = new Order("886.634.854-68");
	order.addItem(new Item(1, "Guitarra", 1000, {heightCm: 100, widthCm: 100, depthCm: 100}, 10), 1);
	order.addItem(new Item(2, "Amplificador", 5000, {heightCm: 100, widthCm: 100, depthCm: 100}, 10), 1);
	order.addItem(new Item(3, "Cabo", 30, {heightCm: 100, widthCm: 100, depthCm: 100}, 10), 3);
	order.addCoupon(new Coupon("VALE20", 20, new Date('2022-10-10T10:00:00')));
	const total = order.getTotal();
	expect(total).toBe(4872);
});

test.skip("Não deve aplicar cupom de desconto expirado", function () {
	const order = new Order("886.634.854-68");
	order.addItem(new Item(1, "Guitarra", 1000, {heightCm: 100, widthCm: 100, depthCm: 100}, 10), 1);
	order.addItem(new Item(2, "Amplificador", 5000, {heightCm: 100, widthCm: 100, depthCm: 100}, 10), 1);
	order.addItem(new Item(3, "Cabo", 30, {heightCm: 100, widthCm: 100, depthCm: 100}, 10), 3);
	expect(() => order.addCoupon(new Coupon("VALE20", 20, new Date('2022-01-01T10:00:00')))).toThrow(new Error("Cupom de desconto expirado!"));
});

test.skip("Não deve permitir item com quantidade negativa", function () {
	const order = new Order("886.634.854-68");
	expect(() => order.addItem(new Item(1, "Guitarra", 1000, {heightCm: 100, widthCm: 100, depthCm: 100}, 10), -1)).toThrow(new Error("Item com quantidade inválida!"));
});

test.skip("Não deve permitir item duplicado", function () {
	const order = new Order("886.634.854-68");
	order.addItem(new Item(1, "Guitarra", 1000, {heightCm: 100, widthCm: 100, depthCm: 100}, 10), 1)
	expect(() => order.addItem(new Item(1, "Guitarra", 1000, {heightCm: 100, widthCm: 100, depthCm: 100}, 10), 1)).toThrow(new Error("Item ID [1] já existente no pedido!"));
});

test.skip("Não deve permitir dimensões negativas para o item", function () {
	expect(() => new DimensionItem(100,100,-100)).toThrow(new Error("Dimensão inválida!"));
});

test.skip("Não deve permitir peso negativo para o item", function () {
	expect(() => new Item(1, "Guitarra", 1000, {heightCm: 100, widthCm: 100, depthCm: 100}, -10)).toThrow(new Error("Peso inválido!"));
});

test("Deve calcular o valor de frete do pedido", () => {

	const order = new Order("886.634.854-68");
	order.addItem(new Item(1, "Guitarra", 1000, {heightCm: 100, widthCm: 100, depthCm: 100}, 10), 1)
	const totalVolume = order.getTotalVolume();
	const totalDensity = order.getTotalDensity();
	const distance = order.getDistance();
	
	const shipping = new Shippping(totalVolume, totalDensity, distance);
	expect(shipping.calculate()).toBe(10);
});