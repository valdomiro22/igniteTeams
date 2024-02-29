import { useState } from "react";
import { Button } from "@components/Button/button";
import { Container, Content, Icon } from "./stylesNewGroup";
import { Header } from "@components/Header/header";
import { Highlight } from "@components/Highlight/highlight";
import { Input } from "@components/Input/input";
import { useNavigation } from "@react-navigation/native";

export function NewGroup() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  function handleNew() {
    navigation.navigate('players', { group });
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight 
          title='Nova turma'
          subtitle='Crie a turma para adicionar as pessoas'
        />

        <Input 
          placeholder="Nome da turma"
          onChangeText={ setGroup }
        />

        <Button
          title='Criar'
          style={ {marginTop: 20} }
          onPress={ handleNew }
        />
      </Content>
    </Container>
  )
}