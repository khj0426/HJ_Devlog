import Image from 'next/image';
import styled from 'styled-components';

import Flex from '@/Component/Common/Flex/Flex';
import ItemList from '@/Component/Common/ItemList/ItemList';
const StyledGuestBookList = styled.section`
  width: min(100%, 760px);

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }

  margin: 0 auto 28px;
  padding: 8px 20px;
  border: 1px solid var(--seed-color-stroke-neutral-subtle);
  border-radius: 20px;
  background-color: var(--seed-color-bg-layer-fill);
`;

const EntryContent = styled.p`
  color: var(--seed-color-fg-neutral);
  overflow-wrap: anywhere;
`;

type guestBookListProps = {
  id: string;
  comment: string;
  commentTime: string;
  avatar: string;
};

const GuestBookList = ({
  guestbookList,
}: {
  guestbookList: guestBookListProps[];
}) => {
  return (
    <StyledGuestBookList>
      <ItemList
        hasDivider
        data={guestbookList}
        renderItem={(value) => {
          return (
            <Flex
              key={value.id}
              justifyContent="space-between"
              width={'100%'}
              flexDirection="row"
              padding={'10px 0'}
            >
              <Image
                src={value.avatar}
                width={30}
                height={30}
                alt="avatar"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcKgkAAWkAwC+Aq/wAAAAASUVORK5CYII="
              />
              <EntryContent>{value.comment}</EntryContent>
            </Flex>
          );
        }}
      />
    </StyledGuestBookList>
  );
};

export default GuestBookList;
