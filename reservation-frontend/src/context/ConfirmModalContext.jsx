import { createContext, useState, useContext } from 'react';
import ConfirmModal from 'components/ui/ConfirmModal'; // ou '../components/ui/ConfirmModal' si tu n'as pas d'import absolu

const ConfirmModalContext = createContext(null);

export const ConfirmModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
  });

  const showConfirm = ({ title, message, onConfirm }) => {
    setModalData({
      isOpen: true,
      title,
      message,
      onConfirm,
    });
  };

  const closeModal = () => {
    setModalData((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <ConfirmModalContext.Provider value={{ showConfirm }}>
      {children}
      <ConfirmModal
        isOpen={modalData.isOpen}
        title={modalData.title}
        message={modalData.message}
        onCancel={closeModal}
        onConfirm={() => {
          modalData.onConfirm?.(); // exécute l'action
          closeModal();            // puis ferme le modal
        }}
      />
    </ConfirmModalContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmModalContext);
  if (!context) {
    throw new Error('useConfirm doit être utilisé dans un <ConfirmModalProvider>');
  }
  return context;
};
