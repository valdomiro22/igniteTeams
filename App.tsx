import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { Groups } from '@screens/Groups/groups';
import theme from './src/theme/theme';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from '@components/Loading/loading';
import { NewGroup } from '@screens/NewGroup/newGroup';
import { Players } from '@screens/Players/players';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={ theme }>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {/* {fontsLoaded ? <NewGroup /> : <Loading />} */}
      {/* {fontsLoaded ? <Groups /> : <Loading />} */}
      {fontsLoaded ? <Players /> : <Loading />}
    </ThemeProvider>
  );
}
