import { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { 
  StyleSheet, 
  View, 
  Text,
  TextInput, 
  Button,
  FlatList,
} from 'react-native';


export default function App() {
  
  const [courseGoals, setCourseGoals] = useState([]) 

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentCorseGoals => [
      ...currentCorseGoals, 
      {text: enteredGoalText, id: Math.random().toString()}
    ]);
  }

  function deleteGoalHandler(id){
    setCourseGoals((currentCorseGoals) => {
      return currentCorseGoals.filter((goal) => goal.id !== id);
    });
  }


  return (
    <View style={styles.appContainer}>

      <GoalInput onAddGoal={addGoalHandler} />

      <View  style={styles.goalsContainer}>
        <FlatList 
          data={courseGoals} 
          renderItem={itemData => {
            return (
            <GoalItem 
            text={itemData.item.text} 
            onDeleteItem={deleteGoalHandler} 
            id={itemData.item.id}/>
            );
        }} 
          keyExtractor={(item, index) => {
            return item.id
          }}
          alwaysBounceVertical={false} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  appContainer:{
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },


  goalsContainer:{
    flex: 4,
  },
  
});
