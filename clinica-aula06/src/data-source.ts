import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "clinica.db",

  // Monta as tabelas a partir das entidades toda vez que o projeto sobe.
  // Aceitavel em desenvolvimento. Inaceitavel em producao — e voce vai
  // entender por que quando o banco tiver dado dentro.
  synchronize: true,

  // ROTEIRO 3: ligue isto.
  // E esta linha que joga na tela todo comando que o framework manda
  // para o banco. Sem ela, o laboratorio de hoje nao tem graca nenhuma.
  logging: false,

  // ROTEIRO 2: registre aqui a entidade que voce criar.
  // Escrever a classe nao basta — a conexao precisa saber que ela existe.
  entities: [],
});
