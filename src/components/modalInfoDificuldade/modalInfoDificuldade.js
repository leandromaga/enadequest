import React, { useEffect } from 'react';
import './modalInfoDificuldade.css'; // Certifique-se de importar o CSS

const ModalInfoDificuldade = ({ isOpen, onClose }) => {
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
      <div className="modal-dificuldade" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Níveis de Dificuldade:</h2>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="modal-content">
        <p className="modal-text">
            Para as questões gerada podem ser selecionados 3 tipos de dificuldade (Fácil, Médio ou Difícil), 
            onde cada uma delas representa um nível de complexidade diferente para a questão.

            <br /><br />

            <strong>1. Fácil:</strong><br />
            Questões de dificuldade fácil apresentam um contexto introdutório que exige a compreensão básica de conceitos, 
            terminologias e exemplos simples. A ênfase está na memorização de definições com base no enunciado.
     

            <br /><br />

            <strong>2. Médio:</strong><br />
            Questões de dificuldade média, demandam a aplicação prática de conceitos em cenários relativamente simples. 
            Envolvem a resolução de problemas que exigem a comparação de diferentes alternativas e a seleção da mais adequada, 
            considerar também a habilidade de relacionar diferentes conceitos.
       

            <br /><br />

            <strong>3. Difícil:</strong><br />
            Questões de dificuldade difícil, exigem interpretação de contextos complexos e um profundo conhecimento 
            dos conceitos da disciplina tema e a capacidade de integrar múltiplos conceitos para resolver problemas. 
            Envolvem a análise crítica de situações, a avaliação de diferentes soluções e a tomada de decisões baseadas 
            em critérios como eficiência, complexidade e viabilidade. Essa questão pode exigir a criação de soluções originais 
            ou a adaptação de conhecimentos prévios a novos contextos.
                    

          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalInfoDificuldade;
