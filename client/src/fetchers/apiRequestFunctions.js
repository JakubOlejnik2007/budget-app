import urls from "../utils/urls";
import config from "../utils/config";
import createApiRequest from "./apiRequest";

export const loginRequest = async (email, password) =>
    await createApiRequest("POST", `${config.backend}${urls.backend.auth.login}`, { email, password });

export const registerRequest = async ({email, password, firstName, lastName}) =>
    await createApiRequest("POST", `${config.backend}${urls.backend.auth.register}`, {
        email,
        password,
        firstName,
        lastName,
    });
