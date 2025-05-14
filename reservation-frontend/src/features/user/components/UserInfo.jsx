const UserInfo = ({ user }) => {
  if (!user) return null;

  return (
    <div className="space-y-2 text-sm">
      <p><strong>Prénom :</strong> {user.first_name || 'Non renseigné'}</p>
      <p><strong>Nom :</strong> {user.last_name || 'Non renseigné'}</p>
      <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
      <p><strong>Email :</strong> {user.email}</p>
    </div>
  );
};

export default UserInfo;
