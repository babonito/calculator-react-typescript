import React, {FC} from 'react';

interface ButtonProps {
    className?: string
    onClick?: () => void
    children?: React.ReactElement | React.ReactNode
}

const ButtonCalculator: FC<ButtonProps> =
    ({
         onClick,
         className,
         children,
    }) => {

        return (
            <button className={className} onClick={onClick}>
                {children}
            </button>
        );
    };

export default ButtonCalculator;