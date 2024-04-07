export const configHeaders = (
  accessToken: string,
  contentType: string = "application/json"
) => {
  return {
    "Content-Type": contentType,
    Authorization: `Bearer ${accessToken}`,
  };
};

export const handleErrorStatus = (error: any) => {
  if (error.response && error.response.status === 401) {
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("userInfo");
    window.location.href = "/login";
  }
};
