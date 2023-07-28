import {FC} from 'react'
//@ts-ignore
import pupp from '../../../images/pupp.mp4'

const Section2: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="relative z-10 p-4 bg-white bg-opacity-50 rounded-lg">
        <h1 className="text-4xl font-bold">Background Content</h1>
        <p className="mt-2 text-lg">
          This is your background component with React, TypeScript, and Tailwind CSS.
        </p>
      </div>
    </div>
  )
}

export default Section2
