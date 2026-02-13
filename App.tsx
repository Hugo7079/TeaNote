import React, { useState, useEffect } from 'react';
import { DrinkRecord, ViewState } from './types';
import HistoryItem from './components/HistoryItem';
import AddDrinkFlow from './components/AddDrinkFlow';
import { PlusCircle, Coffee, BookOpen, Layers, Star, LayoutGrid } from 'lucide-react';

const STORAGE_KEY = 'tea-note-records';

type Tab = 'all' | 'brand' | 'favorites';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('history');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [records, setRecords] = useState<DrinkRecord[]>([]);
  const [editingRecord, setEditingRecord] = useState<DrinkRecord | undefined>(undefined);
  
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const handleSaveRecord = (data: Omit<DrinkRecord, 'id' | 'date'> & { id?: string, date?: number }) => {
    const newRecord: DrinkRecord = {
      ...data,
      id: data.id || crypto.randomUUID(),
      date: Date.now(),
    };

    setRecords(prev => {
      if (data.id) {
        return prev.map(r => r.id === data.id ? newRecord : r);
      }
      return [newRecord, ...prev];
    });

    setView('history');
    setEditingRecord(undefined);
  };

  const startAdd = () => {
    setEditingRecord(undefined);
    setView('add');
  };

  const startEdit = (record: DrinkRecord) => {
    setEditingRecord(record);
    setView('add');
  };

  if (view === 'add') {
    return (
      <AddDrinkFlow 
        initialRecord={editingRecord}
        onSave={handleSaveRecord}
        onCancel={() => {
          setView('history');
          setEditingRecord(undefined);
        }}
      />
    );
  }

  // --- Filter Logic ---
  let content;
  const sortedRecords = [...records].sort((a, b) => b.date - a.date);

  if (records.length === 0) {
      content = (
        <div className="empty-state">
            <div className="empty-state-icon">
                <BookOpen />
            </div>
            <p>還沒有喝飲料的紀錄</p>
            <p>忘記上次喝什麼最好喝嗎？<br/>快點擊下方按鈕記錄你的第一杯完美比例！</p>
            <button onClick={startAdd} className="empty-state-button">
                <PlusCircle />
                開始記錄
            </button>
        </div>
      );
  } else if (activeTab === 'all') {
      content = (
          <div className="history-list">
             <div className="history-section-header">
                <h2 className="history-section-title">最近紀錄</h2>
                <span className="history-section-count">{sortedRecords.length} 杯飲料</span>
             </div>
            {sortedRecords.map(record => (
              <HistoryItem key={record.id} record={record} onEdit={startEdit} />
            ))}
          </div>
      );
  } else if (activeTab === 'brand') {
      // Group by Brand
      const grouped = sortedRecords.reduce((acc, record) => {
          if (!acc[record.brandName]) acc[record.brandName] = [];
          acc[record.brandName].push(record);
          return acc;
      }, {} as Record<string, DrinkRecord[]>);
      
      const brands = Object.keys(grouped).sort();

      content = (
          <div className="brand-groups">
              {brands.map(brand => (
                  <div key={brand}>
                      <h3 className="brand-group-title">
                          {brand} 
                          <span>({grouped[brand].length})</span>
                      </h3>
                      {grouped[brand].map(record => (
                          <HistoryItem key={record.id} record={record} onEdit={startEdit} />
                      ))}
                  </div>
              ))}
          </div>
      );
  } else if (activeTab === 'favorites') {
      const favorites = sortedRecords.filter(r => r.rating >= 4);
       content = (
          <div className="history-list">
             <div className="history-section-header">
                <h2 className="history-section-title">高分推薦 (4★以上)</h2>
                <span className="history-section-count">{favorites.length} 杯飲料</span>
             </div>
            {favorites.length > 0 ? favorites.map(record => (
              <HistoryItem key={record.id} record={record} onEdit={startEdit} />
            )) : (
                <div style={{ textAlign: 'center', color: 'var(--color-gray-400)', padding: '2.5rem 0' }}>
                    <p>還沒有高分評價的飲料</p>
                </div>
            )}
          </div>
      );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-title">
           <div className="app-icon">
             <Coffee />
           </div>
           <div className="app-title-text">
                <h1>Tea Note</h1>
                <span>您的手搖飲筆記</span>
           </div>
        </div>
        
        {records.length > 0 && (
            <div className="nav-tabs">
                <button 
                    onClick={() => setActiveTab('all')}
                    className={`nav-tab ${activeTab === 'all' ? 'active' : ''}`}
                >
                    <LayoutGrid />
                    全部
                </button>
                <button 
                    onClick={() => setActiveTab('brand')}
                    className={`nav-tab ${activeTab === 'brand' ? 'active' : ''}`}
                >
                    <Layers />
                    分類
                </button>
                <button 
                    onClick={() => setActiveTab('favorites')}
                    className={`nav-tab ${activeTab === 'favorites' ? 'active' : ''}`}
                >
                    <Star />
                    高分
                </button>
            </div>
        )}
      </header>

      <main className="main-content no-scrollbar">
        {content}
      </main>

      {records.length > 0 && (
        <button onClick={startAdd} className="fab">
            <PlusCircle />
        </button>
      )}
    </div>
  );
};

export default App;