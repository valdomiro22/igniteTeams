import { FlatList } from "react-native";
import { Header } from "@components/Header/header";
import { Container, Form } from "./stylesPlayers";
import { Highlight } from "@components/Highlight/highlight";
import { ButtonIcon } from "@components/ButtonIcon/buttonIcon";
import { Input } from "@components/Input/input";
import { Filter } from "@components/Filter/filter";
import { useState } from "react";
import { Headerlist } from "./stylesPlayers";
import { NumberOfPlayers } from "./stylesPlayers";
import { PlayerCard } from "@components/PlayerCard/playerCard";
import { ListEmpty } from "@components/ListEmpty/listEmpty";
import { Button } from "@components/Button/button";
import { useRoute } from "@react-navigation/native";

type RoutParams = {
  group: string;
}

export function Players() {
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([]);

  const route = useRoute();
  const { group } = route.params as RoutParams;

  return (
    <Container>
      <Header showBackButton />

      <Highlight 
        // title="Nome da turma"
        title={group}
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input 
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />

        <ButtonIcon 
          icon="add"
        />
      </Form>

      <Headerlist>
        <FlatList 
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </Headerlist>

      <FlatList 
        data={ players }
        keyExtractor={ item => item }
        renderItem={({ item }) => (
          <PlayerCard 
            name={ item } 
            onRemove={() => {}}
          />
        )}
        ListEmptyComponent={ () => <ListEmpty message='Não há pessoas nesse time' /> }
        showsVerticalScrollIndicator={ false }
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && {flex: 1}
        ]}
      />

      <Button 
        title="Remover Turma"
        type="SECONDARY"
      />
    </Container>
  );
}