import './App.css';
import React, { useState, useEffect } from 'react';
import Modal from './components/modal/modal';
import ModalCadDisciplina from './components/modalCadDisciplina/modalCadDisciplina';
import ModalInfoTipoQuestao from './components/modalInfoTipoQuestao/modalInfoTipoQuestao';
import ModalInfoDificuldade from './components/modalInfoDificuldade/modalInfoDificuldade.js';
import ModalInfoHabilidade from './components/modalInfoHabilidade/modalInfoHabilidade.js';
import ModalInfoCompetencia from './components/modalInfoCompetencia/modalInfoCompetencia.js';
import { aiGeneration } from './utils/analise.js';
import Loading from './components/loading/loading';
import getPrompt from './utils/prompts';
import axios from 'axios';
import * as pdfjslib from 'pdfjs-dist/webpack';

function App() {


  const [loadingQuestion, setLoadingQuestion] = useState(false); 
  const [loadingAnswer, setLoadingAnswer] = useState(false); 

  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCadDisciplinaOpen, setIsModalCadDisciplinaOpen] = useState(false);
  const [isModalInfoTipoQuestaoOpen, setIsModalInfoTipoQuestaoOpen] = useState(false);
  const [isModalInfoDificuldadeOpen, setIsModalInfoDificuldadeOpen] = useState(false);
  const [isModalInfoHabilidadeOpen, setIsModalInfoHabilidadeOpen] = useState(false);
  const [isModalInfoCompetenciaOpen, setIsModalInfoCompetenciaOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(''); 
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [selectedHabilidade, setSelectedHabilidade] = useState('');
  const [selectedCompetencia, setSelectedCompetencia] = useState('');
  const [generatedQuestion, setGeneratedQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [verificationResult, setVerificationResult] = useState('');
  const [textoBase, setTextoBase] = useState('');
  const [disciplines, setDisciplines] = useState([]);
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');

  const openModalCadDisciplina = () => setIsModalCadDisciplinaOpen(true);
  const closeModalCadDisciplina = () => setIsModalCadDisciplinaOpen(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModalInfoTipoQuestao = () => setIsModalInfoTipoQuestaoOpen(true);
  const closeModalInfoTipoQuestao = () => setIsModalInfoTipoQuestaoOpen(false);
  const openModalInfoDificuldade = () => setIsModalInfoDificuldadeOpen(true);
  const closeModalInfoDificuldade = () => setIsModalInfoDificuldadeOpen(false);
  const openModalInfoHabilidade = () => setIsModalInfoHabilidadeOpen(true);
  const closeModalInfoHabilidade = () => setIsModalInfoHabilidadeOpen(false);
  const openModalInfoCompetencia = () => setIsModalInfoCompetenciaOpen(true);
  const closeModalInfoCompetencia = () => setIsModalInfoCompetenciaOpen(false);

  const tipoQuestoes = [
    'Discursiva',
    'Múltipla Escolha - Complementação Simples',
    'Múltipla Escolha - Interpretação',
    'Múltipla Escolha - Asserção-Razão',
    'Múltipla Escolha - Resposta Múltipla'
  ];

  const listaHabilidades = [
    'Interpretar',
    'Raciocinar Logicamente',
    'Recordar'
  ];

  const listaCompetencias = [
    'Adaptação',
    'Autorregulação',
    'Comunicação',
    'Liderança',
    'Pensamento Analítico',
    'Pensamento Científico',
    'Pensamento Criativo',
    'Pensamento Crítico',
    'Pensamento Digital',
    'Proatividade',
    'Resolução de Problemas',
    'Sociocultural',
    'Tomada de Decisão',
    'Ética'
  ];

  const saveDiscipline = async (newDiscipline) => {
    try {
      const response = await fetch('http://localhost:5000/api/disciplines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newDiscipline }),
      });

      if (response.ok) {
        const saveDiscipline = await response.json();
        fetchDisciplines();
      } else {
        console.error('Erro ao salvar disciplina:');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const executeQuery = async (tipo) => {
    const url = 'http://localhost:5000/api/execute-query';
    const payload = { tipo, difficulty: selectedDifficulty, discipline: selectedDiscipline }; // Incluindo dificuldade e disciplina no payload
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        let errorMessage = 'Erro ao executar consulta no backend.';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          console.error('Erro ao parsear resposta de erro:', e);
        }
        throw new Error(errorMessage);
      }
  
      const result = await response.json();
      console.log(result.message);
      return result.message; 
    } catch (error) {
      console.error('Erro ao executar consulta:', error);
      throw error;
    }
  };

  
  const fetchDisciplines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/disciplines'); 
      setDisciplines(response.data);
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
    }
  };

  useEffect(() => {
    fetchDisciplines();
  }, []); 
  
  const objectiveQuestions = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/objective-questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                difficulty: selectedDifficulty,
                discipline: selectedDiscipline,
            }),
        });

        if (!response.ok) {
            throw new Error("Erro ao obter questões objetivas");
        }

        return await response.json(); 
    } catch (error) {
        console.error("Erro ao obter questões objetivas:", error);
        return null; 
    }
};


const discursiveQuestions = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/discursive-questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                difficulty: selectedDifficulty,
                discipline: selectedDiscipline,
            }),
        });

        if (!response.ok) {
            throw new Error("Erro ao obter questões discursivas");
        }

        return await response.json(); 
    } catch (error) {
        console.error("Erro ao obter questões discursivas:", error);
        return null; 
    }
};

  const handleSubmit = async () => {
    let queryResult;
    const selectedData = {
      type: selectedType,
      difficulty: selectedDifficulty,
      discipline: selectedDiscipline,
      habilidade: selectedHabilidade,
      competencia: selectedCompetencia
    };
  
    if (!selectedType || !selectedDifficulty || !selectedDiscipline || !selectedHabilidade || !selectedCompetencia) {
      alert('Por favor, selecione a disciplina, tipo de questão, dificuldade, habilidade e competência da questão.');
      return;
    }

  
    setLoadingQuestion(true);
    try {

      const combinedText = `${textoBase}\n${fileContent}`.trim(); 

      if (selectedType === 'objetiva') {
        queryResult = await objectiveQuestions();
      } else {
        queryResult = await discursiveQuestions();
      }

      console.log(JSON.stringify(queryResult, null, 2)); 

      const formattedQuestions = queryResult.map(q => {
        return `Número da Questão: ${q.numero_questao}\nEnunciado: ${q.enunciado}\nAlternativas: ${q.alternativas}\nResposta Correta: ${q.resposta_correta}`;
      }).join('\n\n'); 

      console.log(formattedQuestions);     

      const prompt = getPrompt(selectedType, selectedDifficulty, selectedDiscipline, combinedText, selectedHabilidade, selectedCompetencia);
  
      console.log('Prompt gerado para Gemini:', prompt);
  
      
      const response = await aiGeneration(prompt, "");

      const [questao, resposta] = response.split(/Resposta:|Padrão de resposta esperado:/);

      setGeneratedQuestion(questao);
      setVerificationResult(resposta);
    } catch (error) {
      console.error('Erro ao gerar a questão:', error);
      setGeneratedQuestion('Erro ao gerar a questão. Tente novamente.');
    } finally {
      setLoadingQuestion(false);
    }
  };

  const handleAnswerSubmit = async () => {
    console.log('Resposta do usuário:', userAnswer);

    setLoadingAnswer(true);
    try {
      const verificationPrompt = `A resposta do usuário para a questão "${generatedQuestion}" é "${userAnswer}". Essa resposta está correta? Caso negativo, explique.`;
      console.log('Verificando resposta com prompt:', verificationPrompt);
      const feedback = await aiGeneration(verificationPrompt, "");
      console.log('Feedback da verificação:', feedback);
      setVerificationResult(feedback);
    } catch (error) {
      console.error('Erro ao verificar a resposta:', error);
      setVerificationResult('Erro ao verificar a resposta. Tente novamente.');
    } finally {
      setLoadingAnswer(false);
    }

    setUserAnswer(''); 
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const extensao = file.name.split('.').pop().toLowerCase();

      if (extensao === 'txt') {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFileContent(e.target.result);
          console.log('Conteúdo do arquivo TXT:', e.target.result);
        };
        reader.readAsText(file);
        } else if (extensao === 'pdf') {
          const reader = new FileReader();
          reader.onload = async (e) => {
          try {
            const pdfData = new Uint8Array(e.target.result);
            const pdf = await pdfjslib.getDocument({ data: pdfData}).promise;
            let texto = '';
            for (let i = 0; i < pdf.numPages; i++) {
              const pagina = await pdf.getPage(i + 1);
              const textoPagina = await pagina.getTextContent();
              textoPagina.items.forEach(item => {
                texto += item.str + ' ';
              });
            }
            setFileContent(texto);
            console.log('Conteúdo do arquivo PDF:', texto);
          } catch (error) {
            console.error('Erro ao processar arquivo PDF:', error);
            alert('Houve um problema ao ler o arquivo PDF. Por favor, tente um arquivo diferente.');
          }
        };
          reader.readAsArrayBuffer(file);
        } else {
          alert('Formato de arquivo inválido. Por favor, selecione um arquivo .txt ou .pdf.');
        }
    }
  };

  const handleClearFile = () => {
    setFileContent(null);
    setFileName(''); 
    document.getElementById('file-upload').value = ''; 
  };


  const formatGeneratedQuestion = (text) => {
    const lines = text.split('\n'); 
    const formattedElements = [];

    lines.forEach((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        
        const title = line.slice(2, -2); 
        formattedElements.push(
          <p key={index} style={{ textIndent: '0', fontWeight: 'bold' }}>
            {title}
          </p>
        ); 
      } else {
        
        formattedElements.push(
          <p key={index} className="indented-text">
            {line}
          </p>
        );
      }
    });

    return formattedElements;
  };

  const formatVerificationResult = (text) => {
    const lines = text.split('\n'); 
    const formattedElements = [];

    lines.forEach((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        
        const title = line.slice(2, -2); 
        formattedElements.push(
          <p key={index} style={{ textIndent: '0', fontWeight: 'bold' }}>
            {title}
          </p>
        ); 
      } else {
        
        formattedElements.push(
          <p key={index} className="indented-text">
            {line}
          </p>
        );
      }
    });

    return formattedElements;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="./logo-title.png" alt="Logo" className="App-logo" />
        <button onClick={openModal} className="config-button">
          Sobre
        </button>
      </header>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <ModalInfoTipoQuestao isOpen={isModalInfoTipoQuestaoOpen} onClose={closeModalInfoTipoQuestao} />
      <ModalInfoDificuldade isOpen={isModalInfoDificuldadeOpen} onClose={closeModalInfoDificuldade} />
      <ModalInfoHabilidade isOpen={isModalInfoHabilidadeOpen} onClose={closeModalInfoHabilidade} />
      <ModalInfoCompetencia isOpen={isModalInfoCompetenciaOpen} onClose={closeModalInfoCompetencia} />

   
      <div className="main-content">
        <h2>Selecione a configuração da questão a ser gerada:</h2>
      </div>

      <textarea 
        value={textoBase} 
        onChange={(e) => setTextoBase(e.target.value)} 
        placeholder="Se desejar cole um texto base aqui" 
        className="styled-textarea"
        rows="4" 
        cols="50"
      />

      <div className="file-upload-container">
        <label htmlFor="file-upload" className="file-upload-label">Subir arquivo</label>
        <input
          type="file"
          id="file-upload"
          accept=".txt,.pdf"
          onChange={handleFileUpload}
          className="file-upload-input"
          style={{ display: 'none' }}
        />
        {fileName && (
          <>
            <span className="file-name">{fileName}</span>
            <button onClick={handleClearFile} className="clear-file-button">
              Cancelar arquivo
            </button>
          </>
      )}
      </div>

      <div className="config-section">
        <div className="discipline-container">
          <label className="config-label">Disciplina:</label>
          <select
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
            className="styled-select"
          >
            <option value="">Selecione uma disciplina</option>
            {disciplines.map((discipline) => (
              <option key={discipline.int_cd_disciplina} value={discipline.chr_disciplina}>
                {discipline.chr_disciplina}
              </option>
            ))}  
          </select>
          <button onClick={openModalCadDisciplina} className="config-button">
            Cadastrar Disciplina
          </button>

          <ModalCadDisciplina 
            isOpen={isModalCadDisciplinaOpen} 
            onClose={closeModalCadDisciplina} 
            onSave={saveDiscipline}  
            onFechtDisciplines={fetchDisciplines}
          />
        </div>

        <div className="type-container">
          <label className="config-label">Tipo:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="styled-select"
          >
            <option value="">Selecione um tipo de questão</option>
            {tipoQuestoes.map((tipoQuestao) => (
              <option key={tipoQuestao} value={tipoQuestao}>
                {tipoQuestao}
              </option>
            ))}
          </select>
          <button onClick={openModalInfoTipoQuestao} className="info-button">
            ?
          </button>
        </div>

        <div className="difficulty-container">
          <label className="config-label">Dificuldade:</label>
          <button
            onClick={() => setSelectedDifficulty('facil')}
            disabled={selectedDifficulty === 'facil'}
            className="config-button"
          >
            Fácil
          </button>
          <button
            onClick={() => setSelectedDifficulty('medio')}
            disabled={selectedDifficulty === 'medio'}
            className="config-button"
          >
            Médio
          </button>
          <button
            onClick={() => setSelectedDifficulty('dificil')}
            disabled={selectedDifficulty === 'dificil'}
            className="config-button"
          >
            Difícil
          </button>
          <button onClick={openModalInfoDificuldade} className="info-button">
            ?
          </button>
        </div>
            
    
      <div className="habilidades-container">
          <label className="config-label">Habilidade:</label>
          <select
            value={selectedHabilidade}
            onChange={(e) => setSelectedHabilidade(e.target.value)}
            className="styled-select"
          >
            <option value="">Selecione uma habilidade</option>
            {listaHabilidades.map((listaHabilidades) => (
              <option key={listaHabilidades} value={listaHabilidades}>
                {listaHabilidades}
              </option>
            ))}
          </select>
          <button onClick={openModalInfoHabilidade} className="info-button">
            ?
          </button>
        </div>

        
        <div className="competencias-container">
          <label className="config-label">Competência:</label>
          <select
            value={selectedCompetencia}
            onChange={(e) => setSelectedCompetencia(e.target.value)}
            className="styled-select"
          >
            <option value="">Selecione uma competência</option>
            {listaCompetencias.map((listaCompetencias) => (
              <option key={listaCompetencias} value={listaCompetencias}>
                {listaCompetencias}
              </option>
            ))}
          </select>
          <button onClick={openModalInfoCompetencia} className="info-button">
            ?
          </button>
        </div>
        </div>

      <button
        onClick={handleSubmit}
        className="action-button"
        disabled={loadingQuestion || loadingAnswer}
      >
        Gerar Questão
      </button>
      <div
        className="generated-question-box justified-text"
      >

        {loadingQuestion ? (
          <Loading /> 
        ) : generatedQuestion ? (
          formatGeneratedQuestion(generatedQuestion)
        ) : (
          'A questão gerada aparecerá aqui.'
        )}
      </div>

      <div className={`verification-result-box justified-text`}>
        {loadingAnswer ? (
          <Loading /> 
        ) :  (
          <div> 
            {verificationResult ? (
              formatVerificationResult(verificationResult)
            ) : (
              'A correção da questão aparecerá aqui.'
            )}
      </div>
      )}
      </div>

    </div>
  );
};

export default App;


