import type { GuestBook } from '@/@types/GuestBookType';

import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const StyledGuestBookList = styled.section`
  min-height: 700px;
`;

const GuestBookList = ({
  guestbookList,
}: {
  guestbookList: GuestBook | undefined;
}) => {
  return (
    <StyledGuestBookList>
      {guestbookList &&
        guestbookList.guestbook &&
        Array.from(Object.values(guestbookList.guestbook)).map((value) => (
          <div key={uuidv4()}>{value.comment}</div>
        ))}
    </StyledGuestBookList>
  );
};

export default GuestBookList;
