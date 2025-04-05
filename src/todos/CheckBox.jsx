import { Check } from 'lucide-react'
import React from 'react'

const CheckBox = ({label, checked, onChange,id}) => {
  return (
    <label className='flex gap-4 items-center cursor-pointer'>
        <input 
            id={id}
            type="checkbox"
            className='hidden'
            checked={checked}
            onChange={onChange} />
        <div className={`shrink-0 flex size-6 items-center justify-center 
        gap-2 border-2 border-secondary-text rounded-md ${checked ? 'bg-accent border-none':'bg-transparent'}`}>
            {checked && <Check className='text-black size-4'/>}
        </div>
        <span className={`flex
        ${checked ? "line-through text-secondary-text" : "text-white"}`

        }>{label}</span>
    </label>
  )
}

export default CheckBox