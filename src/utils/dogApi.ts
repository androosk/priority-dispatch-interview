const BASE_URL = "https://dog.ceo/api";

export interface DogBreeds {
  [breed: string]: string[];
}

export interface ApiResponse {
  message: DogBreeds | string[];
  status: string;
}

export async function getDogList(): Promise<ApiResponse> {
  const url = `${BASE_URL}/breeds/list/all`;

  try {
    const response = await fetch(url);
    const data: ApiResponse = await response.json();

    return data;
  } catch (error) {
    console.error("There was a problem fetching the dog breeds:", error);
    throw new Error("Failed to fetch list of breeds. Please try again.");
  }
}

export async function getDogImagesByBreed(breed: string): Promise<ApiResponse> {
  const url = `${BASE_URL}/breed/${breed}/images`;

  try {
    const response = await fetch(url);
    const data: ApiResponse = await response.json();

    return data;
  } catch (error) {
    console.error(`There was a problem fetching images for ${breed}:`, error);
    throw new Error(`Failed to fetch images for ${breed}. Please try again.`);
  }
}
