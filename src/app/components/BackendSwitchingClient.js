import axios from "axios";

/**
 * BackendSwitchingClient
 * Handles requests with automatic backend switching and timeout management.
 *
 * @param {Object} options - Configuration options for the request.
 * @param {string} options.endpoint - API endpoint to call.
 * @param {string} [options.method="GET"] - HTTP method (e.g., GET, POST, PUT, DELETE).
 * @param {Object} [options.data=null] - Data to send with the request (for POST/PUT).
 * @param {Object} [options.headers={}] - Additional headers for the request.
 * @param {number} [options.timeout=10000] - Timeout in milliseconds for the request.
 * @returns {Promise<any>} - The response data from the successful backend.
 * @throws Will throw an error if all backends fail.
 */
const BackendSwitchingClient = async ({
  endpoint,
  method = "GET",
  data = null,
  headers = {},
  timeout = 10000,
}) => {
  const backends = [
    "https://dfootprint-backend.onrender.com",
    "https://dfootprint-backend-orp5.onrender.com",
  ];

  for (const backend of backends) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);

      const response = await axios({
        url: `${backend}${endpoint}`,
        method,
        data,
        headers,
        signal: controller.signal, // Attach the AbortController signal
      });

      clearTimeout(timer);
      return response; // Return the response if successful
    } catch (error) {
      console.error(`Failed with ${backend}: ${error.message}`);

      // Check if it's a timeout or abort error
      if (error.code === "ERR_CANCELED") {
        console.error("Request timed out.");
      }

      // If this was the last backend, throw the error
      if (backend === backends[backends.length - 1]) {
        throw error;
      }
    }
  }

  throw new Error("All backends failed."); // If all backends fail
};

export default BackendSwitchingClient;
