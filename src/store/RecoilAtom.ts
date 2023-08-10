import {atom} from 'recoil'

// export type isloginTokenType = {
//   key: 'islogin'
//   default: {}
// }

export const isloginToken = atom<boolean>({
  key: 'islogin',
  default: false
})

export const isFree = atom<boolean>({
  key: 'isfree',
  default: false
})

export const searchData = atom<Array<any>>({
  key: 'searchData',
  default: []
})

export const page = atom<number>({
  key: 'page',
  default: 0
})
