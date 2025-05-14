import { useContext, useState } from 'react';
import { AuthContext } from 'context/AuthContext';
import { useConfirm } from 'context/ConfirmModalContext';
import apiClient from 'services/ApiClient';
import CenteredContainer from 'components/ui/CenteredContainer';
import { UserInfo, UserForm, DeleteAccount } from 'features/user/components';
import Toast from 'utils/ToastHelper';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [section, setSection] = useState(null);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
  });
  const { showConfirm } = useConfirm();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await apiClient.put('/accounts/api/me/', formData);

      const isSame =
        user.username === formData.username &&
        user.email === formData.email &&
        user.first_name === formData.first_name &&
        user.last_name === formData.last_name;

      if (isSame) {
        Toast.info("Aucune modification détectée.");
      } else {
        setUser(res.data); // Utilisation correcte de setUser
        Toast.success("Informations mises à jour avec succès !");
      }
    } catch (err) {
      Toast.error("Erreur lors de la mise à jour.");
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete('/accounts/api/me/');
      Toast.success("Compte supprimé avec succès.");
      window.location.href = '/login';
    } catch (err) {
      console.error('Erreur suppression', err);
      Toast.critical("Erreur lors de la suppression du compte.");
    }
  };

  return (
    <CenteredContainer fullHeight={false}>
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center mb-4">Paramètres du compte</h2>

        {section === null ? (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setSection('read')}
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded hover:bg-gray-200"
            >
              👁️ Consulter mes informations
            </button>
            <button
              onClick={() => setSection('edit')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              ✏️ Modifier mes informations
            </button>
            <button
              onClick={() => setSection('delete')}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              🗑️ Supprimer mon compte
            </button>
          </div>
        ) : (
          <div className="mb-4">
            <button
              onClick={() => setSection(null)}
              className="text-sm text-blue-600 hover:underline"
            >
              ← Retour aux options du compte
            </button>
          </div>
        )}

        {section === 'read' && <UserInfo user={user} />}
        {section === 'edit' && (
          <UserForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleUpdate}
          />
        )}
        {section === 'delete' && (
          <DeleteAccount
            onDelete={() =>
              showConfirm({
                title: 'Supprimer le compte',
                message: 'Cette action est irréversible. Es-tu sûr ?',
                onConfirm: handleDelete,
              })
            }
          />
        )}
      </div>
    </CenteredContainer>
  );
};

export default Profile;
