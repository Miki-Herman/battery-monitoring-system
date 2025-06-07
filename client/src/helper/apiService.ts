/**
 * API service for fetching data from the backend
 */

/**
 * Fetches battery data from the API
 * @param systemId - The ID of the system to fetch data for
 * @returns Promise with the fetched data
 */
export const fetchBatteryData = async (systemId: string) => {
  try {
    if (!process.env.BACKEND_API_URL) {
      throw new Error("API_URL is not defined in environment variables");
    }

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/data?system_id=${systemId}`,
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching battery data:", error);
    throw error;
  }
};
