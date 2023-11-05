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

export const getUserBudgetsList = async (id, AuthToken) => 
    await createApiRequest("GET", `${config.backend}${urls.backend.budget}?memberid=${id}`, {}, AuthToken)

export const getEntryWeekly = async (budgetid, startDate, endDate, AuthToken) =>
    await createApiRequest("GET", `${config.backend}${urls.backend.entriesWeekly}?budgetId=${budgetid}&startDate=${startDate}&endDate=${endDate}`, {}, AuthToken)