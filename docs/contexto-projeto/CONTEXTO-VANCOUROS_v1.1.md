# Contexto do Projeto Vancouros (Curtume) — v1.1

> Complementa a **v1.0** (não a substitui: arquitetura, regra do saldo de estoque e contrato da API continuam valendo como descritos lá).
> Esta versão registra **só o que mudou** desde a v1.0. Data: 2026-11-13.
> Ao anexar no projeto do claude.ai: suba a v1.1 e mantenha a v1.0 (ou use as duas juntas).

## 1. Regras de trabalho (reforço)
- Desenvolver **sempre na branch `MakeByClaude`**, em back e front. O Jean controla as branches locais e de deploy.
- Sem commit/push/troca de branch feitos pelo Claude. Mudanças ficam pendentes no VS Code.
- Código morto: só listar, não apagar.
- Nomes em **português** no front; no back o padrão misto atual é intencional (exceções foram pensadas), então **não padronizar o back**.
- Mantidos em inglês por decisão: `isOpenModal…` (prefixo `isOpen`, em discussão), `Console…`, `Header`, `Button` e o sufixo `Style` dos styled-components.
- Cuidado com a grafia da branch: usar `MakeByClaude` (C maiúsculo). Com `MakeByclaude` o `.git/HEAD` aponta para um nome inexistente (acontece no Windows). Correção: `git symbolic-ref HEAD refs/heads/MakeByClaude`.

## 2. Back-end — estrutura (ponto 2 do plano de padronização)
- Controllers que se chamavam `*.services.ts` agora são `*.controller.ts` (`artigosCreate`, `etapasCreate`); services `*.services.ts` viraram `*.service.ts`.
- `services/user` → `services/users` e `interfaces/main_database/user` → `…/users` (mesmo plural de `controllers/users` e das rotas).
- `.env.exemple` → `.env.example`.
- **`app.ts` e `server.ts` separados:** `app.ts` só monta o Express e exporta `app` (permite testes sem abrir porta/banco); `server.ts` conecta os bancos e sobe a porta. Scripts: `dev` = `ts-node-dev src/server.ts`, `start` = `node dist/server.js`.
- Verificado: build compila e `/quimicos/estoque`, `/artigos`, `/users`, `/etapas` respondem 200.
- Código morto listado (não apagado): `src/entities/rastreabilidade/…/recebimentoLog.entity.ts` (cópia idêntica de `rastreabilidade_database/…`, que é a usada), `src/services/quimicos/estoque/text.TS`, `src/scripts/truncate/truncate.service.exemple.ts`, `src/scripts/validateKeys - Obsoleto/`.
- Pendente de commit: todas as mudanças acima estão na `MakeByClaude` do back, sem commit.

## 3. Front-end — modais de Recebimentos (alinhados ao contrato)
- `cadastrarRecebimentos` e `editarRecebimentos` (`context/Pages/quimicosContext/recebimentos`) montam o corpo certo: convertem números, enviam `recebido_por` e `atualizado_por` (`"Admin"` via constante `USUARIO_ATUAL`, enquanto não há login) e `quantidade_pallet`.
- Modal de registrar ganhou o campo **Pallets** (padrão 0). Campos renomeados nos dois modais: `recipiente` → `tipo_recipiente`, `quantidade` → `quantidade_recipiente`.
- Erros da edição agora aparecem na notificação (antes só no console).
- Testado contra a API com o mesmo corpo do formulário: POST 201 (saldo do Estoque sobe), PATCH 200, DELETE 204 (saldo volta).

## 4. Front-end — padronização de nomes para português
**Estados e funções:** `setisOpenModal…`→`setIsOpenModal…`; `quimicoAEditadar`/`recebimentoAEditadar`→`…AEditar`; `dadosEmcriptados`→`dadosCriptografados`; `listaQuimicosIsEmpty`→`listaQuimicosVazia`; `quimicoTable`/`recebimentosTable`→`tabelaQuimicos`/`tabelaRecebimentos`; classes `QuimicoTable`/`RecebimentosTable`→`PaginacaoQuimicos`/`PaginacaoRecebimentos`; `colaboradorInfo`→`dadosColaborador`; `colspan`→`titulosColunas` (e `montarColspan`→`montarTitulosColunas`); `openOrCloseModal`→`abrirOuFecharModal`; `getCheckboxStatus`→`obterStatusCheckbox`; `handleKeyPress`/`handleGlobalKeyPress`→`aoPressionarTecla`/`aoPressionarTeclaGlobal`; `handleSearch`/`handleInputChange`/`query`→`aoBuscar`/`aoDigitar`/`termoBusca`; `userContext`→`usuarioContext`; classe `dadosTratativas`→`DadosTratativas` e sua propriedade `copiaListaQuimicos`→`copiaLista` (o estado `copiaListaQuimicos` do contexto de Químicos permanece); em `dadosOffLine`: `bancoLocal`, `transacao`, `tabelaLocal`, `promessaBancoLocal`, `resposta`.

**Componentes e pastas:** `NavBarLeftSide`/`NavBarRightSide`→`BarraLateralEsquerda`/`BarraLateralDireita`; `pages/_components/Nav`→`BarraNavegacao` (`BarraNavegacaoPage`); `Subnav`→`SubBarraNavegacao` (`SubBarraNavegacaoPage`); `RoutesMain`→`RotasPrincipais`; `tableLine`/`tableColum`→`linhaTabela`/`colunaTabela`; pasta `data/Almoxerifado`→`data/Almoxarifado`; função `Editar` das tabelas→`abrirEdicao`.

**Não alterado:** `teste` (dado de exemplo em `secagemContext`/`data`), props genéricas `table`/`setTable` do `BotoesPaginacao`, `doc.txt` com exemplo antigo (`Recebimentos/content/doc.txt`).
Build do front compila (só os avisos antigos de `errors` não usado). Mudanças pendentes de commit na `MakeByClaude` do front.

## 5. Incidentes de git (para não repetir)
- A `develop` local do back estava sem `pull` e sem o `peso_liquido`: o campo "sumiu" da tela. Solução: trabalhar na `MakeByClaude` ou atualizar a `develop`.
- Um rename acidental do editor trocou `getCheckboxStatus` por `RoutesMain` em `console/context/index.jsx` e quebrou o build; foi corrigido no commit `e122ced`.
- Merge correto: **de dentro da branch que vai receber** (`git merge origem`). Erro de digitação (`MakeByClaud`) faz o Git dizer "not something we can merge".

## 6. Pendências (atualizadas)
**Alta**
1. `POST /quimicos/recebimentos` (controller): ainda mascara erros reais como 400 com formato antigo.
2. Rotacionar senhas do Postgres: o `.env` do back ficou no histórico do git.
3. **`.env` do front está versionado na `develop`** (contém `REACT_APP_API_URL` com IP local) apesar de estar no `.gitignore`; o ideal é remover do índice (`git rm --cached .env`) e manter só o `.env.example`.

**Média**
- Ponto 3 do plano: validação com **zod** (recomendado) substituindo os middlewares manuais; começar por químicos e recebimentos, depois users/artigos/etapas.
- Tabela `migrations` com linhas antigas; `GET /quimicos/recebimentos` sem ordenação; pesos `integer`; `.gitattributes` para encerrar os avisos LF/CRLF.
- Itens 3–8 da lista de inconsistências em `docs/api/quimicos.md`.

## 7. Histórico de versões
| Versão | Data | Resumo |
|---|---|---|
| v1.0 | 2026-11-13 | Consolidação inicial: config, migrations, saldo de estoque, PATCH recebimentos, tela Estoque, colunas de Recebimentos |
| v1.1 | 2026-11-13 | Estrutura do back (`server.ts`, nomes), modais de Recebimentos alinhados, padronização de nomes no front, incidentes de git e pendências |
