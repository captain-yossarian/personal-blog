import React, { FC, useEffect } from "react";
import { CodeWrapper } from "../Layout";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import { highlightPrism } from "../Layout/utils";

const Code: FC<{ code: string }> = ({ code }) => {
  useEffect(highlightPrism);

  return (
    <CodeWrapper>
      <pre className="line-numbers" style={{ borderRadius: "10px" }}>
        <code className="language-typescript">{code}</code>
      </pre>
    </CodeWrapper>
  );
};

export default Code;
