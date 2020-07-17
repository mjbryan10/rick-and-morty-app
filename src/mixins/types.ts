/**
 * Data properties for the Mixin VueWithFetchHelpers
 */
export interface ApiFetchData {
  loading: boolean;
  error: string;
  fetchResult: any | null; // TODO : Review this.
}
