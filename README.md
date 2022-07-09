# Clean Code e Clean Architecture - Turma 7 (práticas aula 2)
## Resumão Tests e Test Double
### FAST
* F ast: rodar rápido;
* I ndependent: não deve existir dependencia entre testes/não sequenciar;
* R epeatable: resultado deve ser o mesmo independente do nro de vezes que rodar;
* S elf Validation: deve falhar ou passar por conta própria;
* T imely: escrito no mesmo momento que o código (ou próximo);

Test: </br>
Given/Arrange </br>
When/Act </br>
Then/Assert </br>

Pirâmide de Testes:</br>
E2E: de ponta a ponta, caro, agrangente;</br>
Integration: entre camadas, bom custo benefício p/ sistemas legados;</br>
Unit: classe, método, etc</br>

### Test Double ou Dublês de Teste (mocks)
**Obs.:** Se fazem muito necessários em arquiteturas muito acopladas;</br>
Dummy: Value Pattern de teste, sem lógica ou papel;</br>
Stub: fornece respostas pré definidas/fixas;</br>
Spy: Espião, proxy (repassa/intercepta), análise maior, verificar fluxos/parâmetros/qdade de execuções etc;</br>
**Obs.:** Pode-se combinar spies e stubs;</br>
Mock: (verify) tem validação pré definida nele mesmo (lançando exceções ou retornos);</br>
Fake: parecido com Stub porém com comortamento, valores fakes, simplificação de BD, etc;

### Leitura
1. https://blog.cleancoder.com/uncle-bob/2014/05/14/TheLittleMocker.html
2. https://martinfowler.com/articles/mocksArentStubs.html
3. https://www2.ccs.neu.edu/research/demeter/related-work/extreme-programming/MockObjectsFinal.PDF

# Cenário
## Testes
1. Não deve aplicar cupom de desconto expirado
2. Ao fazer um pedido, a quantidade de um item não pode ser negativa
3. Ao fazer um pedido, o mesmo item não pode ser informado mais de uma vez
4. Nenhuma dimensão do item pode ser negativa
5. O peso do item não pode ser negativo
6. Deve calcular o valor do frete com base nas dimensões (altura, largura e profundidade em cm) e o peso dos produtos (em kg)
7. Deve retornar o preço mínimo de frete caso ele seja superior ao valor calculado

## Considere
1. O valor do frete será calculado de acordo com a fórmula
2. O valor mínimo é de R$10,00
3. Como não temos uma forma de calcular o CEP de origem e destino para chegar na distância, por hora ela será 1000 (fixo)
4. Não existem diferentes modalidades de frete (normal, expresso, …) e a origem dos produtos é sempre a mesma, além disso não existe diferença no destino, se é capital ou interior, o cálculo é feito basicamente considerando a distância, o volume e a densidade transportados

## Fórmula de Cálculo do Frete
Preço do Frete = distância (km) * volume (m3) * (densidade/100)
### Exemplos de volume ocupado (cubagem)
Camera: 20cm x 15 cm x 10 cm = 0,003 m3
Guitarra: 100cm x 30cm x 10cm = 0,03 m3
Geladeira: 200cm x 100cm x 50cm = 1 m3
### Exemplos de densidade
Camera: 1kg / 0,003 m3 = 333kg/m3
Guitarra: 3kg / 0,03 m3 = 100kg/m3
Geladeira: 40kg / 1 m3 = 40kg/m3

### Exemplos
distância: 1000 (fixo)
volume: 0,003
densidade: 333
preço: R$9,90 (1000 * 0,003 * (333/100))

# Configurações de ambiente
## Executar:
```yarn install```</br>
```npx jest com as opções --watchAll ou --coverage```

## Configurar o projeto do zero:

```yarn init -y```</br>
```yarn add typescript jest @types/jest ts-node ts-jest```</br>
```npx tsc --init```</br>
```npx ts-jest config:init```</br>
```criar pastas src e test```</br>
```npx jest```</br>
```npx jest --watchAll```</br>
```npx jest --coverage```</br>

