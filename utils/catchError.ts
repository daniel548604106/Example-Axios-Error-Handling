import axios, { AxiosError } from "axios";

const catchError = (error: AxiosError) => {
  console.error(error);

  let errorMsg;
  let errorCode;
  if (axios.isAxiosError(error) && error.response) {
    // If the request was made and the server does not respond with a status code in the range of 2xx
    const { status } = error.response.data;
    const { code, message } = status;
    errorMsg = message;
    errorCode = code;

    switch (code) {
      /**
       * ERR04005 : 沒有這個使用者或email
       *
       * ERR04011 : 已驗證過或驗證碼過期
       *
       * ERR04012 : 驗證碼錯誤
       *
       * ERR04016 : 伺服器異常
       *
       * ERR04020 : 手機格式號碼錯誤
       *
       * ERR04021 : 重發驗證碼達到三次，請2小時後再嘗試
       *
       *
       */
      case "ERR04005":
        errorMsg = "Incorrect verification code. Please try again";
        break;
      case "ERR04011":
        errorMsg = "Verification code has expired. Please try again";
        break;

      case "ERR04012":
        errorMsg = "Incorrect verification code. Please try again";
        break;
      case "ERR04016":
        errorMsg = "Server Error";
        break;
      case "ERR04020":
        errorMsg = "Please enter a valid mobile number";
        break;
      case "ERR04021":
        errorMsg =
          "You've exceeded the max attempts of OTP request. Please try again later";
        break;
      default:
        errorMsg = "error occurred";
    }
  } else if (error.request) {
    // If the request was made and no response was received from server
    errorMsg = error.request;
  } else {
    // If sth else happened while making the request
    errorMsg = error.message;
  }
  return { errorCode, errorMsg };
};

export default catchError;
