import { deleteRole } from "../api/nhgApi";

export const useRoles = () => {
  const deleteWardHandler = async (roleId) => {
    try {
      const response = await deleteRole(roleId);
      const { success, message } = response.data;
      if (success) {
        // await fetchWards();
      } else {
        throw { response: { data: { message } } };
      }
    } catch (error) {
      console.error("Error deleting ward:", error);
    }
  };

  return {
    deleteWardHandler,
  };
};
