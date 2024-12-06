# ENADEQUEST - Um Sistema de Geração de Questões no Modelo ENADE

Esse projeto foi construído como tema de um Trabalho de Conclusão de Curso, com o objetivo de criar uma ferramenta de geração de questões de prova no modelo ENADE, aplicando as regras descritas no [Guia de Elaboração e Revisão de Itens](https://download.inep.gov.br/bni/enade/guia_de_elaboracao_e_revisao_de_itens.pdf) disponibilizado pelo INEP, e provas aplicadas nos anos anteriores como base de exemplos para as questões que serão geradas através da API do Google Gemini.

## Tecnologias Utilizadas

- React v18.3.1
- Node v20.11.1
- Python v3.12.1
- Jupyter Notebook(Nesse proeto foi utilziada a extensão no VSCode)
- PostgreSQL v16.2

- Será necessário também ter uma chave de acesso a API do Google Gemini.

## Preparação do Ambiente

O processo de peração do ambiente é separado em 3 etapas, a primeira é a instalação de todas as ferramentas utilzidas, na sequência a preparação do banco de dados para a excução do código python, e for fim a utilização da ferramenta em si.

Siga o seguintes passos para executar a ferramenta.

### Processo ETL
1. Instale o [python](https://www.python.org/downloads/) e o banco de dados [postgreSQL](https://www.postgresql.org/download/) instalado na máquina.
2. Na sequência acesse a o pgAdmin faça o login, e crie um banco de dados. Salve o nome do banco, usuário e senha pois será necessário para rodar o processo ETL.
3 Acesse o arquivo "etl.ipynb" localizado na pasta "processo-etl", e na .segunda célula de código altere o valor das variáveis de conexão com o banco de acordo com as configuradas no pgAdmin.
4. Verifique se possuí todas bibliotecas utilizadas no código, caso contrário execute os seguintes comandos no terminal:
- `pip install pdfmine.sx`
- `pip install psycopg2`
5. Ao instalas as bilbiotecas, pode iniciar a execução das células do arquivo "etl.ipynb" que irá criar as tabelas necessários no banco de dados, e fazer a ingestão dos dados de um das provas.
6. Finalizando a execução do código, se tudo funcionar corretamente, pode realizar um __SELECT *__ em alguam tabela para verificar de os dados foram armazenado corretamente.

### Execução do código react
1. Para o funcionamento correto da aplicação deve adicionar duas variáveis de ambiente no arquivo .env:
1.1 Crie um arquivo na raiz no projeto chama **.env** e adicione a sua chave de acesso a API do Google Gemini, e a URL do banco de dados confome o exemplo a seguir (Altere somente os valores em negrito):
- REACT_APP_AI_KEY=**chave_de_acesso**
- DATABASE_URL=postgres://postgres:**user_postgre**@localhost:**porta**/**nome_banco**
- PORT:5001
2. Execute o seguinte código no terminal para instalas o node no projeto:
- `npm install`
3. Verifique se possuí as dependências do Google Gemini e do  Axios no arquivo `package.json`, caso contrário execute os seguinte códigos no terminar:
- `npm install axios`
- `npm install @google/generativa-ai`
- `npm install concurrently --save-dev`
4. Feita configuração das variáveis de ambiente e instalação das dependências, basta abrir o terminal e executa `npm start` que tanto o servidor como a aplicação vão ser executados.


##### Autor: Leandro Cunha Magalhães
##### Orientador: Tássio Sirqueira