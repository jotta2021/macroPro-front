interface ErrorResponse {
  message?: string;
}

interface AxiosLikeError {
  response?: {
    data?: ErrorResponse;
  };
  message?: string;
}

export function getErrorMessage(error: AxiosLikeError | unknown): string {
  if (error && typeof error === "object") {
    const axiosError = error as AxiosLikeError;
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
    if (error instanceof Error) {
      return error.message || "Ocorreu um erro";
    }
    return axiosError.message || "Ocorreu um erro";
  }
  return "Ocorreu um erro";
}
