import type {FC} from 'react'
import {Div} from '../../../components'
import CommunityList from './CommunityList'

const CommunitySection = () => {
  return (
    <Div className="flex w-full md:flex-col">
      <CommunityList />
      <CommunityList />
    </Div>
  )
}

export default CommunitySection
