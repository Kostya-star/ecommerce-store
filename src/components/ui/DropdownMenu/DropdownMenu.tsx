'use client';

import React, { Children, cloneElement, isValidElement, ReactNode, useEffect, useRef, useState } from 'react'
import cls from './DropdownMenu.module.scss'

interface DropdownMenuProps {
  trigger: ReactNode
  children: ReactNode
}

export function DropdownMenu({ trigger, children }: DropdownMenuProps) {
  const [isContentVisible, setContentVisible] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement | null>(null)
  const menuContentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isContentVisible) return;
    
    const handleClickOutside = (e: MouseEvent)  => {
      const isClickOutside = !menuContainerRef.current?.contains(e.target as Node); 

      if (isClickOutside) {
        setContentVisible(false);
      } 
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isContentVisible])
  return <div ref={menuContainerRef}>
    <span className={cls.trigger} onClick={() => setContentVisible(prev => !prev)}>
      { trigger }
    </span>

    {
  isContentVisible && (
    <div ref={menuContentRef} className={cls.content}>
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child, {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
              onClick: () => setContentVisible(false),
            })
          : child
      )}
    </div>
  )
}
  </div>
}