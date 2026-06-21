import SibApiV3Sdk from "sib-api-v3-sdk";
import { BREVO_API_KEY } from "../config/config.js";


// config brevo client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export default apiInstance;