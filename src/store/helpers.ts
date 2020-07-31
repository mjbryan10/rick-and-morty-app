import { Character, CharactersAPIResponse, ApiQuery } from '@/types/Interfaces';

/**
 * Async function that returns the API result as a promise.
 * Returns type RnmApiResponse = CharactersAPIResponse | Episode | Location | Character;
 * @param url string value of the url from which you wish to fetch API data from.
 */
export async function fetchDataByUrl<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}
/**
 * Async function that returns the API result as a promise.
 * Returns an object containing Character properties and values.
 * @param id String or number value to retrieve character by id.
 */
export async function fetchCharacterById(
  id: number | string,
): Promise<Character> {
  const uri = `https://rickandmortyapi.com/api/character/${id}`;
  const response = await fetch(uri);
  return response.json();
}
/**
 * Fetches a page of characters or the first page if no page number given.
 * @param pageNum Optional number parameter, that when given will define which page
 * to fetch.
 */
export async function fetchCharactersByPage(
  pageNum?: number,
): Promise<CharactersAPIResponse> {
  let url = 'https://rickandmortyapi.com/api/character/';
  if (pageNum) url += `?page=${pageNum}`;
  const response = await fetch(url);
  return response.json();
}
/**
 * Iterates through each query in the page route and generates the url to be used by loadData.
 *
 * If there are no queries, uses the default url for all characters.
 */
function generateUrlByParam(query: ApiQuery) {
  let url = 'https://rickandmortyapi.com/api/character';
  if (Object.keys(query).length) url += '/?';
  Object.keys(query).forEach((key, index) => {
    if (index > 0) {
      url += '&';
    }
    url += `${key}=${query[key]}`;
  });
  return url;
}
/**
 * Fetches multiple characters from the Rick and Morty API using the defined query
 * @param query Object containing parameter queries
 */
export async function fetchCharactersByQuery(query: ApiQuery): Promise<CharactersAPIResponse> {
  const url = generateUrlByParam(query);
  return fetchDataByUrl<CharactersAPIResponse>(url);
}
