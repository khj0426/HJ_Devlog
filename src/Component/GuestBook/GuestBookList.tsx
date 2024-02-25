import styled from 'styled-components';

const StyledGuestBookList = styled.section`
  min-height: 700px;
  width: 500px;
  max-height: 1000px;
  overflow-y: scroll;

  @media ${({ theme }) => theme.device.mobile} {
    width: 300px;
  }

  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
`;

const Entry = styled.div`
  border-bottom: 1px solid #dee2e6;
  padding: 10px 0;
`;

const EntryContent = styled.p`
  color: #343a40;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type guestBookListProps = {
  id: string;
  comment: string;
  commentTime: string;
};

const GuestBookList = ({
  guestbookList,
}: {
  guestbookList: guestBookListProps[];
}) => {
  return (
    <StyledGuestBookList>
      {guestbookList.map((value) => {
        return (
          <Entry key={value.id}>
            <EntryContent>{value.comment}</EntryContent>
          </Entry>
        );
      })}
    </StyledGuestBookList>
  );
};

export default GuestBookList;
