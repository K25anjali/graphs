import EmissionsChart from './components/EmissionsChart';
import ElectricityChart from './components/ElectricityChart';
import FossilsFuelChart from './components/FossilsFuelChart';

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100 py-10">
      <h2 className='text-center font-bold text-3xl bg-gray-300 mx-auto max-w-6xl py-2'>Graphs</h2>
      <EmissionsChart />
      <ElectricityChart />
      <FossilsFuelChart />
    </div>
  );
}

export default App;
