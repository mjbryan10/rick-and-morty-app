import { RnmApiResponse } from '@/types/Interfaces';

/**
 * Data properties for the Mixin VueWithFetchHelpers
 */
export interface apiFetchData {
  loading: boolean;
  error: string;
  fetchResult: any | null; // TODO : Review this.
}