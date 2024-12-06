import React, { useEffect } from 'react';
import './modalInfoHabilidade.css'; // Certifique-se de importar o CSS

const ModalInfoHabilidade = ({ isOpen, onClose }) => {
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
      <div className="modal-habilidade" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Habilidades de uma questão:</h2>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="modal-content">
        <p className="modal-text">
        Habilidades são as definições dos objetivos pedagógicos de cada questão, elas 
            moldam a forma que um questão irá cobrar determinado assunto, essas habilidades 
            podem ser dê 3 tipos:

            <br /><br />

            <strong>1. Interpretar:</strong><br />
            Capacidade de compreender e extrair informações de textos, gráficos, tabelas, 
            diagramas ou enunciados complexos. Além que captar informações explícitas ou 
            implícitas, garantindo o entendimento fundamentais de uma questão antes de resolver os problemas propostos.

            <br /><br />

            <strong>2. Raciocinar Logiamente:</strong><br />
            Capacidade de estabelecer conexões entre ideias e identificar relações de causa e efeito para propor soluções 
            coerentes utilizando princípios lógicos e matemáticos. 
            Essencial em análises, planejamentos estratégico e resolução de problemas, 
            assim como, aplicar pensamento crítico e dedutivo.
       

            <br /><br />

            <strong>3. Recordar:</strong><br />
            Capacidade de aplicar conhecimento prévio, como conceitos teóricos, 
            fórmulas, leis ou definições, que foram aprendidas durante o curso. 
            Avaliar a base de conhecimento adquirida durante a formação acadêmica. 
            Essencial para disciplinas que dependes de memorização de conceitos 
            antes da prática. 

          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalInfoHabilidade;
