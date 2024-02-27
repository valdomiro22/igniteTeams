import { Button } from "@components/Button/button";
import { Container, Content, Icon } from "./stylesNewGroup";
import { Header } from "@components/Header/header";
import { Highlight } from "@components/Highlight/highlight";
import { Input } from "@components/Input/input";

export function NewGroup() {
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
        />

        <Button
          title='Criar'
          style={{marginTop: 20}}
        />
      </Content>
    </Container>
  )
}