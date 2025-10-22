import { useState, useRef, useEffect } from 'react';
import * as QRCode from 'qrcode';
import { JSONToTLV } from '../lib';

interface JSONToTLVConverterProps {
  initialJSON?: string;
}

const JSONToTLVConverter: React.FC<JSONToTLVConverterProps> = ({ initialJSON = '' }) => {
  const [jsonInput, setJsonInput] = useState<string>(initialJSON);
  const [tlvString, setTlvString] = useState<string>('');
  const [jsonError, setJsonError] = useState<string>('');
  const [jsonSuccess, setJsonSuccess] = useState<boolean>(false);
  const [copyTlvBtnText, setCopyTlvBtnText] = useState<string>('Copy TLV');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate QR Code whenever tlvString changes
  useEffect(() => {
    if (tlvString && canvasRef.current) {
      generateQRCode(tlvString);
    }
  }, [tlvString]);

  const generateQRCode = async (text: string): Promise<void> => {
    if (canvasRef.current) {
      try {
        await QRCode.toCanvas(canvasRef.current, text, {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        });
      } catch (error) {
        console.error('QR Code generation error:', error);
      }
    }
  };

  const handleConvertJSON = (): void => {
    const trimmedInput = jsonInput.trim();

    const { tlvString: result, ok, error } = JSONToTLV.Convert(trimmedInput);

    if (!ok || !result) {
      setJsonError(`❌ ${error || 'Unknown error'}`);
      setJsonSuccess(false);
      setTlvString('');
      return;
    }

    setJsonError('');
    setJsonSuccess(true);
    setTlvString(result);
  };

  const handleCopyTLV = async (): Promise<void> => {
    if (tlvString) {
      await navigator.clipboard.writeText(tlvString);
      setCopyTlvBtnText('✓ Copied!');
      setTimeout(() => {
        setCopyTlvBtnText('Copy TLV');
      }, 2000);
    }
  };

  const handleDownloadQR = (): void => {
    if (canvasRef.current) {
      const url = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'tlv-qrcode.png';
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="section">
      <h2>2. Convert JSON to TLV</h2>
      <p>Enter JSON object to convert to TLV format with QR Code</p>

      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here, e.g., [{"tag": "00", "length": 2, "value": "01"}]'
      />

      <button onClick={handleConvertJSON} className="btn btn-primary">
        Convert JSON to TLV
      </button>

      {jsonError && <div className="alert alert-error">{jsonError}</div>}

      {jsonSuccess && (
        <div className="alert alert-success">
          ✅ JSON converted successfully!
        </div>
      )}

      {tlvString && (
        <div>
          <h3>TLV Result:</h3>
          <pre>{tlvString}</pre>
          <button onClick={handleCopyTLV} className="btn btn-secondary">
            {copyTlvBtnText}
          </button>

          {/* QR Code Section */}
          <div className="qr-section">
            <h3>QR Code:</h3>
            <div className="qr-container">
              <canvas ref={canvasRef}></canvas>
            </div>
            <button onClick={handleDownloadQR} className="btn btn-info">
              Download QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JSONToTLVConverter;
