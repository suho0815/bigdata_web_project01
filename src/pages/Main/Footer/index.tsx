import type {FC} from 'react'
import type {DivProps} from '../../../components'
import {Div} from '../../../components'
import kakao from '../../../images/footer-sns-0.png'
import facebook from '../../../images/footer-sns-2.png'
import insta from '../../../images/footer-sns-3.png'

export type FooterProps = DivProps & {}

const Footer: FC<FooterProps> = () => {
  return (
    <footer className="absolute bottom-0 z-20 flex flex-col w-full translate-y-full bg-mint">
      <Div className="flex justify-center mt-8 mb-8">
        <img src={kakao} alt="" className="mr-4" />
        <img src={facebook} alt="" className="mr-4" />
        <img src={insta} alt="" />
      </Div>
      <Div className="flex flex-col items-center mb-4">
        <div>이수호(F) 하성진(B)</div>
        <div>Info Support Marketing</div>
        <div>Terms of Use Private Policy</div>
        <div>@2023 Clarity</div>
      </Div>
    </footer>
  )
}

export default Footer
