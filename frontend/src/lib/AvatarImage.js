import React from 'react';

import Avatar from '@material-ui/core/Avatar';

const AvatarImage = ({ className, alt, src, initials }) => {
  console.log(initials);
  return (
    <Avatar className={className} alt={alt} src={src}>
      {initials}
    </Avatar>
  );
};
export default AvatarImage;
