import { Header } from '@components/Header/header';
import { Container } from './stylesGroup';
import { Highlight } from '@components/Highlight/highlight';
import { GroupCard } from '@components/GroupCard/GroupCard';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpty/listEmpty';
import { Button } from '@components/Button/button';
import { Input } from '@components/Input/input';

export function Groups() {
  // const [groups, setGroups] = useState(['Galera da Rocketsiat']);
  const [groups, setGroups] = useState([]);

  return (
    <Container>
      <Header />

      <Highlight 
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => ( <GroupCard title={item} /> )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira turma' />}
        showsVerticalScrollIndicator={ false }
      />

      <Button
        title='Criar nova turma' 
      />
    </Container>
  );
}