import axios from "axios";

const createApiRequest = async (method, url, data = {}, authToken = "") => {
    const config = {
        method,
        url,
        headers: {
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
        data,
    };
    const response = await axios(config);
    return response;
};

export default createApiRequest;
