import { useState, useEffect, useRef } from "react";
import { Alert, FlatList, TextInput, Keyboard } from "react-native";
import { Header } from "@components/Header/header";
import { Container, Form } from "./stylesPlayers";
import { Highlight } from "@components/Highlight/highlight";
import { ButtonIcon } from "@components/ButtonIcon/buttonIcon";
import { Input } from "@components/Input/input";
import { Filter } from "@components/Filter/filter";
import { Headerlist } from "./stylesPlayers";
import { NumberOfPlayers } from "./stylesPlayers";
import { PlayerCard } from "@components/PlayerCard/playerCard";
import { ListEmpty } from "@components/ListEmpty/listEmpty";
import { Button } from "@components/Button/button";
import { useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAdTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup} from "@storage/player/playerRemoveByGroup";
import { Loading } from "@components/Loading/loading";

type RoutParams = {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const route = useRoute();
  const { group } = route.params as RoutParams;
  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('')
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message);
      } else {
        console.log(error);
        Alert.alert('Nova pessoa', 'Não foi passível adicionar');
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas.')
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('remover pessoa', 'Não foi possível remover esta pessoa.');
    }
  }

  // async function handleGroupRemove() {
  //   Alert.alert(
  //     'Remover',
  //     'Deseja remover a turma?',
  //     [
  //       {text: 'Não', style: 'cancel'},
  //       {text: 'Sim', onPress: () => groupRemove}
  //     ]
  //   );
  // }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight 
        title={group}
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input 
          inputRef={ newPlayerNameInputRef }
          value={ newPlayerName }
          placeholder="Nome da pessoa"
          autoCorrect={ false }
          onChangeText={ setNewPlayerName }
          onSubmitEditing={ handleAddPlayer }
          returnKeyType="done"
        />

        <ButtonIcon 
          icon="add"
          onPress={ handleAddPlayer }
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

      { isLoading ? <Loading /> : 
        <FlatList 
          data={ players }
          keyExtractor={ item => item.name }
          renderItem={({ item }) => (
            <PlayerCard 
              name={ item.name } 
              onRemove={() => handlePlayerRemove(item.name)}
            />
          )}
          ListEmptyComponent={ () => <ListEmpty message='Não há pessoas nesse time' /> }
          showsVerticalScrollIndicator={ false }
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && {flex: 1}
          ]}
        />
      }

      <Button 
        title="Remover Turma"
        type="SECONDARY"
      />
    </Container>
  );
}