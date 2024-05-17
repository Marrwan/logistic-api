// Utility functions for sending responses

export const sendResponse = (response: any, status: number, data: object = {}) => {
    return response.status(status).send({ ...data });
  };
  
  export const withMessage = (response: any, message: string, status: number = 200) => {
    return sendResponse(response, status, { message });
  };
  
  export const withData = (response: any, data: object = {}, status: number = 200) => {
    return sendResponse(response, status, { data });
  };
  