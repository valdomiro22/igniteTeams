import { Container, Icon, Title } from './stylesGroupCard';
import { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  title: string;
}

export function GroupCard({ title, ...rest }: Props) {
  return(
    <Container>
      <Icon />
      <Title>
        { title }
      </Title>
    </Container>
  );
}