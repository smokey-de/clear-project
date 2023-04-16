import { create, StoreApi } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

export type SetState<T extends object> = StoreApi<T>['setState'];
export type GetState<T extends object> = StoreApi<T>['getState'];

type StoreActionsParams<Store extends object> = {
  set: SetState<Store>;
  get: GetState<Store>;
  reset: () => void;
};

export abstract class StoreActions<Store extends object> {
  get: GetState<Store>;
  set: SetState<Store>;
  reset: () => void;

  constructor({ set, get, reset }: StoreActionsParams<Store>) {
    this.set = set;
    this.get = get;
    this.reset = reset;

    // Bind all methods to this
    const prototype = Object.getPrototypeOf(this);
    const methodsKeys = Object.getOwnPropertyNames(prototype);
    methodsKeys.forEach((methodKey: any) => {
      if (methodKey === 'constructor') return;
      //@ts-ignore
      this[methodKey] = this[methodKey].bind(this);
    });
  }
}

export const createStore = <Store extends object, ActionsClass extends StoreActions<Store>>({
  initialState,
  actionsClass,
}: {
  initialState: Store;
  actionsClass: {
    new ({ set, get, reset }: StoreActionsParams<Store>): ActionsClass;
  };
}) => {
  type StoreWithActions = Store & ActionsClass & { actions: ActionsClass };

  const useStore = create<StoreWithActions>()(
    subscribeWithSelector((set, get) => {
      const reset = () => set(initialState);
      const actions = new actionsClass({ set, get, reset });
      const store = { ...initialState, ...actions };
      const storeWithActions = { ...store, actions };
      return storeWithActions;
    }),
  );

  function useStoreWithKeys<Keys extends keyof StoreWithActions>(
    selector: Keys[],
    equalityFn?: (a: Pick<StoreWithActions, Keys>, b: Pick<StoreWithActions, Keys>) => boolean,
  ): Pick<StoreWithActions, Keys>;

  function useStoreWithKeys<U>(
    selector: (state: StoreWithActions) => U,
    equalityFn?: (a: U, b: U) => boolean,
  ): U;

  function useStoreWithKeys(): StoreWithActions;

  function useStoreWithKeys<Keys extends keyof StoreWithActions, U>(
    selector?: Keys[] | ((state: StoreWithActions) => U),
    equalityFn?: (
      a: U | Pick<StoreWithActions, Keys>,
      b: U | Pick<StoreWithActions, Keys>,
    ) => boolean,
  ) {
    if (Array.isArray(selector)) {
      const store = useStore((state) => {
        return selector.reduce(
          (acc, key) => ({ ...acc, ...{ [key]: state[key] } }),
          {} as Pick<StoreWithActions, Keys>,
        );
      }, equalityFn ?? shallow);
      return store;
    } else if (selector !== undefined) {
      const store = useStore(selector, equalityFn ?? shallow);
      return store;
    } else {
      return useStore();
    }
  }

  const api = {
    ...useStore,
    actions: useStore.getState().actions,
  };
  const useBoundStore = Object.assign(useStoreWithKeys, api);

  return useBoundStore;
};
