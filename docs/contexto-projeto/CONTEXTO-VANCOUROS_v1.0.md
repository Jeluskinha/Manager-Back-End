# Contexto do Projeto Vancouros (Curtume) — v1.0

> Documento de contexto para ser anexado ao projeto "Projeto - Monitoramento de processos" no claude.ai.
> Versão: **v1.0** · Data: 2026-11-13 · Próximas versões complementam esta (v1.1, v1.2, ...).

## 1. Visão geral

Sistema de um curtume, em desenvolvimento (nada em produção, sem usuários). Dois repositórios:

| Repo | Stack |
|---|---|
| `Vancouros-Back-End` | Node + Express + TypeORM 0.3 + Postgres (2 bancos: `main` e `rastreabilidade`), TypeScript |
| `Vancouros-Front-End` | React 18 (CRA), axios, yarn |

Todo o trabalho foi feito na branch **`MakeByClaude`** de ambos os repositórios.

### Regras de trabalho do Jean (responsável)
- **Não apagar código morto**: apenas listar.
- **Não fazer commit/push**: as alterações ficam pendentes no VS Code; o Jean decide quando commitar.
- Manter intactas as alterações já staged do Jean (`src/context/Provider.jsx` e `yarn.lock` no front).
- Evitar trocar de branch com trabalho não commitado.
- Rotas Admin (`/quimicos/todos`, `/excluidos`, `/reativar/:id`) são um console de desenvolvimento, usado via Insomnia.
- O projeto ficou meses parado: explicar com clareza antes de alterar e avisar quais chaves/arquivos mudam.

## 2. Back-end — o que foi feito

### Configuração e execução
- `PORT` e host/porta dos bancos via `.env` (`.env.example` documenta). `import "dotenv/config"` em `src/app.ts`.
- Scripts: `build` (`tsc`), `start` (`node dist/app.js`), `migration:show:*`.
- `data-source-*.ts`: migrations em `__dirname + "/../migrations/<db>/*{.ts,.js}"` (funciona em `src` e `dist`).
- `src/scripts/comandos_bash/run-migration.js` reescrito (spawnSync, comando `show`, repassa flags `--`).
- Migrations: baseline com `--fake`; migration aditiva nova.
- `handleError.middleware.ts`: loga erros inesperados (`[METHOD url]`).

### Documentação
- `docs/api/README.md` e `docs/api/quimicos.md`: contrato da API (rotas, códigos de erro, saldo de estoque, uso no front, lista de inconsistências).

### Modelo de dados
```
Quimico 1 ── 1 Estoque 1 ── N Recebimento   (FK recebimento.estoqueId)
```
- Quimico usa soft delete (`status`). Estoque nasce/morre junto com o Quimico.
- **`Estoque.peso_liquido`** (integer, NOT NULL, default 0), migration `1794515117576-AddPesoLiquidoEstoque` (com backfill pela soma dos recebimentos).

### Saldo de estoque (regra central)
Mantido **só pelo back**, na **mesma transação** do recebimento
(`src/services/quimicos/estoque/estoqueAjustarPesoLiquido.service.ts`, UPDATE atômico):

| Operação | Efeito em `Estoque.peso_liquido` |
|---|---|
| POST recebimento | `+ peso_liquido` |
| PATCH (mesmo produto) | `+ (novo − antigo)` |
| PATCH (produto trocado) | `− antigo` no estoque antigo, `+ novo` no novo |
| DELETE recebimento | `− peso_liquido` |

- Nunca fica negativo: operação que deixaria negativo → **409**, nada é alterado.
- `peso_liquido` do recebimento: inteiro ≥ 0, senão **400**.
- Produto não cadastrado → **403**.

### PATCH `/quimicos/recebimentos/:id`
- Novo middleware `validaUpdateRecebimentoJSON`: campos opcionais com os mesmos nomes do POST
  (`produto, peso_bruto, peso_liquido, tipo_recipiente, quantidade_recipiente, quantidade_pallet, fornecedor, atualizado_por`);
  chave desconhecida, body vazio ou tipo errado → 400 com `details`.
- `recebido_por` é aceito mas ignorado.
- Antes falhava com erro genérico porque o `validateKeys` obsoleto exigia a chave `quantidade`.

### Ordenação
Postgres não garante ordem; `GET /quimicos` e `GET /quimicos/estoque` agora usam `order: { produto: "ASC" }`.

## 3. Front-end — o que foi feito

- `services/api.js`: `baseURL` por `REACT_APP_API_URL` (fallback `http://localhost:3001`); helper `mensagemDeErro`. `.env.example` criado.
- Rotas do console corrigidas para `/quimicos/todos`.
- **Tela Estoque** implementada: tabela Código | Produto | Peso líquido | Ver; modal "Ver" com saldo e lista de recebimentos
  (`pages/Quimicos/Estoque/...`, contexto `context/Pages/quimicosContext/estoque`).
- **Padrão de tabelas:** o contexto guarda a lista original (`listaX`) e uma cópia de exibição (`copiaListaX`) gerada por
  `dadosTratativas.removerEOrdenarChaves(lista, chavesParaRemover, ordemDesejada)`.
  Chaves fora de `ordemDesejada` vão para o fim; a tabela desenha **todas** as chaves da linha (menos `id`, e `fornecedor` em Recebimentos) + ícone "Ver",
  então o cabeçalho precisa bater com as chaves restantes.
- `removerEOrdenarChaves` agora formata as datas `data` e `recebido_em` (ISO → dd/mm/aaaa).
- Listas atuais:
  - Químicos: remove `criado_em, atualizado_em, atualizado_por, versao, status, apelido`.
  - Estoque: remove `atualizado_em, atualizado_por, quimico`; ordem `id, codigo, produto, peso_liquido`.
  - Recebimentos: remove `atualizado_em, atualizado_por, recebido_por, lote, quantidade_pallet`;
    ordem `id, produto, peso_liquido, peso_bruto, tipo_recipiente, quantidade_recipiente, recebido_em, fornecedor`
    (cabeçalho: Produto | Peso L. | Peso B. | Recipiente | Quantidade | Recebido em | Ver).

## 4. Pendências conhecidas

**Prioridade alta**
1. Formulários de Recebimentos (registrar e editar) ainda usam `recipiente`/`quantidade` (nomes antigos) e não enviam `recebido_por`/`atualizado_por`:
   registrar pela tela falha; editar abre com campos vazios. Alinhar com `tipo_recipiente` e `quantidade_recipiente`.
2. `POST /quimicos/recebimentos` (controller) mascara qualquer erro como 400 com formato antigo; usar o handler central.
3. Senhas do Postgres do `.env` ficaram no histórico do git: **rotacionar**.

**Prioridade média**
- Tabela `migrations` com 27 linhas antigas (pode atrapalhar `migration:revert`).
- `GET /quimicos/recebimentos` sem ordenação (sugestão: data decrescente).
- Pesos são `integer`; se precisar de decimais, migrar as duas colunas para `numeric`.
- `PATCH /quimicos/:id` sem middleware; `DELETE /quimicos/:id` retorna 400 em vez de 404; `GET /estoque/:id` devolve array;
  Admin `POST /todos` usa `forEach(async)`; `lote` fixo (valor de teste); `atualizado_por` fixo `"Admin"`.

**Ideias futuras (não iniciadas)**
README/ARCHITECTURE, separar `app.ts`/`server.ts`, validação com zod, ESLint/Prettier, testes/CI, padronizar módulos users/artigos/etapas,
lista de código morto (ex.: `src/scripts/validateKeys - Obsoleto/`, rotas comentadas em `quimicos.routes.ts`).

## 5. Estado do repositório
- Back: commits b16b3a4, 3681cbd, c5fd9dc, deba172 na `MakeByClaude`; o restante (saldo, middleware, migration, docs) está **pendente/não commitado**.
- Front: commits f38aab5, 2a80898, 6b014f4, 519fe62, 000a686; Estoque, ajuste de listas e formatação de datas pendentes.
- Dev server do front precisa de reload (Ctrl+F5) para ver as mudanças.

## 6. Histórico de versões deste documento
| Versão | Data | Resumo |
|---|---|---|
| v1.0 | 2026-11-13 | Consolidação inicial: config, migrations, saldo de estoque, PATCH recebimentos, tela Estoque, colunas de Recebimentos |
