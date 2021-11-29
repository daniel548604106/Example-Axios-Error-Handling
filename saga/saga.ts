import { AxiosError } from "axios";
import catchError from "../utils/catchError";

function* handleVerifyPhoneNumber(action: PayloadAction<PhoneNumberData>) {
  const phone = action.payload;
  setLoading(true);
  try {
    yield call(postPhoneFormatAPI, phone);
    yield call(postCreateSMSCodeAPI, phone);
    yield put(setPhoneFormatVerificationStatus("success"));
  } catch (error) {
    const { errorCode, errorMsg } = catchError(error as AxiosError);
    if (errorCode === "ERR04020") {
      yield put(setPhoneFormatVerificationStatus("error"));
    }
    if (errorCode === "ERR04021") {
      yield put(setOTPCreationError({ errorCode, errorMsg }));
    }
  } finally {
    setLoading(false);
  }
}
