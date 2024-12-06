import React, { useEffect } from 'react';
import './modal.css'; // Certifique-se de importar o CSS

const Modal = ({ isOpen, onClose }) => {
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
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Sobre</h2>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="modal-content">
  <p className="modal-text">
    Esse software é um trabalho de conclusão de curso feito pelo aluno <strong>Leandro Cunha Magalhães</strong>, Bacharelando do curso de Sistemas de Informação na UniAcademia.<br/><br/>
    O objetivo do software é auxiliar os professores dos cursos de tecnologia a formularem questão no modelo ENADE (Exame Nacional de Desempenho dos Estudantes).<br/><br/>
    O projeto utiliza processos ETL em Python para analisar a prova e armazenar em um banco de dados e utilizar IA para gerar questões seguindo os modelos das provas anteriores.<br/><br/>
    <strong>Aluno Orientado:</strong> Leandro Cunha Magalhães<br/>
    <strong>Professor Orientador:</strong> Tassio Siqueira<br/>
    <strong>Coordenador do Curso:</strong> Marco Araújo
  </p>
</div>
      </div>
    </div>
  );
};

export default Modal;
