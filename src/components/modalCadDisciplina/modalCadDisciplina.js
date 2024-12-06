import React, { useEffect, useState } from 'react';
import './modalCadDisciplina.css'; // Certifique-se de importar o CSS

const ModalCadDisciplina = ({ isOpen, onClose, onSave }) => {
  const [newDiscipline, setNewDiscipline] = useState(''); // Estado para armazenar o valor do input
  const [isSaving, setIsSaving] = useState(false); // Estado para controlar o salvamento

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

  const handleSave = async () => {
    if (newDiscipline.trim() !== '') {
      setIsSaving(true); // Ativa o estado de salvamento
      await onSave(newDiscipline); // Chama a função onSave passando o valor do input
      setNewDiscipline(''); // Limpa o input
      setIsSaving(false); // Desativa o estado de salvamento
      onClose(); // Fecha o modal
    }
  };

  if (!isOpen) return null; // Se o modal não estiver aberto, não renderiza nada

  return (
    <div className="modal-backdrop">
          <div className="modal-cad">
            <div className='modal-header-cad'>
              <h3>Cadastrar Nova Disciplina</h3>
            </div>
            <div className='modal-content-cad'>
              <input
                type="text"
                value={newDiscipline}
                onChange={(e) => setNewDiscipline(e.target.value)}
                placeholder="Nome da nova disciplina"
                className="styled-input"
              />
              <div className="modal-actions">
                <button onClick={handleSave}>Salvar</button>
                <button onClick={onClose}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
  );
};

export default ModalCadDisciplina;
