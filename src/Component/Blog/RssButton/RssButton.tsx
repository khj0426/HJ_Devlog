import Image from 'next/image';
import Link from 'next/link';

import RssImage from '~/public/images/rss.png';

const RssButton = () => {
  return (
    <Link href="/feed.xml">
      <Image
        src={RssImage}
        alt="RssImage"
        width={28}
        height={28}
        placeholder="blur"
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      />
    </Link>
  );
};

export default RssButton;
