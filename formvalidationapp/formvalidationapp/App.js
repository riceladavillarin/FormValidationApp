import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState(null);
  const [pressedButton, setPressedButton] = useState(null); // Tracks which button is pressed
  const [firstNumberError, setFirstNumberError] = useState('');
  const [secondNumberError, setSecondNumberError] = useState('');

  const handleOperation = (operation) => {
    let hasError = false;

    if(firstNumber==='') {
      setFirstNumberError('First number is required');
      hasError = true;
    } else {
      setFirstNumberError('');
    }

    if(secondNumber==='') {
      setSecondNumberError('Second number is required');
      hasError = true;
    } else {
      setSecondNumberError('')
    }

    if(hasError) return;
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    if(isNaN(num1) || isNaN(num2)) {
      setResult('Invalid Input');
    }
    
    let res = 0;

    if (!isNaN(num1) && !isNaN(num2)) {
      switch (operation) {
        case 'add':
          res = num1 + num2;
          break;
        case 'subtract':
          res = num1 - num2;
          break;
        case 'multiply':
          res = num1 * num2;
          break;
        case 'divide':
          res = num1 / num2;
          break;
        default:
          break;
      }
      setResult(res);
    } else {
      setResult('Invalid Input');
    }
    setPressedButton(operation); // Set the pressed button
  };

  const reset = () => {
    setFirstNumber('');
    setSecondNumber('');
    setResult(null);
    setPressedButton(null); // Reset the pressed button
    setFirstNumberError('');
    setSecondNumberError('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Number</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter first number"
          value={firstNumber}
          onChangeText={setFirstNumber}
        />
      </View>
      {firstNumberError? <Text style={styles.errorText}>{firstNumberError}</Text>:null}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Second Number</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter second number"
          value={secondNumber}
          onChangeText={setSecondNumber}
        />
      </View>
      {secondNumberError? <Text style={styles.errorText}>{secondNumberError}</Text>:null}
      <View style={styles.operationContainer}>
        <TouchableOpacity
          style={[styles.button, pressedButton === 'add' && styles.buttonPressed]}
          onPress={() => handleOperation('add')}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, pressedButton === 'subtract' && styles.buttonPressed]}
          onPress={() => handleOperation('subtract')}
        >
          <Text style={styles.buttonText}>Subtract</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, pressedButton === 'multiply' && styles.buttonPressed]}
          onPress={() => handleOperation('multiply')}
        >
          <Text style={styles.buttonText}>Multiply</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, pressedButton === 'divide' && styles.buttonPressed]}
          onPress={() => handleOperation('divide')}
        >
          <Text style={styles.buttonText}>Divide</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>Result:</Text>
        {result !== null && <Text style={styles.resultText}>{result}</Text>}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={reset}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 20,
  },
  operationContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#0056b3', // Darker blue when the button is pressed
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 20,
    marginLeft: 10,
    color: 'red',
  },
  resetButton: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
});