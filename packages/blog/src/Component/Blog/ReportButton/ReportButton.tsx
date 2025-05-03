import { ReactNode } from 'react';

import { TrendUp } from 'iconic-react';
import Link from 'next/link';

const ReportButton = ({ children }: { children?: ReactNode }) => {
  return (
    <Link href="/backoffice">
      <TrendUp
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

export default ReportButton;
