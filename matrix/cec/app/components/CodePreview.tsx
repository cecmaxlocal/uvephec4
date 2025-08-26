
import React, { useState, useEffect } from 'react';
import { CopyIcon } from './icons/CopyIcon';

interface CodePreviewProps {
  code: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
  };

  const highlightSyntax = (codeStr: string) => {
    return codeStr
      .replace(/(\b(?:my|use|new|if|else|for)\b)/g, '<span class="text-purple-400">$1</span>') // Keywords
      .replace(/(\$[a-zA-Z0-9_-]+)/g, '<span class="text-cyan-400">$1</span>') // Variables
      .replace(/(#.*)/g, '<span class="text-gray-500">$1</span>') // Comments
      .replace(/(\b[A-Z][a-zA-Z0-9]+)/g, '<span class="text-green-400">$1</span>') // Class names
      .replace(/('.*?')/g, '<span class="text-amber-400">$1</span>') // Strings
      .replace(/(\d+)/g, '<span class="text-orange-400">$1</span>'); // Numbers
  };

  return (
    <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-lg shadow-2xl h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-gray-300">Generated Raku Code</h3>
        <button
          onClick={handleCopy}
          className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-1.5 px-3 rounded-md transition-all flex items-center gap-2 text-sm"
        >
          <CopyIcon />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="p-4 overflow-auto h-full">
        <pre className="text-sm whitespace-pre-wrap">
          <code dangerouslySetInnerHTML={{ __html: highlightSyntax(code) }} />
        </pre>
      </div>
    </div>
  );
};

export default CodePreview;
   