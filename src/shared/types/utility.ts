import React from "react";

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type GetFilteredKeys<T, Type> = {
  [K in keyof T]: T[K] extends Type ? K : never;
}[keyof T];

export type WithFilteredKeys<T, Type> = Omit<T, Exclude<keyof T, GetFilteredKeys<T, Type>>>;

export type ChildrenProp = {
  children?: React.ReactNode;
};

export interface ResponseData<T = unknown> {
  data: T;
  message: string;
  status: number;
}
