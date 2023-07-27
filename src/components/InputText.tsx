import {FC, DetailedHTMLProps} from 'react'

export type InputTextProps = {}

export const InputText: FC<InputTextProps> = () => {
  return (
    <div className="mt-4 mb-4">
      <label className="block mb-2 text-sm font-bold" htmlFor="username">
        Username
      </label>
      <input
        className="w-full px-3 py-2 border rounded shadow appearance-none"
        id="username"
        type="text"
        placeholder="아이디"
      />
    </div>
  )
}
