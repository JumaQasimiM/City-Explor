export const authHeader = (user) => {
  if (!user?.access) {
    throw new Error("Not authenticated");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.access}`,
  };
};
