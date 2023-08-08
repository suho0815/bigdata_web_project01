import {Cookies} from 'react-cookie'
import jwtDecode from 'jwt-decode'
// import {useSetRecoilState, useRecoilValue} from 'recoil'
// import {isloginToken} from '../store/RecoilAtom'

const cookies = new Cookies()
//recoil 사용 선언부
// const setIslogin = useSetRecoilState(isloginToken)
// const islogin = useRecoilValue(isloginToken)

export const setCookie = (name: string, value: string, options?: any) => {
  return cookies.set(name, value, {...options})
}

export const getCookie = (name: string) => {
  return cookies.get(name)
}

export const removeCookie = (name: string, option?: any) => {
  return cookies.remove(name, {...option})
}

// 쿠키의 JWT에서 사용자 정보를 가져오는 함수
export const getUserInfoFromToken = () => {
  const cookies = document.cookie.split('; ')

  const tokenCookie = cookies.find(cookie => cookie.startsWith('accessJwtToken:='))

  if (tokenCookie) {
    const token = tokenCookie.split('=')[1].trim() // 앞뒤 공백 제거

    // console.log('토큰 값:', token) // 디버그 로그: 쿠키에서 토큰 값이 올바른지 확인

    try {
      const decodedToken: any = jwtDecode(token) // 해독된 토큰의 형태
      const userInfo = decodedToken.payload // 사용자 정보는 payload에 있습니다
      return userInfo
    } catch (error) {
      console.error('토큰 해독 에러:', error)
      return null
    }
  } else {
    console.error('토큰 쿠키를 찾을 수 없습니다.')
    return null
  }
}

// export const checkTokenAndSetLoginStatus = () => {
//   const cookies = document.cookie.split('; ')

//   const tokenCookie = cookies.find(cookie => cookie.startsWith('accessJwtToken='))

//   if (tokenCookie) {
//     const token = tokenCookie.split('=')[1].trim() // 앞뒤 공백 제거

//     console.log('토큰 값:', token) // 디버그 로그: 쿠키에서 토큰 값이 올바른지 확인

//     if (token) {
//       setIslogin(true)
//       // 필요한 경우 유효성 검사를 수행
//       // 토큰이 유효하면 로그인 상태를 true로 설정
//       // 그렇지 않으면 로그인 상태를 false로 설정
//     } else {
//       // 토큰이 존재하지 않으면 로그인 상태를 false로 설정
//       setIslogin(false)
//     }
//   }
// }
