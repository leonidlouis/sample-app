const DEFAULT_TIMEOUT = 50000; // 50 seconds
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

class FetchError extends Error {
  constructor(message) {
    super(message);
    this.response = undefined;
    this.data = undefined;
    this.status = undefined;
  }
}

/**
 * Makes a fetch request and handles responses and errors.
 * @param {string} url - The request URL.
 * @param {Object} [options={}] - Optional configuration for the fetch request.
 * @returns {Promise<Object>} A promise resolving to the response data and status.
 */
export const fetchClientHandler = async (url, options = {}) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  const headers = { ...DEFAULT_HEADERS, ...options.headers };
  const requestURL = url.startsWith("/")
    ? `${window.location.origin}/api${url}`
    : url;

  try {
    const response = await fetch(requestURL, {
      ...options,
      headers,
      signal: controller.signal,
    });

    const responseData = await response.json();
    if (!response.ok) {
      const error = new FetchError(
        `Error: ${response.statusText}. Data: ${JSON.stringify(responseData)}`
      );
      error.response = response;
      error.data = responseData;
      error.status = response.status;
      throw error;
    }

    return { data: responseData, status: response.status };
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        "Request timed out after " + DEFAULT_TIMEOUT / 1000 + " seconds"
      );
    }
    throw error;
  } finally {
    clearTimeout(id);
  }
};

/**
 * Wrapper around fetchClientHandler that uses a base API URL.
 * @param {string} url - The request URL.
 * @param {Object} [options={}] - Optional configuration for the fetch request.
 * @returns {Promise<Object>} A promise resolving to the response data and status.
 */
export const fetchServiceHandler = (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL || ""; // Default to an empty string if undefined
  return fetchClientHandler(`${baseURL}${url}`, options);
};
