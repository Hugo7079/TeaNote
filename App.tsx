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
        <div className="flex flex-col items-center justify-center h-[70vh] text-center text-gray-400 space-y-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <BookOpen className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-lg font-medium text-gray-600">還沒有喝飲料的紀錄</p>
            <p className="text-sm max-w-xs">忘記上次喝什麼最好喝嗎？<br/>快點擊下方按鈕記錄你的第一杯完美比例！</p>
            <button 
                onClick={startAdd}
                className="mt-6 bg-tea-600 text-white px-6 py-3 rounded-full shadow-lg shadow-tea-200 font-bold flex items-center animate-bounce"
            >
                <PlusCircle className="w-5 h-5 mr-2" />
                開始記錄
            </button>
        </div>
      );
  } else if (activeTab === 'all') {
      content = (
          <div className="pb-24">
             <div className="flex justify-between items-end mb-4 px-1">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">最近紀錄</h2>
                <span className="text-xs text-gray-400">{sortedRecords.length} 杯飲料</span>
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
          <div className="pb-24 space-y-6">
              {brands.map(brand => (
                  <div key={brand}>
                      <h3 className="text-md font-bold text-gray-800 mb-3 px-1 sticky top-0 bg-gray-50/95 backdrop-blur py-2 z-10 flex items-center">
                          <span className="w-2 h-2 rounded-full bg-tea-500 mr-2"></span>
                          {brand} 
                          <span className="ml-2 text-xs font-normal text-gray-400">({grouped[brand].length})</span>
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
          <div className="pb-24">
             <div className="flex justify-between items-end mb-4 px-1">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">高分推薦 (4★以上)</h2>
                <span className="text-xs text-gray-400">{favorites.length} 杯飲料</span>
             </div>
            {favorites.length > 0 ? favorites.map(record => (
              <HistoryItem key={record.id} record={record} onEdit={startEdit} />
            )) : (
                <div className="text-center text-gray-400 py-10">
                    <p>還沒有高分評價的飲料</p>
                </div>
            )}
          </div>
      );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-white sticky top-0 z-20 shadow-sm px-4 pt-4 pb-2">
        <div className="flex items-center gap-2 mb-4">
           <div className="bg-tea-500 text-white p-2 rounded-xl shadow-tea-200 shadow-md">
             <Coffee className="w-6 h-6" />
           </div>
           <div>
                <h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-none">Tea Note</h1>
                <span className="text-tea-600 text-xs font-medium tracking-widest">您的手搖飲筆記</span>
           </div>
        </div>
        
        {/* Navigation Tabs */}
        {records.length > 0 && (
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
                <button 
                    onClick={() => setActiveTab('all')}
                    className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'all' ? 'bg-white text-tea-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <LayoutGrid className="w-4 h-4 mr-1.5" />
                    全部
                </button>
                <button 
                    onClick={() => setActiveTab('brand')}
                    className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'brand' ? 'bg-white text-tea-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Layers className="w-4 h-4 mr-1.5" />
                    分類
                </button>
                <button 
                    onClick={() => setActiveTab('favorites')}
                    className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'favorites' ? 'bg-white text-tea-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Star className="w-4 h-4 mr-1.5" />
                    高分
                </button>
            </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 no-scrollbar">
        {content}
      </main>

      {/* Floating Action Button */}
      {records.length > 0 && (
        <button
            onClick={startAdd}
            className="absolute bottom-6 right-6 w-14 h-14 bg-tea-600 text-white rounded-full shadow-lg shadow-tea-300 flex items-center justify-center hover:scale-105 transition-transform active:scale-95 focus:outline-none z-30"
        >
            <PlusCircle className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default App;