# Back-end
Uma coisa interessante nesta etapa é a utilização de um CSV como um banco de dados, por assim dizer. É interessante manipular arquivos e criar toda a estrutura de leitura e gravação.
## Coleção no Insomnia
Para ter acesso aos endpoints presentes nesta API, importe o arquivo `./Insomnia Project.json` no seu Insomnia ou Postman.
Nele também contém a documentação da API.

## Ausência do Docker
Já tenho um bom tempo sem utilizar o Docker na minha máquina, quando tentei abrí-lo, o mesmo deu erro na inicialização do daemon. Tentei resolver nos últimos dias mas infelizmente não consegui.

## Bibliotecas utilizadas
* NANOID
Não tem nenhum motivo técnico específico por trás dessa escolha, eu utilizo bastante em outros projetos e já estou familiarizado, mas poderia facilmente alternar para um uuid-v4 se necessário fosse.

* TSYRINGE
A injeção de dependências permite que nós tenhamos um maior controle sobre aquilo que acontece na nossa aplicação. Também tenho muita familiaridade com essa biblioteca, por utilizá-la em outros projetos. Para mim, até então, ela é indispensável no que tange à SOLID e TS por que permite a reutilização de classes e métodos em diferentes áreas do projeto.

* CSV-STRING
Neste caso específico, foi utilizada para dar parse no arquivo CSV. Primeira vez que utilizei, por ser algo atípico trabalhar com este tipo de arquivo.

* EXPRESS.JS
É a biblioteca que eu mais utilizo na construção de aplicações back-end, tenho muita familiaridade e foi minha escolha para este projeto.

* VITEST
Também por uma questão de afinidade e familiaridade, escolhi essa biblioteca para os testes unitários. Pode ser facilmente substituída pela JEST ou Mocha.

As outras bibliotecas são dependências ou complementos dessas acima.


