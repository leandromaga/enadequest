import React, { useEffect } from 'react';
import './modalInfoTipoQuestao.css'; // Certifique-se de importar o CSS

const ModalInfoTipoQuestao = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open'); // Limpa a classe ao desmontar o componente
    };
  }, [isOpen]);

  if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-tipo-questao" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Tipos de Questão:</h2>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="modal-content">
        <p className="modal-text">
          O ENADE é composto por questões discursivas e de múltipla escolha, onde as de múltipla escolha são divididas em quatro tipos, descritos abaixo:

          <br /><br />
    
          <strong>1. Discursiva:</strong><br />
          Questões discursivas fornecem um contexto detalhado e pedem uma resposta dissertativa ou a solução de um problema. O enunciado contextualiza o tema, seguido de uma pergunta específica.<br />
          <em>Modelo:</em><br />
          <strong>Enunciado:</strong> Explique os principais conceitos de programação orientada a objetos e como eles influenciam o desenvolvimento de sistemas.<br />
          <strong>Pergunta:</strong> Discuta a importância do encapsulamento e herança na criação de estruturas modulares em software.

          <br /><br />

          <strong>2. Múltipla Escolha - Complementação Simples:</strong><br />
          Esse modelo apresenta um contexto seguido por uma frase com lacuna a ser completada. As alternativas incluem distratores plausíveis para tornar a escolha mais desafiadora.<br />
          <em>Modelo:</em><br />
          <strong>Enunciado:</strong> O paradigma funcional utiliza conceitos como funções puras e imutabilidade.<br />
          <strong>Pergunta:</strong> Uma das características principais da programação funcional é ______.<br />
          <strong>Alternativas:</strong><br />
          A) permitir o estado mutável de variáveis.<br />
          B) reduzir os efeitos colaterais no código.<br />
          C) usar orientação a objetos em sua totalidade.<br />
          D) depender do uso de loops explícitos.<br />
          E) ignorar a composição de funções.<br />

          <br /><br />

          <strong>3. Múltipla Escolha - Interpretação:</strong><br />
          Questões de interpretação apresentam situações, gráficos ou tabelas, levando à análise crítica e escolha correta com base nos dados.<br />
          <em>Modelo:</em><br />
          <strong>Enunciado:</strong> Um estudo comparativo de algoritmos mostrou que QuickSort é mais eficiente para grandes volumes de dados, enquanto BubbleSort é mais simples de implementar.<br />
          <strong>Pergunta:</strong> Qual recomendação está alinhada ao uso do QuickSort?<br />
          <strong>Alternativas:</strong><br />
          A) Pode ser usado para qualquer tamanho de conjunto de dados.<br />
          B) Ideal para conjuntos pequenos devido à simplicidade.<br />
          C) Preferível para grandes volumes onde eficiência é essencial.<br />
          D) Desempenha bem onde não há necessidade de ordenação completa.<br />
          E) É o mais eficiente em todos os casos.<br />

          <br /><br />

          <strong>4. Múltipla Escolha - Asserção-Razão:</strong><br />
          Nesse modelo, o estudante analisa o relacionamento entre uma afirmação e uma razão, avaliando a lógica e a veracidade.<br />
          <em>Modelo:</em><br />
          <strong>Enunciado:</strong> O encapsulamento é uma técnica essencial na programação orientada a objetos.<br />
          <strong>Pergunta:</strong><br />
          A) O encapsulamento protege dados sensíveis das classes.<br />
          PORQUE<br />
          B) Ele permite que classes derivadas acessem diretamente os atributos privados da classe base.<br />
          <strong>Alternativas:</strong><br />
          A) Asserções A e B são verdadeiras, e B explica corretamente A.<br />
          B) Asserções A e B são verdadeiras, mas B não explica A.<br />
          C) A é verdadeira, e B é falsa.<br />
          D) A é falsa, e B é verdadeira.<br />
          E) Ambas são falsas.<br />

          <br /><br />

          <strong>5. Múltipla Escolha - Resposta Múltipla:</strong><br />
          Composta por várias afirmativas, o estudante deve determinar se cada uma é verdadeira ou falsa.<br />
          <em>Modelo:</em><br />
          <strong>Enunciado:</strong> Avalie as seguintes afirmações sobre estruturas de dados.<br />
          <strong>Pergunta:</strong> Assinale verdadeiro (V) ou falso (F) para cada afirmativa.<br />
          1) Uma árvore binária organiza elementos hierarquicamente.<br />
          2) Pilhas seguem o princípio FIFO.<br />
          3) Listas encadeadas são eficientes em inserções no início.<br />
          4) Hashmaps são ideais para busca em tempo constante.<br />
          <strong>Alternativas:</strong><br />
          A) V, F, V, V<br />
          B) V, V, F, F<br />
          C) F, V, F, V<br />
          D) V, F, F, V<br />
          E) V, V, F, V<br />
        </p>

        </div>
      </div>
    </div>
  );
};

export default ModalInfoTipoQuestao;
