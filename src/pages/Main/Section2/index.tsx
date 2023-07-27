import {FC} from 'react'
//@ts-ignore
import pupp from '../../../images/pupp.mp4'

const Section2: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <video
        className="absolute top-0 left-0 object-cover w-full h-full"
        autoPlay
        loop
        muted>
        <source src={pupp} type="video/mp4" />
        {/* Add other video formats here for cross-browser support */}
      </video>
      <div className="relative z-10 p-4 bg-white bg-opacity-50 rounded-lg">
        <h1 className="text-4xl font-bold">Your Video Background Content</h1>
        <p className="mt-2 text-lg">
          This is your video background component with React, TypeScript, and Tailwind
          CSS.
        </p>
      </div>
    </div>
  )
}

export default Section2
