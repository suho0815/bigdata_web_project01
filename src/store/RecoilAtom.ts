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
