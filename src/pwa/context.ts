import { createContext } from 'react'
export const PwaContext=createContext<{needRefresh:boolean;update:()=>Promise<void>}>({needRefresh:false,update:async()=>{}})
