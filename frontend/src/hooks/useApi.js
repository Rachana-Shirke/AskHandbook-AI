import { useMemo } from 'react';

export function useApi(apiFn) {
  return useMemo(() => apiFn, [apiFn]);
}
