import { useState } from 'react';
import { TLVParser, JSONToTLVConverter } from './components';
import { samplePayload, sampleJSON } from './lib';
import './App.css';

function App() {
  const [tlvPayload, setTlvPayload] = useState<string>(samplePayload);
  const [jsonInput, setJsonInput] = useState<string>('');

  const handleLoadSampleTLV = (): void => {
    setTlvPayload(samplePayload);
    // Force re-render by creating new string
    setTlvPayload(prev => prev + '');
  };

  const handleLoadSampleJSON = (): void => {
    const jsonString = JSON.stringify(sampleJSON, undefined, 4);
    setJsonInput(jsonString);
  };

  return (
    <div className="container">
      <h1>TLV Parser & Generator</h1>

      {/* TLV Parser Component */}
      <TLVParser key={tlvPayload} initialPayload={tlvPayload} />

      <hr />

      {/* JSON to TLV Converter Component */}
      <JSONToTLVConverter key={jsonInput} initialJSON={jsonInput} />

      {/* Sample Data Section */}
      <div className="section">
        <h3>Sample Data</h3>
        <button onClick={handleLoadSampleTLV} className="btn btn-info">
          Load Sample TLV
        </button>
        <button onClick={handleLoadSampleJSON} className="btn btn-info">
          Load Sample JSON
        </button>
      </div>
    </div>
  );
}

export default App;
