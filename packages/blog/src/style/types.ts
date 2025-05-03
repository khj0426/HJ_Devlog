import { ComponentPropsWithoutRef, ElementType } from 'react';

//특정 HTML의 다른 속성을 확장하고자 할때

export type OverrideComponentWithoutRef<T extends ElementType, P> = P &
  ComponentPropsWithoutRef<T> & {
    as?: T;
  };
