import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Groups } from "@screens/Groups/groups";
import { Players } from "@screens/Players/players";
import { NewGroup } from "@screens/NewGroup/newGroup";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen 
        name="groups"
        component={ Groups }
      />

      <Screen 
        name="new"
        component={ NewGroup }
      />
      
      <Screen 
        name="players"
        component={ Players }
      />
    </Navigator>
  );
}