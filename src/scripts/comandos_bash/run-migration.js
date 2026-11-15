// Atalho para os comandos de migration do TypeORM, por banco.
//
// Uso (via npm):
//   npm run migration:create:main -- nomeDaMigration
//   npm run migration:generate:rastreabilidade -- nomeDaMigration
//   npm run migration:run:main
//   npm run migration:run:main -- --fake   (marca como aplicada sem executar o SQL)
//   npm run migration:revert:main
//   npm run migration:show:main
const { spawnSync } = require("child_process");

// argumentos que começam com "--" são repassados ao typeorm (ex.: --fake)
const rawArgs = process.argv.slice(2);
const extraFlags = rawArgs.filter((a) => a.startsWith("--"));
const [command, dataSource, migrationName] = rawArgs.filter(
  (a) => !a.startsWith("--")
);

const DATA_SOURCES = {
  main: "src/database/data-source-main.ts",
  rastreabilidade: "src/database/data-source-rastreabilidade.ts",
};
const COMMANDS_WITH_NAME = ["create", "generate"]; // exigem nome
const COMMANDS_WITH_DS = ["generate", "run", "revert", "show"]; // exigem -d
const VALID_COMMANDS = ["create", "generate", "run", "revert", "show"];

const fail = (msg) => {
  console.error(msg);
  process.exit(1);
};

if (!command || !dataSource) {
  fail(
    "Uso: npm run migration:<comando>:<banco> [-- nomeDaMigration]\n" +
      `  comandos: ${VALID_COMMANDS.join(", ")}\n` +
      `  bancos:   ${Object.keys(DATA_SOURCES).join(", ")}`
  );
}
if (!VALID_COMMANDS.includes(command)) fail(`Comando desconhecido: ${command}`);

const dataSourceFile = DATA_SOURCES[dataSource];
if (!dataSourceFile) fail(`Banco inválido: ${dataSource}`);

if (COMMANDS_WITH_NAME.includes(command) && !migrationName) {
  fail(
    `O comando "${command}" exige o nome da migration.\n` +
      `Exemplo: npm run migration:${command}:${dataSource} -- nomeDaMigration`
  );
}

// monta os argumentos como array (sem passar por shell: seguro com espaços e aspas)
const args = [`migration:${command}`];
if (COMMANDS_WITH_NAME.includes(command)) {
  args.push(`src/migrations/${dataSource}/${migrationName}`);
}
if (COMMANDS_WITH_DS.includes(command)) {
  args.push("-d", dataSourceFile);
}

args.push(...extraFlags);

console.log(`Executando: typeorm-ts-node-commonjs ${args.join(" ")}`);

const result = spawnSync("typeorm-ts-node-commonjs", args, {
  stdio: "inherit",
  cwd: process.cwd(),
  shell: process.platform === "win32", // no Windows o binário é um .cmd
});

if (result.error) fail(`Falha ao executar o typeorm: ${result.error.message}`);
process.exit(result.status ?? 1);
