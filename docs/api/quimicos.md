# API — Químicos, Estoque e Recebimentos

Prefixo: `/quimicos` · Rotas: [src/routes/quimicos.routes.ts](../../src/routes/quimicos.routes.ts)

> **Ordem das rotas importa:** `/recebimentos`, `/estoque` e as rotas Admin são declaradas **antes** de `/:id`;
> caso contrário o Express interpretaria `recebimentos` como um `id`.

## Modelo de dados (resumo)

```
Quimico 1 ──── 1 Estoque 1 ──── N Recebimento
```

- **Quimico**: cadastro do produto (`produto`, `codigo`, `versao`, `status`). Ao criar um químico, o **Estoque é criado junto**.
- **Estoque**: identidade e **saldo** do químico em estoque (`produto`, `codigo`, `peso_liquido`, `atualizado_em`, `atualizado_por`).
- **Recebimento**: entrada de material vinculada ao Estoque (encontrado pelo **`produto`**).

### Saldo do estoque (`Estoque.peso_liquido`)

Inteiro `>= 0`, mantido **pelo back-end** a cada operação em Recebimentos, sempre na **mesma transação** do recebimento
([estoqueAjustarPesoLiquido.service.ts](../../src/services/quimicos/estoque/estoqueAjustarPesoLiquido.service.ts)):

| Operação | Efeito em `Estoque.peso_liquido` |
|---|---|
| `POST /quimicos/recebimentos` | `+ peso_liquido` do recebimento |
| `PATCH /quimicos/recebimentos/:id` (mesmo produto) | `+ (novo − antigo)` |
| `PATCH /quimicos/recebimentos/:id` (produto trocado) | `− antigo` no estoque anterior e `+ novo` no estoque do novo produto |
| `DELETE /quimicos/recebimentos/:id` | `− peso_liquido` do recebimento |

- O saldo **nunca fica negativo**: se uma operação deixasse o estoque negativo (ex.: parte do material já foi consumida), ela é recusada com **409** e nada é alterado.
- `peso_liquido` do recebimento é validado: precisa ser **inteiro `>= 0`** (string numérica como `"120"` é aceita). Caso contrário, **400**.
- Nenhuma rota altera `Estoque.peso_liquido` diretamente. Se o saldo divergir da soma dos recebimentos, recalcule com
  `UPDATE estoque e SET peso_liquido = COALESCE((SELECT SUM(r.peso_liquido) FROM recebimento r WHERE r."estoqueId" = e.id), 0)`
  (a migration `AddPesoLiquidoEstoque` fez esse preenchimento inicial). Quando existir consumo (fórmulas), esta soma deixa de ser a verdade.

---

## Químicos

### `POST /quimicos`
Cadastra um químico e cria o Estoque correspondente.
- Middleware: `validaCreateQuimicoJSON` — aceita **somente** `produto` e `codigo`, ambos `string`.
- Body: `{ "produto": "string", "codigo": "string" }`
- **201** → objeto do químico criado (`versao` inicial `120-7201-VS001`).
- **400** `Chaves inválidas` / `Verifique os campos enviados.` (com `details.expected_schema`).
- **403** `<produto> já foi cadastrado` (código duplicado).

### `GET /quimicos`
Lista químicos **ativos** (`status = true`). **200** → `Quimico[]`.

### `GET /quimicos/:id`
Busca um químico (ativo ou não). **200** → `Quimico` · **404** `Produto Quimico não encontrado`.

### `PATCH /quimicos/:id`
Atualiza o **`produto`** do químico, incrementa a `versao` e propaga o novo nome ao Estoque.
- Body: `{ "produto": "string" }` (`codigo` é ignorado — alteração de código está temporariamente indisponível).
- **200** → `Quimico` atualizado · **404** `Produto Quimico não encontrado`.
- ⚠️ Esta rota **não** usa middleware de validação.

### `DELETE /quimicos/:id`
Soft delete (`status = false`). **200** → texto `Químico excluido` · **400** `Químico não encontrado` (apenas ativos são encontrados).

---

## Recebimentos

### `POST /quimicos/recebimentos`
Registra um recebimento. O químico precisa existir em Estoque (busca por `produto`).
- Body (campos lidos pelo service):

| Campo | Tipo |
|---|---|
| `produto` | string (deve existir no Estoque) |
| `peso_bruto`, `peso_liquido` | number |
| `tipo_recipiente` | string (máx. 25) |
| `quantidade_recipiente`, `quantidade_pallet` | number |
| `recebido_por`, `atualizado_por` | string (máx. 36) |
| `fornecedor` | string |

- **201** → recebimento criado, com `estoque` (sem a lista de recebimentos).
- **403** `Produto Quimico não está cadastrado, registre-o antes...`
- **400** `peso_liquido deve ser um número inteiro maior ou igual a zero`.
- Soma o `peso_liquido` ao `Estoque` do produto (ver *Saldo do estoque*); a resposta traz `estoque` já com o saldo atualizado.
- **400** qualquer outro erro (ver *Inconsistências*).
- `lote` é gerado fixo pelo servidor (`L01IN0225OUT0825COD0123`) — ainda é valor de teste.

### `GET /quimicos/recebimentos`
**200** → `Recebimento[]`.

### `PATCH /quimicos/recebimentos/:id`
Atualiza parcialmente o recebimento; campos omitidos mantêm o valor.
Ajusta o saldo do Estoque (diferença de peso; se o `produto` mudar, **move** o recebimento e o peso para o estoque do novo produto).
**200** → recebimento atualizado · **400** peso inválido · **403** novo produto não cadastrado · **404** `Recebimento não encontrado` · **409** deixaria o estoque negativo.
Middleware: `validaUpdateRecebimentoJSON`. Todos os campos são **opcionais** (parcial) e usam os **mesmos nomes do POST**:
`produto`, `peso_bruto`, `peso_liquido`, `tipo_recipiente`, `quantidade_recipiente`, `quantidade_pallet`, `fornecedor`, `atualizado_por`.
- Chave desconhecida (ex.: os nomes antigos `pallet`, `recipiente`, `quantidade`) → **400** `Chaves inválidas` com `details.invalidKeys`.
- Body sem nenhum campo atualizável → **400**. Tipo errado (ex.: `peso_bruto: "abc"`) → **400** com `details.invalidTypes`.
- `recebido_por` é aceito no body, mas **ignorado** (só é gravado na criação).

### `DELETE /quimicos/recebimentos/:id`
Exclusão **definitiva**; subtrai o `peso_liquido` do saldo do Estoque na mesma transação.
**204** · **404** `recebimento não encontrado` · **409** se o estoque ficaria negativo (a exclusão não acontece).

---

## Estoque

### `GET /quimicos/estoque`
Estoque dos químicos ativos. **200** → itens com `quimico: { produto, codigo }` e **sem** a lista de `recebimentos`.

### `GET /quimicos/estoque/:id`
**200** → **array** (com 0 ou 1 item) contendo o estoque **com** `recebimentos`.

### `PATCH /quimicos/estoque/:id`
Atualiza `atualizado_em` e define `atualizado_por = "Admin"` (sem body). **200** · **404** `Produto em estoque não encontrado`.

> Criar/excluir Estoque diretamente foi removido: o Estoque nasce e morre junto com o Químico.

---

## Rotas Admin (console de desenvolvimento)

Uso restrito ao desenvolvedor (console de testes / Insomnia). **Sem autenticação — não habilitar em produção.**

| Rota | Efeito |
|---|---|
| `POST /quimicos/todos` | Cadastra uma lista de químicos (e seus Estoques). Body: array de `{ produto, codigo }`. **201** · **409** se todos já existem. |
| `GET /quimicos/excluidos` | Lista químicos com `status = false`. |
| `PATCH /quimicos/reativar/:id` | Reativa um químico excluído (`status = true`). |
| `DELETE /quimicos/todos` | **Apaga permanentemente** todos os Químicos e Estoques. |

---

## Uso no front-end

| Tela | Contexto | Rotas |
|---|---|---|
| Químicos | `context/Pages/quimicosContext/quimicos` | `GET /quimicos`, `PATCH /quimicos/:id` |
| Recebimentos | `context/Pages/quimicosContext/recebimentos` | `GET`/`POST`/`PATCH /quimicos/recebimentos` |
| Estoque | `context/Pages/quimicosContext/estoque` | `GET /quimicos/estoque` (tabela: código e produto) e `GET /quimicos/estoque/:id` (modal "Ver": saldo `peso_liquido` + recebimentos) |
| Console (dev) | `console/context` | `POST /quimicos`, `POST`/`DELETE /quimicos/todos` |

---

## Inconsistências conhecidas (pendências)

1. **Formulários de Recebimentos no front (registrar e editar):** ainda enviam `recipiente` e `quantidade` (nomes antigos) e **não enviam** `recebido_por` e `atualizado_por` (colunas obrigatórias). Registrar recebimento pela tela falha até alinhar com o contrato abaixo; pela API direta funciona.
2. **`POST /recebimentos` — controller:** qualquer erro que não seja `AppError` vira `400` com formato diferente do padrão (`error` em vez de `status`/`statusCode`) e cita campos que não existem (`pallet`, `recipiente`); os reais são `quantidade_pallet`, `tipo_recipiente`, `quantidade_recipiente`. Erros 500 reais ficam mascarados como 400.
3. **`PATCH /quimicos/:id`** sem middleware de validação (o `validaUpdateQuimicoJSON` existe, mas só é usado em `/reativar/:id`, onde exige `produto` e `codigo` sem necessidade).
4. **`DELETE /quimicos/:id`** retorna `400` (padrão do `AppError`) quando não encontra; o resto do módulo usa `404`.
5. **`GET /quimicos/estoque/:id`** devolve array em vez de objeto.
6. **Admin `POST /todos`:** usa `forEach(async ...)`, então responde **antes** de terminar de gravar, e a mensagem de sucesso interpola o array (`${quimicos}`) em vez da quantidade.
7. **`PATCH /quimicos/:id`** atualiza o Estoque com `forEach(async ...)` sem aguardar.
8. **`lote`** de recebimento é fixo (valor de teste) e `atualizado_por` de químico/estoque é fixo (`"Admin"`).
