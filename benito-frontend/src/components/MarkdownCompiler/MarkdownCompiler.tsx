import React from "react";
import { hot } from "react-hot-loader";
import ReactMarkdown from "react-markdown";

type MarkdownCompilerProps = {
  source: string;
  className?: string;
};

function MarkdownRenderer(props: any) {
  return <img {...props} style={{ maxWidth: "100%" }} />;
}

const MarkdownCompiler = ({ source, className }: MarkdownCompilerProps) => (
  <ReactMarkdown
    className={className}
    source={source}
    renderers={{ image: MarkdownRenderer }}
  />
);

export default hot(module)(MarkdownCompiler);
