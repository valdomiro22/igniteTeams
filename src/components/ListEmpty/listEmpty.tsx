import { Container, Message } from "./stylesListEmpty";

type Props = {
  message: string;
}

export function ListEmpty({ message }: Props) {
  return (
    <Container>
      <Message>
        { message }
      </Message>
    </Container>
  )
}