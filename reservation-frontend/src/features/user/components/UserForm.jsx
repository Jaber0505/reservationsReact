const UserForm = ({ formData, onChange, onSubmit, success, error }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <input
      type="text"
      name="first_name"
      value={formData.first_name}
      onChange={onChange}
      placeholder="Prénom"
      className="w-full border px-4 py-2 rounded-md"
    />
    <input
      type="text"
      name="last_name"
      value={formData.last_name}
      onChange={onChange}
      placeholder="Nom"
      className="w-full border px-4 py-2 rounded-md"
    />
    <input
      type="text"
      name="username"
      value={formData.username}
      onChange={onChange}
      placeholder="Nom d'utilisateur"
      className="w-full border px-4 py-2 rounded-md"
      required
    />
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={onChange}
      placeholder="Adresse email"
      className="w-full border px-4 py-2 rounded-md"
      required
    />
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
    >
      Sauvegarder
    </button>
    {success && <p className="text-green-600 text-sm">{success}</p>}
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </form>
);

export default UserForm;
