import { ReactNode } from 'react';

import { Brodcast } from 'iconic-react';
import Link from 'next/link';

const RssButton = ({ children }: { children?: ReactNode }) => {
  return (
    <Link href="/feed.xml">
      <Brodcast
        size="32"
        color="#FF8A65"
        variant="Bold"
        style={{
          cursor: 'pointer',
        }}
      />
      {children}
    </Link>
  );
};

export default RssButton;
