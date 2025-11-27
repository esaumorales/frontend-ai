import api from "./api";

export const sendPredict = async (payload: any) => {
  const res = await api.post("/predict/", payload);
  return res.data;
};
