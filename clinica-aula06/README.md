# Clínica — Laboratório da Aula 06

**ENG202011 · Frameworks de Persistência de Dados · GO1302**

Projeto-base do laboratório de hoje. Não precisa instalar nada no computador.

---

## Como começar

1. Clique no botão verde **Code** aqui em cima.
2. Aba **Codespaces** → **Create codespace on main**.
3. Espere a barra de progresso terminar. O VS Code abre no navegador, já com as
   dependências instaladas.

Quando o terminal parar de trabalhar, você está pronto. Vá para o **roteiro 2**.

> A primeira abertura leva de um a dois minutos. Se demorar muito mais que isso,
> levante a mão.

---

## O que já está pronto

| Arquivo | O que é |
|---|---|
| `package.json` | dependências do projeto, já instaladas |
| `tsconfig.json` | configuração do TypeScript, já ajustada para os decoradores |
| `src/data-source.ts` | a conexão com o banco — **você vai mexer aqui nos roteiros 2 e 3** |
| `src/index.ts` | o ponto de partida — **você vai mexer aqui no roteiro 4** |
| `src/entity/` | pasta vazia — **é aqui que suas entidades vão nascer** |

## O que ainda não existe

Nenhuma entidade. Nenhuma tabela. Nenhum banco.

É exatamente esse o trabalho de hoje.

---

## Para rodar o projeto

```
npm start
```

Rode sempre que quiser ver o resultado. Pode rodar quantas vezes precisar.

## Se algo der errado

O arquivo `clinica.db` é descartável. Apagar e rodar de novo resolve a maior
parte dos problemas de banco desatualizado.

Travou em outra coisa? Levante a mão. Não recomece o projeto do zero.
