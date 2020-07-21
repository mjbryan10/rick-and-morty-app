/**
 * Data properties for the Mixin VueWithFetchHelpers
 */
export interface FetchHelperState {
  /** Boolean field to indicate if the fetch function is in process */
  loading: boolean;
  /** String field to capture error information, should fetch fail */
  error: string;
  /** The result of the fetch function, i.e. data from the API call. */
  fetchResult: any | null;
}
