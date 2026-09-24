# Do Modelo à Tabela

**Laboratório da Aula 06 · Frameworks de Persistência de Dados · ENG202011**

Cinco roteiros, 45 minutos. Faça na ordem.

Hoje vocês vão sair de um projeto sem nenhuma entidade e chegar a um banco de dados funcionando, sem escrever uma linha de SQL. No fim, o SQL que ninguém digitou vai estar na tela.

---

## Como funciona

- **Os roteiros são sequenciais.** Não comece o seguinte sem ver a saída do anterior funcionando.
- **Digite o código, não copie e cole.** Digitar obriga a ler, e é onde o aprendizado acontece.
- **Responda as perguntas por escrito**, no relatório da equipe. Elas valem mais que o código.
- **Travou?** Levante a mão. Não recomece o projeto do zero.

---

## Roteiro 1 — O ambiente · ~6 min

> **Objetivo:** abrir a máquina na nuvem e provar que ela funciona.

Não instale nada no computador do laboratório. O projeto roda num computador na nuvem, dentro do navegador.

1. Neste repositório, clique em **Use this template** → **Create a new repository**, e dê um nome qualquer
2. No **seu** repositório, clique no botão verde **Code**
3. Aba **Codespaces** → **Create codespace on main**
4. Espere o terminal terminar de instalar as dependências — leva de um a dois minutos

Quando o terminal parar, rode:

```bash
npm start
```

O projeto já vem montado: TypeScript configurado, dependências declaradas, conexão com o banco escrita. O que **não** existe ainda é entidade nenhuma — é esse o trabalho de hoje.

> ✅ **Pronto quando** o terminal imprimir `Conexao aberta. O banco esta pronto.`

---

## Roteiro 2 — A primeira entidade · ~9 min

> **Objetivo:** descrever o Paciente para o framework — sem dizer nada sobre tabela.

A pasta `src/entity/` está vazia. Crie ali o arquivo `Paciente.ts` e digite:

```ts
@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  nascimento: string;

  @Column({ nullable: true })
  convenio: string;
}
```

Você vai precisar importar `Entity`, `PrimaryGeneratedColumn` e `Column` a partir de `typeorm`. O editor sugere.

### Agora a parte que todo mundo esquece

Abra `src/data-source.ts` e acrescente `Paciente` à lista `entities`, que está vazia. Escrever a classe não basta — a conexão precisa saber que ela existe. Tem um comentário no arquivo marcando o lugar.

### Responda antes de seguir

**1.** Por que `nascimento` não tem `nullable` e `convenio` tem? O que isso significa para quem vai cadastrar um paciente?

**2.** Quem decide o valor do `id` de um paciente novo: você, a aplicação, ou o banco? A resposta está no nome do decorador.

> ✅ **Pronto quando** você conseguir apontar, no próprio arquivo, qual campo aceita nulo e quem gera o id.

---

## Roteiro 3 — A entidade vira tabela · ~9 min

> **Objetivo:** ver o SQL que você não escreveu.

Ainda em `src/data-source.ts`, ache a linha `logging` e troque `false` por `true`:

```ts
logging: true,
```

**Essa é a linha mais importante do arquivo.** É ela que joga na tela todo comando que o framework manda para o banco. Sem ela, este laboratório não tem graça nenhuma.

Rode `npm start` e leia o console com calma. Procure a linha que começa com `query:` e contém `CREATE TABLE`.

### Responda olhando o console

**3.** Quem escreveu esse `CREATE TABLE`? Você digitou essa instrução em algum lugar?

**4.** De onde saiu o `NOT NULL` que aparece na coluna `nome`? E por que a coluna `convenio` não tem `NOT NULL`?

**5.** O nome da tabela foi decisão de quem? Procure no seu código onde esse nome está escrito.

> ✅ **Pronto quando** o arquivo `clinica.db` aparecer na pasta do projeto e você achar o `CREATE TABLE` no console.

---

## Roteiro 4 — Gravar, ler, e ver o SQL · ~10 min

> **Objetivo:** usar o repositório — o objeto que traduz nos dois sentidos.

Abra `src/index.ts`. Existe um comentário marcando `// ROTEIRO 4: o seu codigo vem aqui.` — troque esse comentário por:

```ts
const repo = AppDataSource.getRepository(Paciente);

await repo.save({
  nome: 'Ana "Aninha" Souza',
  nascimento: "1988-04-12"
});

console.log(await repo.find());
```

Você vai precisar importar `Paciente` no topo do arquivo, ao lado do import que já existe.

Rode de novo. Repare no que o `repo` faz: em `save` ele recebe um objeto e produz uma linha; em `find` ele recebe linhas e produz objetos. É a tradução dos dois lados, no mesmo lugar.

### Esta parte é entrega

Copie do console:

- a consulta de `INSERT` que apareceu
- a consulta de `SELECT` que apareceu

### Responda olhando o console

**6.** Quantas idas ao banco custou a operação de listar os pacientes? Conte as linhas `query:` que apareceram depois do `find`.

> ✅ **Pronto quando** as duas consultas estiverem copiadas no relatório da equipe e o paciente aparecer impresso no console.

---

## Roteiro 5 — A segunda entidade, agora sozinhos · ~11 min

> **Objetivo:** aplicar tudo de novo, sem modelo na tela.

Aqui não tem código pronto. Vocês já viram como se faz.

- Crie a entidade `Especialidade`, com um id gerado e um campo `nome` que **não aceite valores repetidos**
- Registre a nova entidade na lista do `data-source`
- Rode de novo e leia o **segundo** `CREATE TABLE` no console
- Grave três especialidades e copie o SQL para o relatório

**Dica, e só:** o decorador `@Column()` aceita opções entre chaves — vocês já usaram uma delas no `Paciente`. Existe outra opção para impedir valores repetidos. Procure na documentação ou no autocompletar do editor.

### Responda

**7.** Qual decorador, e qual opção dele, produziu a restrição `UNIQUE` no `CREATE TABLE`?

**8.** O nome da especialidade já é único no mundo real. Então por que ainda colocamos um `id` gerado ao lado dele? O que aconteceria se a chave da tabela fosse o próprio nome e a clínica decidisse renomear uma especialidade?

> ✅ **Pronto quando** as duas tabelas existirem e você souber dizer qual decorador produziu o `UNIQUE`.

---

## Terminou antes?

Tente gravar uma especialidade com um nome que já existe. Leia a mensagem de erro com atenção e anote-a.

Repare em quem reclamou: não foi o seu código, foi o banco. É a primeira vez no semestre que o banco defende uma regra sozinho, sem a aplicação pedir.

---

## Entrega da equipe

Um documento por equipe, com estes cinco itens:

- [ ] O `CREATE TABLE` da tabela `paciente`, copiado do console
- [ ] O `CREATE TABLE` da tabela `especialidade`, copiado do console
- [ ] As consultas de `INSERT` e `SELECT` do roteiro 4
- [ ] As respostas das oito perguntas numeradas
- [ ] O código das duas entidades

---

## Se travar

| A mensagem parece com | O que provavelmente é |
|---|---|
| `No metadata for "Paciente" was found` | Você escreveu a classe mas não registrou a entidade na lista do `data-source.ts`. |
| `NOT NULL constraint failed: paciente.nome` | Você tentou gravar um paciente sem um campo obrigatório. O banco está cobrando o que a sua entidade prometeu. |
| `UNIQUE constraint failed: especialidade.nome` | Você gravou uma especialidade com nome repetido. No roteiro 5, isso é o exercício funcionando. |
| Erro sobre tipo de coluna não determinado | Decorador escrito sem os parênteses — `@Column` em vez de `@Column()` — ou faltando o tipo do atributo. |
| Erro ao alterar uma coluna que já existe | O banco em disco é mais velho que a sua entidade. Apague `clinica.db` e rode de novo. |
| `Cannot find module 'typeorm'` | A instalação das dependências ainda não terminou, ou falhou. Rode `npm install` no terminal e espere. |

---

## Ainda não

> ⚠️ **Não criem nenhuma ligação entre `Paciente` e `Especialidade` hoje.** Nada de campos apontando de uma entidade para a outra.

Hoje as duas tabelas são ilhas, de propósito. Ligar uma na outra é o assunto inteiro da próxima aula, e quem adiantar vai chegar lá sem a pergunta que faz a aula valer a pena.

---

## Antes de fechar o notebook

Na semana passada vocês escreveram um serializador JSON à mão. Voltem ao número de linhas que anotaram naquele exercício.

**Quantas linhas vocês escreveram hoje** para ganhar duas tabelas, as instruções de criação e as operações de gravar e listar prontas?

Guardem esse número. Ele é metade da resposta sobre o que um framework resolve — a outra metade vem mais para frente no semestre.

---

## Referência rápida

| Arquivo | O que é |
|---|---|
| `src/entity/` | onde suas entidades nascem — começa vazia |
| `src/data-source.ts` | a conexão com o banco — você mexe aqui nos roteiros 2 e 3 |
| `src/index.ts` | o ponto de partida — você mexe aqui no roteiro 4 |
| `clinica.db` | o banco, criado sozinho. Descartável: apague e rode de novo |

Para rodar: `npm start`. Pode rodar quantas vezes precisar.

Travou durante a semana? Abra a dúvida antes da próxima aula, não no dia.
