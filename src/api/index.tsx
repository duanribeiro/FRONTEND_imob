import { PlacesState, House, DistrictResponse } from "@/types";

// ENDPOINT PARA BUSCAR CASAS
export const fetchHouses = async (
  places: PlacesState,
  filters: any,
  districts: any
): Promise<House[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/maps/get_houses`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        places: places,
        filters: filters,
        districts: districts.actives,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: House[] = await response.json();
  return data;
};

// ENDPOINT PARA BUSCAR LUGARES
export const fetchDistricts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/maps/get_district`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // places: places,
        // districts: districts.actives,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: DistrictResponse = await response.json();
  return data;
};

// ENDPOINT PARA ENVIAR UM BUG
export const postBug = async (description: string) => {
  if (!description || typeof description !== "string") {
    throw new Error("Invalid description");
  }

  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_API}/maps/post_bug`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    });

    if (!response.ok) {
      console.error("API error response:", await response.text());
      throw new Error(`Failed to post bug: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting bug:", error);
    throw error;
  }
};