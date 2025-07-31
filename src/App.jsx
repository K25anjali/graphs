import EmissionsChart from './components/EmissionsChart';
import ElectricityChart from './components/ElectricityChart';
import FossilsFuelChart from './components/FossilsFuelChart';

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <EmissionsChart />
      <ElectricityChart />
      <FossilsFuelChart />
    </div>
  );
}

export default App;
