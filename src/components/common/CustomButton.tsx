import React from 'react';
import {Button} from '@pankod/refine-mui';

import { CustomButtonProps } from 'interfaces/common';


const CustomButton = ({type, title, backgroundColor, color, fullWidth, icon, handleClick, disabled}: CustomButtonProps) => {
  return (
    <Button 
    type={type === 'submit' ? 'submit' : 'button'}
    disabled={disabled}
    sx={{
      backgroundColor: backgroundColor,
      flex: fullWidth ? 1 : 'unset',
      padding: '10px 15px',
      width: fullWidth ? '100%' : 'fit-content',
      minWidth: '130px',
      color: color,
      fontSize: '16px',
      fontWeight: 600,
      gap: '10px',
      textTransform: 'capitalize',
      '&:hover': {
        opacity: 0.9,
        backgroundColor,
      }
    }}
    onClick={handleClick}
     >{icon}
    {title}</Button>
  )
}

export default CustomButton