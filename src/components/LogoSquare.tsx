import classNames from 'classnames';
import * as React from 'react';

const logoSrc = '/images/cropped_circle_image.png';

export default function LogoSquare({
  className,
}: {
  className?: string;
}): JSX.Element {
  return (
    <img
      className={classNames('inline-block', className)}
      src={logoSrc}
      alt="USAMO Guide"
    />
  );
}
