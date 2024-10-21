import axios from "../../axios";

const addTrx = async (trxObj) => {
  try {
    await axios.post("/trx", trxObj);
  } catch (error) {
    console.log("error trx: ", error);
  }
};

const getAllTrxList = async () => {
  if (localStorage.getItem("user")) {
    const userInfo = JSON.parse(localStorage.getItem("user")).email;
    try {
      const apiResponse = await axios.get(`/trx/${userInfo}`);
      localStorage.setItem("trx", JSON.stringify(apiResponse.data.data));
      return apiResponse.data.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
};

const updateTrx = async (trxObj) => {
  try {
    const existingTrxes = JSON.parse(localStorage.getItem("trx"));
    await axios.put("/trx", trxObj);
    const trxes = existingTrxes.map((trx) => {
      if (trx.id == trxObj.id) {
        return {
          ...trx,
          ...trxObj,
        };
      } else {
        return trx;
      }
    });
    localStorage.setItem("trx", JSON.stringify(trxes));
  } catch (error) {
    console.log(error);
  }
};

const deleteTrx = async (trxObj) => {
  try {
    const existingTrxes = JSON.parse(localStorage.getItem("trx"));
    console.log(trxObj);
    const deletedTrx = await axios.delete("/trx", {
      data: trxObj,
    });
    const trxes = existingTrxes.filter((trx) => trx.id != deletedTrx.id);
    localStorage.setItem("trx", JSON.stringify(trxes));
  } catch (error) {
    console.log(error);
  }
};

const getAllWopList = async () => {
  try {
    const apiResponse = await axios.get("/payment");
    localStorage.setItem("wop", JSON.stringify(apiResponse.data.data));
    return apiResponse.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default {
  addTrx,
  getAllTrxList,
  getAllWopList,
  updateTrx,
  deleteTrx,
};
