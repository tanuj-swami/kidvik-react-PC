export const getuserid = () => {
  return (
    localStorage.getItem("userId") ||
    localStorage.getItem("user_id")
  );
};
