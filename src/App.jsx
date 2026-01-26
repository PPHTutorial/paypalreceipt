import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import EditorPanel from './components/Editor/EditorPanel';
import ReceiptPreview from './components/ReceiptPreview/ReceiptPreview';
import MobileNav from './components/Navbar/MobileNav';
import { getRandomReceipt } from './utils/randomize';
import { Menu, X } from 'lucide-react';

const App = () => {
  const [data, setData] = useState({
    name: 'Moces Jonnes',
    amount: '500.00',
    platform: 'TikTok',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    note: 'Your funds have been successfully delivered. Enjoy!',
    batchCount: 1
  });
  
  const [screenSize, setScreenSize] = useState('lg');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const receiptRef = useRef(null);

  const handleRandomize = () => {
    setData(getRandomReceipt());
  };

  const handleExport = (format) => {
    if (receiptRef.current === null) return;

    if (format === 'png') {
      const width = receiptRef.current.offsetWidth;
      const height = receiptRef.current.scrollHeight;
      
      toPng(receiptRef.current, { 
        cacheBust: true, 
        pixelRatio: 2,
        width: width,
        height: height,
        style: {
          transform: 'none',
          margin: '0',
        }
      })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `PayPal_Receipt_${data.platform}_${data.amount}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => console.error('PNG Export failed', err));
    } else if (format === 'pdf') {
      const width = receiptRef.current.offsetWidth;
      const height = receiptRef.current.scrollHeight;

      toPng(receiptRef.current, { 
        cacheBust: true, 
        pixelRatio: 2,
        width: width,
        height: height,
        style: {
          transform: 'none',
          margin: '0',
        }
      })
        .then((dataUrl) => {
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [width, height]
          });
          pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
          pdf.save(`PayPal_Receipt_${data.platform}_${data.amount}.pdf`);
        })
        .catch((err) => console.error('PDF Export failed', err));
    } else if (format === 'batch') {
      const count = data.batchCount || 1;
      let currentIdx = 0;

      const generateNext = async () => {
        if (currentIdx >= count) return;

        const randomData = getRandomReceipt();
        setData(prev => ({ ...prev, ...randomData }));

        // Wait for state to apply and DOM to update
        setTimeout(async () => {
          try {
            const width = receiptRef.current.offsetWidth;
            const height = receiptRef.current.scrollHeight;

            const dataUrl = await toPng(receiptRef.current, { 
              cacheBust: true, 
              pixelRatio: 2,
              width: width,
              height: height,
              style: {
                transform: 'none',
                margin: '0'
              }
            });
            const link = document.createElement('a');
            link.download = `PayPal_Batch_${currentIdx + 1}_${randomData.platform}.png`;
            link.href = dataUrl;
            link.click();
            
            currentIdx++;
            generateNext();
          } catch (err) {
            console.error('Batch generation failed', err);
          }
        }, 1000); // 1s delay for reliability
      };

      generateNext();
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0c10', position: 'relative' }}>
      <MobileNav onToggle={() => setIsSidebarOpen(!isSidebarOpen)} isOpen={isSidebarOpen} />
      
      <div className={`editor-wrapper ${isSidebarOpen ? 'open' : ''}`}>
        <EditorPanel 
          data={data} 
          onChange={setData} 
          onRandomize={handleRandomize}
          onExport={handleExport}
          screenSize={screenSize}
          setScreenSize={setScreenSize}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {isSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <main className="main-content">
        <div style={{ transformOrigin: 'top center', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', width: '100%', display: 'flex', justifyContent: 'center' }}>
           <ReceiptPreview data={data} screenSize={screenSize} containerRef={receiptRef} />
        </div>
      </main>
    </div>
  );
};

export default App;
