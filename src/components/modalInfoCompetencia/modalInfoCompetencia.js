import React, { useEffect } from 'react';
import './modalInfoCompetencia.css'; // Certifique-se de importar o CSS

const ModalInfoCompetencia = ({ isOpen, onClose }) => {
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
      <div className="modal-competencia" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Competências de uma questãos:</h2>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="modal-content">
        <p className="modal-text">
        Competências complementam as habilidades e ajudam a avaliar as capacidades de 
        interação e resolução de problemas em cenários reais, nas tomadas de decisões, 
        trabalho em equipe, dentre outros. AS competências utilizam de aspectos cognitivos, 
        sociais, éticos e práticos para orientar as elaborações de questões, e podem ser 
        divididas em 14 tipos:

            <br /><br />

            <strong>1. Adaptação</strong><br />
            Refere-se à capacidade de ajustar-se a diferentes contextos, com flexibilidade 
            e resiliência, sendo essencial para enfrentar mudanças constantes e 
            desafios no ambiente acadêmico ou profissional.

            <br /><br />

            <strong>2. Autorregulação</strong><br />
            Habilidade de gerenciar o próprio aprendizado, emoções e comportamento, 
            garantindo autonomia e eficiência no desenvolvimento de atividades e resolução 
            de problemas.

            <br /><br />

            <strong>3. Comunicação</strong><br />
            Aptidão para transmitir informações de maneira clara e precisa, seja oralmente 
            ou por escrito, indispensável para colaboração, apresentação de ideias e 
            entendimento de perspectivas.

            <br /><br />

            <strong>4. Liderança</strong><br />
            Capacidade de inspirar, motivar e coordenar pessoas, promovendo o alcance de
             metas coletivas e fortalecendo o trabalho em equipe.

            <br /><br />

            <strong>5. Pensamento Analítico</strong><br />
            Envolve dividir problemas complexos em partes menores, promovendo soluções 
            práticas, o que é essencial em áreas que demandam atenção aos detalhes.

            <br /><br />

            <strong>6. Pensamento Científico</strong><br />
            Habilidade de aplicar o método científico, formular hipóteses e interpretar 
            resultados logicamente, sendo crucial para pesquisa e inovação.

            <br /><br />

            <strong>7. Pensamento Criativo</strong><br />
            Competência para gerar ideias inovadoras e propor melhorias, especialmente 
            relevante em ambientes que valorizam a inovação e o empreendedorismo.

            <br /><br />

            <strong>8. Pensamento Crítico</strong><br />
            Capacidade de analisar argumentos, identificar falácias e tomar decisões 
            baseadas em evidências sólidas, fundamental para lidar com informações 
            contraditórias.

            <br /><br />

            <strong>9. Pensamento Digital</strong><br />
            Refere-se ao domínio de ferramentas e tecnologias digitais para resolver 
            problemas e criar soluções, indispensável no contexto atual de transformação 
            digital.

            <br /><br />

            <strong>10. Proatividade</strong><br />
            Habilidade de agir antecipadamente para resolver problemas ou aproveitar 
            oportunidades, essencial em ambientes que valorizam a iniciativa e a autonomia.

            <br /><br />

            <strong>11. Resolução de Problemas</strong><br />
            Capacidade de identificar, analisar e solucionar problemas de forma lógica e 
            criativa, indispensável para tomadas de decisão eficazes.

            <br /><br />

            <strong>12. Sociocultural</strong><br />
            Envolve a habilidade de interagir com pessoas de diferentes origens culturais e 
            sociais, promovendo respeito, inclusão e colaboração em contextos globais e 
            multiculturais.

            <br /><br />

            <strong>13. Tomada de Decisão</strong><br />
            Competência para escolher a melhor solução entre diversas opções com base em 
            evidências e valores, essencial em escolhas estratégicas e responsáveis.

            <br /><br />

            <strong>14. Ética</strong><br />
            Refere-se à habilidade de agir com responsabilidade e integridade, guiando-se 
            por princípios éticos e morais, indispensável para decisões conscientes e 
            socialmente responsáveis.

                   

          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalInfoCompetencia;
