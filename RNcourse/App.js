import { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { 
  StyleSheet, 
  View, 
  Button,
  FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false) ;
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler(){
    setModalIsVisible(true);
  }

  function endAddGoalHandler(){
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentCorseGoals => [
      ...currentCorseGoals, 
      {text: enteredGoalText, id: Math.random().toString()}
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id){
    setCourseGoals((currentCorseGoals) => {
      return currentCorseGoals.filter((goal) => goal.id !== id);
    });
  }


  return (
    <>
    <StatusBar style='light' />
    <View style={styles.appContainer}>
      <Button 
        title="Добавить задания"
        color="#a065ec" 
        onPress={startAddGoalHandler}
      />

     <GoalInput 
        visible={modalIsVisible} 
        onAddGoal={addGoalHandler} 
        onCancel={endAddGoalHandler}
      />
      <View style={styles.goalsContainer}>
        <FlatList 
          data={courseGoals} 
          renderItem={itemData => {
            return (
              <GoalItem 
                text={itemData.item.text} 
                onDeleteItem={deleteGoalHandler} 
                id={itemData.item.id}
              />
            );
        }} 
          keyExtractor={(item, index) => {
            return item.id
          }}
          alwaysBounceVertical={false} />
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  appContainer:{
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a'
  },


  goalsContainer:{
    flex: 4,
  },
  
});
