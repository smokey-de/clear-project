import { StoreApi } from 'zustand';

import { GetFilteredKeys } from '@/shared/types/utility';

export type SetState<T extends object> = StoreApi<T>['setState'];
export async function handleApiRequest<
  Store extends object,
  Data = unknown,
  Error = unknown,
>({
  handler,
  onSuccess,
  loading,
  onFail,
}: {
  handler: () => Promise<Data>;
  onSuccess?: (data: Data extends void ? undefined : Data) => void;
  loading?: { set: SetState<Store>; key: GetFilteredKeys<Store, boolean> };
  onFail?: (error: Error) => void;
}) {
  setLoading(true);
  try {
    const data = await handler();
    onSuccess?.(data as Data extends void ? undefined : Data);
    return data;
  } catch (e) {
    if (onFail) {
      onFail(e as Error);
    }
    return;
  } finally {
    setLoading(false);
  }

  function setLoading(value: boolean) {
    if (loading) {
      const state = {
        [loading.key]: value,
      } as unknown as { [key in keyof Store]: Store[key] };
      loading.set(state);
    }
  }
}
