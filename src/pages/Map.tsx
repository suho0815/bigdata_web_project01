import type {FC} from 'react'
import {useEffect} from 'react'
import {Div} from '../components'

declare global {
  interface Window {
    kakao: any
  }
}

const Map = () => {
  useEffect(() => {
    let container = document.getElementById('map') //지도를 담을 영역의 DOM 레퍼런스
    let options = {
      //지도를 생성할 때 필요한 기본 옵션 중심좌표(위도, 경도)
      center: new window.kakao.maps.LatLng(36.477078, 128.026691), //지도의 중심좌표.
      level: 12 //지도의 레벨(확대, 축소 정도)
    }
    let map = new window.kakao.maps.Map(container, options) //지도 생성 및 객체 리턴
    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    let zoomControl = new window.kakao.maps.ZoomControl()
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)

    // 마커가 표시될 위치입니다
    let markerPosition = new window.kakao.maps.LatLng(36.477078, 128.026691)

    // 마커를 생성합니다
    let marker = new window.kakao.maps.Marker({
      position: markerPosition
    })

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map)

    let iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwRemoveable = true // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성합니다
    let infowindow = new window.kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable
    })

    // 마커에 클릭이벤트를 등록합니다
    window.kakao.maps.event.addListener(marker, 'click', function () {
      // 마커 위에 인포윈도우를 표시합니다
      infowindow.open(map, marker)
    })

    // for (let i = 0; i < dummy.data.length; i++) {
    //   displayMarker(dummy.data[i], i)
    // }
    // function displayMarker<
    //   T extends {
    //     name: string
    //     location_y: number
    //     location_x: number
    //     active: boolean
    //     point: number
    //   }
    // >(data: T, i: number) {
    //   // 인포윈도우 표시될 위치(좌표)
    //   let iwPosition = new window.kakao.maps.LatLng(data.location_y, data.location_x)
    //   // 인포윈도우에 표출될 내용. HTML 문자열이나 document element 등이 가능하다.
    //   var inactiveInfoWindow = `<div class="inactive infowindow""><span>${data.name}</span></div>`
    //   //인포윈도우
    //   let infowindow
    //   infowindow = new window.kakao.maps.InfoWindow({
    //     zIndex: 1,
    //     position: iwPosition,
    //     content: inactiveInfoWindow,
    //     disableAutoPan: false,
    //     map: map //map에 해당 인포윈도우를 적용한다.
    //   })
    //   //중심좌표 재설정
    //   var position = new window.kakao.maps.LatLng(37.586272, 127.029005)
    //   map.setCenter(position)
    // }
  }, [])

  return <Div id="map" className="w-3/4 border rounded" height="100%"></Div>
}
export default Map
