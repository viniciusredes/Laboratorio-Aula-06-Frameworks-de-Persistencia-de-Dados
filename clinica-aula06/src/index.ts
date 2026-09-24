import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    console.log("Conexao aberta. O banco esta pronto.");

    // ROTEIRO 4: o seu codigo vem aqui.
  })
  .catch((erro: unknown) => {
    console.error("Falhou ao abrir a conexao:");
    console.error(erro);
  });
