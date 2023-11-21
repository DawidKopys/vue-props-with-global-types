declare global {
  // @ts-ignore
  export type { GlobalExternalType1 } from './GlobalExternalType1'
}


declare global {
  interface GlobalExternalType2 {
    bar: string
  }
}

export {}
