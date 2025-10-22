import { useState } from 'react';
import { TLV } from '../lib';

interface TLVParserProps {
  initialPayload?: string;
}

const TLVParser: React.FC<TLVParserProps> = ({ initialPayload = '' }) => {
  const [payload, setPayload] = useState<string>(initialPayload);
  const [tlvResult, setTlvResult] = useState<string | null>(null);
  const [tlvError, setTlvError] = useState<boolean>(false);
  const [tlvSuccess, setTlvSuccess] = useState<boolean>(false);
  const [copyBtnText, setCopyBtnText] = useState<string>('Copy JSON');

  const handleParseTLV = (): void => {
    const trimmedPayload = payload.trim();
    const { result, ok } = TLV.GetAsObjects(trimmedPayload);

    if (!ok || !result) {
      setTlvError(true);
      setTlvSuccess(false);
      setTlvResult(null);
      return;
    }

    setTlvError(false);
    setTlvSuccess(true);
    setTlvResult(JSON.stringify(result, undefined, 4));
  };

  const handleCopyJSON = async (): Promise<void> => {
    if (tlvResult) {
      await navigator.clipboard.writeText(tlvResult);
      setCopyBtnText('✓ Copied!');
      setTimeout(() => {
        setCopyBtnText('Copy JSON');
      }, 2000);
    }
  };

  return (
    <div className="section">
      <h2>1. Read & Parse TLV</h2>
      <p>Enter TLV string to parse into JSON format</p>

      <textarea
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        placeholder="Enter TLV string here..."
      />

      <button onClick={handleParseTLV} className="btn btn-primary">
        Parse TLV to JSON
      </button>

      {tlvError && (
        <div className="alert alert-error">
          ❌ Invalid TLV format! Please check your input.
        </div>
      )}

      {tlvSuccess && (
        <div className="alert alert-success">
          ✅ TLV parsed successfully!
        </div>
      )}

      {tlvResult && (
        <div>
          <h3>Parsed Result:</h3>
          <pre>{tlvResult}</pre>
          <button onClick={handleCopyJSON} className="btn btn-secondary">
            {copyBtnText}
          </button>
        </div>
      )}
    </div>
  );
};

export default TLVParser;
