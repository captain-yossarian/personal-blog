import React, { FC, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript';


const Code: FC<{ code: string }> = ({ code }) => {
    useEffect(() => {
        // Обновляем заголовок документа с помощью API браузера
        setTimeout(() => Prism.highlightAll(), 0)
    });
    return (
        <pre className="line-numbers">
            <code className="language-typescript">
                {code}
            </code>
        </pre>
    )
}

export default Code

