declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.less' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}
declare module '*.png' {
  const content: string;
  export default content;
}
declare module 'file-saver';
declare module 'xlsx';
declare module '*.webp';
declare module '*.jpeg' {
  const content: string;
  export default content;
}
