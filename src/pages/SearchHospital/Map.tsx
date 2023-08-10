import type {FC} from 'react'
import type {DivProps} from '../../components'
import {useState, useEffect} from 'react'
import {Div} from '../../components'
import {useRecoilValue, useSetRecoilState} from 'recoil'
import {hospitalListPage} from '../../store/RecoilAtom'

declare global {
  interface Window {
    kakao: any
  }
}

export type MapProps = DivProps & {sharedHospital: any} & {}

export const Map: FC<MapProps> = ({className, sharedHospital}) => {
  //recoil
  const setPage = useSetRecoilState(hospitalListPage)
  const page = useRecoilValue(hospitalListPage)

  const [limit, setLimit] = useState<number>(10)
  const offset = (page - 1) * limit
  let total = 0

  // const [positions, setPositions] = useState<any[]>()

  console.log(sharedHospital)

  useEffect(() => {
    let positions: any[] | undefined = undefined
    if (sharedHospital && sharedHospital['pethospital'] !== undefined) {
      const pethospital = sharedHospital['pethospital']
      const latitudeLongitude = pethospital.map((data: any, index: number) => ({
        title: data['hospitalName'],
        latlng: new window.kakao.maps.LatLng(
          data['latitude'] / 10000,
          data['longitude'] / 1000
        )
      }))
      positions = latitudeLongitude
      // setPositions(latitudeLongitude)
      console.log(positions)
    } else if (sharedHospital && sharedHospital['hospital_name'] !== undefined) {
      const pethospital = sharedHospital['hospital_name']
      const latitudeLongitude = pethospital.map((data: any, index: number) => ({
        title: data['hospitalName'],
        latlng: new window.kakao.maps.LatLng(
          data['latitude'] / 10000,
          data['longitude'] / 1000
        )
      }))
      positions = latitudeLongitude
      // setPositions(latitudeLongitude)
      console.log(positions)
    }

    window.kakao.maps.load(function () {
      let container = document.getElementById('map') //지도를 담을 영역의 DOM 레퍼런스
      let options = {
        //지도를 생성할 때 필요한 기본 옵션 중심좌표(위도, 경도)
        center: new window.kakao.maps.LatLng(36.477078, 128.026691), //지도의 중심좌표.
        level: 13 //지도의 레벨(확대, 축소 정도)
      }
      let map = new window.kakao.maps.Map(container, options) //지도 생성 및 객체 리턴
      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      let zoomControl = new window.kakao.maps.ZoomControl()
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)

      // 마커 이미지의 이미지 주소입니다
      let imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'

      var position1 = [
        {
          title: '카카오',
          latlng: new window.kakao.maps.LatLng(33.450705, 126.570677)
        },
        {
          title: '생태연못',
          latlng: new window.kakao.maps.LatLng(33.450936, 126.569477)
        },
        {
          title: '텃밭',
          latlng: new window.kakao.maps.LatLng(33.450879, 126.56994)
        },
        {
          title: '근린공원',
          latlng: new window.kakao.maps.LatLng(33.451393, 126.570738)
        }
      ]

      console.log(positions)
      if (positions !== undefined) {
        for (let i = offset; i < Math.min(offset + limit, positions.length); i++) {
          console.log(positions[i])
          // 마커 이미지의 이미지 크기 입니다
          let imageSize = new window.kakao.maps.Size(24, 35)

          // 마커 이미지를 생성합니다
          let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize)

          // 마커를 생성합니다
          let marker = new window.kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage // 마커 이미지
          })
          // console.log(marker)
          // marker.setMap(map)
        }
        let position = new window.kakao.maps.LatLng(36.477078, 128.026691)
        // positions !== undefined
        //   ? positions[0].latlng
        //   : new window.kakao.maps.LatLng(36.477078, 128.026691)
        map.setCenter(position)
      }
    })
    //중심좌표 재설정
    // console.log(positions !== undefined ? positions[0].LatLng : '')
  }, [sharedHospital, page])
  const classname = [
    'w-4/5',
    'mt-8',
    'mb-8',
    'border',
    'rounded',
    'grow',
    'border-8',
    className
  ].join(' ')
  return <Div id="map" className={classname} height="50rem"></Div>
}
export default Map
