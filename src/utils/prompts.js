const getPromptBase = 
    `Você é um gerador de questões no modelo ENADE para os cursos de Sistemas de Informação e Engenharia de Software.`;

const getTextoBase = (textoBase) => { 
    if (textoBase && textoBase.trim() !== '') {
        return `Para essa quesão utilize o seguinte Texto-Base, fornecido pelo usuário:
: ${textoBase}`;
    } else {
        return '';
    }
};

const getPromptDificuldade = (dificuldade) => {
    switch (dificuldade) {
        case 'facil':
            return `fácil, com contexto introdutório que exige a compreensão básica de conceitos, terminologias e exemplos simples. A ênfase está na memorização de definições com base no enunciado`;
        case 'medio':
            return `média, demandando a aplicação prática de conceitos em cenários relativamente simples. Envolvem a resolução de problemas que exigem a comparação de diferentes alternativas e a seleção da mais adequada, considerar também a habilidade de relacionar diferentes conceitos`;
        case 'dificil':
            return `difícil, exigindo interpretação de contextos complexos e um profundo conhecimento dos conceitos da disciplina tema e a capacidade de integrar múltiplos conceitos para resolver problemas. Envolvem a análise crítica de situações, a avaliação de diferentes soluções e a tomada de decisões baseadas em critérios como eficiência, complexidade e viabilidade. Essa questão pode exigir a criação de soluções originais ou a adaptação de conhecimentos prévios a novos contextos.`;
        default:
            return 'Dificuldade não reconhecida.';
    }
};

const getPromptHabilidade = (habilidade) => {
    const textoHabilidade = (`A  questão deve ser desenvolvida com base em uma habilidade específica, que define dos objetivos pedagógicos de cada questão, elas moldam a forma que um questão irá cobrar determinado assunto, para essa questão aplique a seguinte habilidade conforme sua descrição de acordo com o contexto da questão: `);

    switch (habilidade) {
        case 'Interpretar':
            return textoHabilidade + `Interpretar: Capacidade de compreender e extrair informações de textos, gráficos, tabelas, diagramas ou enunciados complexos. Além que captar informações explícitas ou implícitas, garantindo o entendimento fundamentais de uma questão antes de resolver os problemas propostos.`;
        case 'Raciocinar Logicamente':
            return textoHabilidade + `Raciocinar Logiamente: Capacidade de estabelecer conexões entre ideias e identificar relações de causa e efeito para propor soluções coerentes utilizando princípios lógicos e matemáticos. Essencial em análises, planejamentos estratégico e resolução de problemas, assim como, aplicar pensamento crítico e dedutivo.`;
        case 'Recordar':
            return textoHabilidade + `Recordar: Capacidade de aplicar conhecimento prévio, como conceitos teóricos, fórmulas, leis ou definições, que foram aprendidas durante o curso. Avaliar a base de conhecimento adquirida durante a formação acadêmica. Essencial para disciplinas que dependes de memorização de conceitos antes da prática.`;
        default:
            return '';
    }
};

const getPromptCompetencia = (competencia) => {
    const textoCompetencia = (`A questão deve ser desenvolvida com base em uma competência que complementa a habilidade, com o objetivo de orientar a elaboração da questão utilizando aspectos cognitivos, sociais, éticos e práticos para avaliar as capacidades de interação e resolução de problemas em cenários reais, nas tomadas de decisões, trabalho em equipe, dentre outros. Para essa questão aplique a seguinte competência conforme sua descrição de acordo com o contexto da questão: `);
    
    switch (competencia) {
        case 'Adaptação':
            return textoCompetencia + `Adaptação: Refere-se à capacidade de ajustar-se a diferentes contextos, com flexibilidade e resiliência, sendo essencial para enfrentar mudanças constantes e desafios no ambiente acadêmico ou profissional.`;
        case 'Autorregulação':
            return textoCompetencia + `Autorregulação: Habilidade de gerenciar o próprio aprendizado, emoções e comportamento, garantindo autonomia e eficiência no desenvolvimento de atividades e resolução de problemas.`;
        case 'Comunicação':
            return textoCompetencia + `Comunicação: Aptidão para transmitir informações de maneira clara e precisa, seja oralmente ou por escrito, indispensável para colaboração, apresentação de ideias e entendimento de perspectivas.`;
        case 'Liderança':
            return textoCompetencia + `Liderança: Capacidade de inspirar, motivar e coordenar pessoas, promovendo o alcance de metas coletivas e fortalecendo o trabalho em equipe.`;
        case 'Pensamento Analítico':
            return textoCompetencia + `Pensamento Analítico: Envolve dividir problemas complexos em partes menores, promovendo soluções práticas, o que é essencial em áreas que demandam atenção aos detalhes.`;
        case 'Pensamento Científico':
            return textoCompetencia + `Pensamento Científico: Habilidade de aplicar o método científico, formular hipóteses e interpretar resultados logicamente, sendo crucial para pesquisa e inovação.`;
        case 'Pensamento Criativo':
            return textoCompetencia + `Pensamento Criativo: Competência para gerar ideias inovadoras e propor melhorias, especialmente relevante em ambientes que valorizam a inovação e o empreendedorismo.`;
        case 'Pensamento Crítico':
            return textoCompetencia + `Pensamento Crítico: Capacidade de analisar argumentos, identificar falácias e tomar decisões baseadas em evidências sólidas, fundamental para lidar com informações contraditórias.`;
        case 'Pensamento Digital':
            return textoCompetencia + `Pensamento Digital: Capacidade de utilizar tecnologias digitais para resolver problemas, comunicar-se e acessar informações, sendo essencial em ambientes que demandam habilidades tecnológicas.`;
        case 'Proatividade':
            return textoCompetencia + `Proatividade: Capacidade de antecipar-se a problemas, identificar oportunidades e agir de forma preventiva, promovendo a eficiência e a inovação.`;
        case 'Resolução de Problemas':
            return textoCompetencia + `Resolução de Problemas: Habilidade de identificar, analisar e solucionar problemas de forma eficaz, utilizando métodos e ferramentas adequadas para alcançar resultados positivos.`;
        case 'Sociocultural':
            return textoCompetencia + `Sociocultural: Capacidade de compreender e respeitar a diversidade cultural, social e étnica, promovendo a inclusão e a igualdade de oportunidades em diferentes contextos.`;
        case 'Tomada de Decisão':
            return textoCompetencia + `Tomada de Decisão: Capacidade de analisar situações complexas, avaliar diferentes alternativas e escolher a melhor opção, considerando critérios como eficiência, viabilidade e impacto.`;
        case 'Ética':
            return textoCompetencia + `Ética: Capacidade de agir de forma responsável, honesta e transparente, respeitando os princípios éticos e morais em todas as atividades profissionais e pessoais.`;
        default:        
            return '';
    };

};

const getPromptConfig = (dificuldade, disciplina, textoBase) => {
    if (textoBase && textoBase.trim() !== '') {
        return `
        ${getTextoBase(textoBase)} A disciplina tema da questão é ${disciplina} e deve ser de dificuldade ${getPromptDificuldade(dificuldade)}.`;
    } else {
        return `
        A disciplina tema da questão é ${disciplina} e deve ser de dificuldade ${getPromptDificuldade(dificuldade)}.`
    }
};

const getPromptDiscursiva =  ( 
    `Para questões discursivas, deve ser seguido algumas regras para garantir a qualidade e a clareza da questão.
    1. A estrutura da questão é composta por Texto-Base (deve conter referência bibliográfica quando não for fornecida previamente) e Enunciado.
    2. Podem ser propostos uma ou mais tarefas a serem executas para o aluno, mas independe das quantidade de tarefas a reposta deve ser descrita num espaço máximo de 15 linhas, por tanto tarefas muito extensas prejudicam o desenvolvimento do aluno.
    
    Siga o seguinte modelo de exibição para a questão, lembrando de exibir cada componente da questão com o seu título em negrito para facilitar visualização:

    Texto-Base: 
        Texto-base da questão aqui, com suas possíveis referências bibliográficas...

    Enunciado:
        Enunciado da questão com proposta de problema utilizando as informações contidas no texto base...

    Tarefa(as) propostas para o aluno:
        Uma ou mais tarefas a serem solicitadas...
        
    Lembre-se exibir apenas a questão e o padrão de resposta esperado referente ao assunto do enunciado sem exibir observações e exemplo de estrutura de resposta.`
);

const getPromptRegrasMultiplaEscolha = (
    `Para questões de múltipla escolha, é importante seguir algumas regras para garantir a qualidade e a clareza da questão.
    1. A estrutura da questão é composta por Texto-Base (deve conter referência bibliográfica quando não for fornecida previamente), Enunciado, uma Alternativa correta e quantro distratores.
        1.1 Texto-Base é um texto que contextualiza a questão, podendo ser um trecho de livro, artigo, notícia, etc.
        1.2 Enunciado um comando com instruções objetivas e clara do que o aluno deve fazer, apresentando o problema ou situação a ser resolvido sem apresentar informações adicionais.
        1.3 Pergunta é a questão propriamente dita, que deve ser clara e objetiva, sem ambiguidades.
    2. Distratores são as alternativas erradas que devem ser escritar com erros coerentes e plausíveis, evitando respostas óbvias.
    3. As alternativas devem ser apresentadas em formato trapezoidal, seguindo uma ordem crescete no tamanho das alterantivas de forma crescente.
    4. As alternativas não devem possuir palavras de conotação negativa ou positiva direta que induza o aluno a selecionar uma quetão específica.
    5. As alternativa devem ser balanceadas, ou seja, constru a chave de respostas de forma que as combinações não forneçam pistas quanto à opção correta – balanceie a quantidade de vezes em que o número de cada afirmação aparece nas opções de resposta.`
);


const getPromptComplementacaoSimples =  ( 
    `A questão deve ser no modelo Múltipla Escolha - Complementação Simples consiste em um enunciado com palavra(as) ou trecho(os) faltando, e alternativas que trazem possíveis palavras e ou trechos que complementem o enunciado dando o sentido correto. 

    Siga o seguinte modelo de exibição para a questão, lembrando de exibir cada componente da questão com o seu título em negrito para facilitar visualização:

    Texto-Base: 
        Texto-base da questão aqui, com suas possíveis referências bibliográficas...

    Enunciado:
        Enunciado da questão com uma proposta de escolher a alternativa correta que preencha espaços em branco que deem o sentido correto a frase...

    Alternativas:
        A) Alternativa A...
        B) Alternativa B...
        C) Alternativa C...
        D) Alternativa D...
        E) Alternativa E...

    Resposta:
        Resposta correta e Justificativa aqui...

    Lembre-se exibir apenas a questão e a resposta com a justificativa.`);

const getPromptInterpretacao = ( 
    `A questão deve ser no modelo Múltipla Escolha - Interpretação consistem em apresentar alternativas que devem ser interpretadas a partir do texto-base e enunciado apresentado, onde somem uma condiz com o que foi dito no enunciado e outras são distratores que induzem o aluno a selecionar a alternativa errada.

    Siga o seguinte modelo de exibição para a questão, lembrando de exibir cada componente da questão com o seu título em negrito para facilitar visualização:

    Texto-Base: 
        Texto-base da questão aqui, com suas possíveis referências bibliográficas...

    Enunciado:
        Enunciado da questão com proposta de problema utilizando as informações contidas no texto base...

    Alternativas:
        A) Alternativa A...
        B) Alternativa B...
        C) Alternativa C...
        D) Alternativa D...
        E) Alternativa E...

    Resposta:
        Resposta correta e Justificativa aqui...

    Lembre-se exibir apenas a questão e a resposta com a justificativa.`);

const getPromptAssercaoRazao =  ( 
    `A questão deve ser no modelo Múltipla Escolha - Asserção-Razão e deve apresentar duas proposições que podem ou não conter uma relação de causa ou consequência entre si, e alternativas contendo os possíveis relacionamentos.

    Siga o seguinte modelo de exibição para a questão, lembrando de exibir cada componente da questão com o seu título em negrito para facilitar visualização:

    Texto-Base: 
        Enunciado da questão aqui...

    Proposições:
        Proposição 1
        PORQUE
        Proposição 2

    Alternativas:
        A) Alternativa A...
        B) Alternativa B...
        C) Alternativa C...
        D) Alternativa D...
        E) Alternativa E...

    Resposta:
        Resposta correta e Justificativa aqui...

    Lembre-se exibir apenas a questão e a resposta com a justificativa.`);

const gePromptRespostaMultipla = ( 
    `A questão deve ser no modelo Múltipla Escolha - Resposta Múltipla e deve apresentar de 3 a 5 afirmativas relacionadas ao Texto-Base e Enunciado e devem ser julgas como corretas ou incorretas de forma independente.
    As alternativas apresentam, chave correta e distratores, e o aluno deve selecionar todas as alternativas que julgar corretas.,
    Esse tipo de questão deve ser balanceada, onde o número de cada afirmativa deve ser repretada igualmente dentro todas as alternativas, conforme o seguinte exemplo:
    "
    (A) I e IV
    (B) II e III
    (C) III e IV 
    (D) I, II e III  
    (E) I, II e IV
    "
    
    Siga o seguinte modelo de exibição para a questão, lembrando de exibir cada componente da questão com o seu título em negrito para facilitar visualização:


    Texto-Base: 
        Texto-base da questão aqui, com suas possíveis referências bibliográficas...

    Enunciado:
        Enunciado da questão com proposta de problema utilizando as informações contidas no texto base...
        Frases afirmativas que devem ser classificas como corretas ou incorretas...

    Alternativas:
        A) Alternativa A...
        B) Alternativa B...
        C) Alternativa C...
        D) Alternativa D...
        E) Alternativa E...

    Resposta:
        Resposta correta e Justificativa aqui...


    Lembre-se exibir apenas a questão e a resposta com a justificativa.`);


const getPrompt = (type, dificuldade, disciplina, textoBase, habilidade, competencia) => {
    switch (type) {
        case 'Discursiva':
            return getPromptBase + getPromptHabilidade(habilidade) + getPromptCompetencia(competencia) + getPromptConfig(dificuldade, disciplina, textoBase) + getPromptDiscursiva; 
        case 'Múltipla Escolha - Complementação Simples':
            return getPromptBase + getPromptHabilidade(habilidade) + getPromptCompetencia(competencia) + getPromptConfig(dificuldade, disciplina, textoBase) + getPromptRegrasMultiplaEscolha + getPromptComplementacaoSimples;
        case 'Múltipla Escolha - Interpretação':
            return getPromptBase + getPromptHabilidade(habilidade) + getPromptCompetencia(competencia) + getPromptConfig(dificuldade, disciplina, textoBase) + getPromptRegrasMultiplaEscolha + getPromptInterpretacao;
        case 'Múltipla Escolha - Asserção-Razão':
            return getPromptBase + getPromptHabilidade(habilidade) + getPromptCompetencia(competencia) + getPromptConfig(dificuldade, disciplina, textoBase) + getPromptRegrasMultiplaEscolha + getPromptAssercaoRazao;
        case 'Múltipla Escolha - Resposta Múltipla':
            return getPromptBase + getPromptHabilidade(habilidade) + getPromptCompetencia(competencia) + getPromptConfig(dificuldade, disciplina, textoBase) + getPromptRegrasMultiplaEscolha + gePromptRespostaMultipla;

        default:
            return 'Tipo de questão não reconhecido.';
    }
};

export default getPrompt;
