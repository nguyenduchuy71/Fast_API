export const configHeaders = (accessToken: string) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
};

export const handleErrorStatus = (error: any) => {
  if (error.response.status === 401) {
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("userInfo");
    window.location.href = "/login";
  }
};
