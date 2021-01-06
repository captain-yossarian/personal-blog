import React, { FC, useEffect } from "react";
import Prism from "prismjs";
import { CodeWrapper } from "../Shared/Layout";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";

const Code: FC<{ code: string }> = ({ code }) => {
  useEffect(() => {
    setTimeout(() => Prism.highlightAll(), 0);
  });
  return (
    <CodeWrapper>
      <pre className="line-numbers" style={{ borderRadius: "10px" }}>
        <code className="language-typescript">{code}</code>
      </pre>
    </CodeWrapper>
  );
};

export default Code;
