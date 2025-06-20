/**
 * API service for fetching data from the backend
 */

export const fetchToken = async (googleId: string) => {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_API_URL) {
      throw new Error("API_URL is not defined in environment variables");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          googleId: googleId,
        }),
      },
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

export const fetchBatteryData = async (systemId: string, token: string) => {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_API_URL) {
      throw new Error("API_URL is not defined in environment variables");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/data?systemId=${systemId}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
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

export const createUser = async (
  userId: string,
  userEmail: string | null | undefined,
  token: string,
) => {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_API_URL) {
      throw new Error("API_URL is not defined in environment variables");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: userEmail,
          userId: userId,
          sensors: [],
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const getUser = async (userId: string, token: string) => {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_API_URL) {
      throw new Error("API_URL is not defined in environment variables");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user?userId=${userId}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const updateUser = async (
  userId: string,
  sensors: string[],
  token: string,
) => {
  try {
    if (!process.env.NEXT_PUBLIC_BACKEND_API_URL) {
      throw new Error("API_URL is not defined in environment variables");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sensors: sensors, userId: userId }),
      },
    );
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
  }
};
