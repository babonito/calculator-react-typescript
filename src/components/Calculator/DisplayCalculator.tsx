import React, {FC} from 'react';

interface DisplayProps {
    hasMemory?: boolean;
    expression?: string;
    value?: string;
    sizeValue?: string;
}
const DisplayCalculator: FC<DisplayProps> =
    ({
         hasMemory,
         expression,
         value,
         sizeValue
    }) => {

    return (
        <div className="calculator-display">
            <div className="calculator-memory">
                {hasMemory &&
                    <span>M</span>
                }
            </div>
            <div className="calculator-expression">
                {expression}
            </div>
            <div className="calculator-value" style={{fontSize: sizeValue}}>
                {value}
            </div>
        </div>
    );
};

export default DisplayCalculator;