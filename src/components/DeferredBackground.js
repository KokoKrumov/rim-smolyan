import React from 'react';
import { useInView } from '../utilities/useInView';

export default function DeferredBackground({ image, children, className }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className}
      style={image && visible ? { backgroundImage: `url(${image})` } : undefined}>
      {children}
    </div>
  );
}
