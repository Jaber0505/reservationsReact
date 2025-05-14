const DeleteAccount = ({ onDelete }) => (
  <div className="space-y-4">
    <p className="text-red-700">Cette action est irréversible. Votre compte sera supprimé définitivement.</p>
    <button
      onClick={onDelete}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Supprimer mon compte
    </button>
  </div>
);

export default DeleteAccount;
