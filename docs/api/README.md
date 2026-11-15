# API Vancouros — visão geral

Documentação do contrato entre o back-end (este repositório) e o front-end (`Vancouros-Front-End`).
**Esta pasta é a fonte da verdade**: ao mudar uma rota, atualize o `.md` correspondente no mesmo PR.

| Módulo | Prefixo | Documento |
|---|---|---|
| Químicos / Estoque / Recebimentos | `/quimicos` | [quimicos.md](quimicos.md) |
| Usuários, Artigos, Etapas | `/users`, `/artigos`, `/etapas` | _não documentados (fora de uso)_ |

- **Base URL (dev):** `http://localhost:3001` (porta definida por `PORT` no `.env`).
- **Formato:** JSON (`Content-Type: application/json`).
- **Autenticação:** nenhuma (projeto em desenvolvimento, sem usuários).
- **Separação de rotas:** os prefixos refletem as telas do front-end (roteamento), não domínios de segurança.

## Formato de erro padrão

Erros lançados via `AppError` ([src/errors/appError.ts](../../src/errors/appError.ts)) retornam:

```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Produto Quimico não encontrado",
  "details": { }
}
```

- `details` é opcional (ex.: validação de campos devolve `invalidKeys`, `missingKeys` e `expected_schema`).
- Erros inesperados retornam `500` com `message: "Erro interno do servidor"`; o detalhe real aparece **apenas no log do servidor**.

## Convenções

- IDs são `uuid` (string).
- Datas trafegam em ISO 8601 (`2024-11-29T12:48:02.973Z`); o front formata para `dd/mm/aaaa`.
- Listagens retornam um array JSON (sem paginação por enquanto).
- Exclusão de químico é **soft delete** (`status = false`); registros inativos só aparecem em `/quimicos/excluidos`.

## Como manter esta documentação

Para cada rota nova/alterada, registre: método e caminho, middleware de validação, body, resposta de sucesso, erros e onde o front usa.
