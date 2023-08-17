import {getCookie} from './Cookie'

// Free게시글 이미지 가져오기
export const GetFreeImageFile = (
  img: string,
  setImageFile: (value: React.SetStateAction<string | undefined>) => void
) => {
  const tokenCookie = getCookie('accessJwtToken:')
  if (tokenCookie) {
    const token = tokenCookie.trim()

    const headers = new Headers()
    headers.append('Authorization', token)
    console.log(img)
    if (img !== undefined || img !== null) {
      fetch(img, {
        method: 'GET',
        headers: headers
      })
        .then(response => response.blob())
        .then(blob => {
          const imageUrl = URL.createObjectURL(blob)
          console.log(imageUrl)
          setImageFile(imageUrl)
        })
        .catch(error => console.error(error.message))
    }
  }
}

// Honey게시글 이미지 가져오기
export const GetHoneyImageFile = (
  img: string,
  setImageFile: (value: React.SetStateAction<string | undefined>) => void
) => {
  if (img !== undefined || img !== null) {
    fetch(img, {
      method: 'GET'
    })
      .then(response => response.blob())
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob)
        // console.log(imageUrl)
        setImageFile(imageUrl)
      })
      .catch(error => console.error(error.message))
  }
}
