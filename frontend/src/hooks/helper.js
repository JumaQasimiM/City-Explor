export const useRole = () => {
  const { user } = useAuth();
  const role = user?.user?.role;

  return {
    isAdmin: role === "admin",
    isViewer: role === "viewer",
    isBusiness: role === "business",
  };
};
