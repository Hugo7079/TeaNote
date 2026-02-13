import React, { useState, useEffect } from 'react';
import { Brand, DrinkRecord, IceLevel, SugarLevel, Size } from '../types';
import { SUGAR_OPTIONS, ICE_OPTIONS, SIZE_OPTIONS, COMMON_TOPPINGS } from '../constants';
import BrandList from './BrandList';
import Button from './Button';
import { ChevronLeft, X, Search, ExternalLink, Sparkles, Loader2 } from 'lucide-react';
import { searchDrinkMenu } from '../services/geminiService';

interface AddDrinkFlowProps {
  initialRecord?: DrinkRecord;
  onSave: (record: Omit<DrinkRecord, 'id' | 'date'> & { id?: string, date?: number }) => void;
  onCancel: () => void;
}

type Step = 'brand' | 'drink' | 'customize';

const AddDrinkFlow: React.FC<AddDrinkFlowProps> = ({ initialRecord, onSave, onCancel }) => {
  const [step, setStep] = useState<Step>(initialRecord ? 'customize' : 'brand');
  const [brand, setBrand] = useState<Brand | null>(null);
  const [drinkName, setDrinkName] = useState('');
  const [size, setSize] = useState<Size>(Size.LARGE);
  const [sugar, setSugar] = useState<SugarLevel>(SugarLevel.HALF);
  const [ice, setIce] = useState<IceLevel>(IceLevel.LESS);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [rating, setRating] = useState(5);
  const [note, setNote] = useState('');
  
  // Local filter and AI search state
  const [filterQuery, setFilterQuery] = useState('');
  const [isSearchingAI, setIsSearchingAI] = useState(false);
  const [aiSearchResults, setAiSearchResults] = useState<string[]>([]);

  useEffect(() => {
    if (initialRecord) {
      // Reconstruct the brand object or find it in list if possible, but minimal object is fine for now
      setBrand({ 
        id: initialRecord.brandId, 
        name: initialRecord.brandName, 
        color: '#ccc', 
        popularItems: [],
        // In a real app we might want to look up the full brand details to get custom toppings/sizes
        // for editing old records. For now, we rely on what was selected or defaults.
        // We will try to find it in POPULAR_BRANDS to restore custom menus if available.
      });
      setDrinkName(initialRecord.drinkName);
      setSize(initialRecord.size || Size.LARGE);
      setSugar(initialRecord.sugar);
      setIce(initialRecord.ice);
      setSelectedToppings(initialRecord.toppings);
      setRating(initialRecord.rating);
      setNote(initialRecord.note);
    }
  }, [initialRecord]);

  // When brand changes (or on init), determine available options
  const availableToppings = brand?.customToppings || COMMON_TOPPINGS;
  const availableSizes = brand?.customSizes || SIZE_OPTIONS;

  // Auto-select the first available size if the current size is invalid for this brand
  useEffect(() => {
    if (brand && availableSizes.length > 0 && !availableSizes.includes(size)) {
        setSize(availableSizes[0]);
    }
  }, [brand, availableSizes]);


  const handleBrandSelect = (selectedBrand: Brand) => {
    setBrand(selectedBrand);
    setFilterQuery('');
    setAiSearchResults([]);
    setStep('drink');
  };

  const handleDrinkSelect = (name: string) => {
    setDrinkName(name);
    setStep('customize');
  };

  const handleOpenMenuImage = () => {
    if (!brand) return;
    const query = encodeURIComponent(`${brand.name} 菜單 2025`);
    window.open(`https://www.google.com/search?q=${query}&tbm=isch`, '_blank');
  };

  const handleAiSearch = async () => {
    if (!brand) return;
    setIsSearchingAI(true);
    const results = await searchDrinkMenu(brand.name, filterQuery);
    setAiSearchResults(results);
    setIsSearchingAI(false);
  };

  const toggleTopping = (t: string) => {
    if (selectedToppings.includes(t)) {
      setSelectedToppings(prev => prev.filter(x => x !== t));
    } else {
      setSelectedToppings(prev => [...prev, t]);
    }
  };

  const handleSave = () => {
    if (!brand || !drinkName) return;
    onSave({
      id: initialRecord?.id,
      brandId: brand.id,
      brandName: brand.id === 'custom' && initialRecord ? initialRecord.brandName : brand.name,
      drinkName,
      size,
      sugar,
      ice,
      toppings: selectedToppings,
      rating,
      note,
      date: initialRecord?.date
    });
  };

  // --- Step 1: Select Brand ---
  if (step === 'brand') {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="bg-white px-4 py-4 shadow-sm flex items-center justify-between sticky top-0 z-10 border-b border-gray-100">
          <Button variant="ghost" size="sm" onClick={onCancel}>取消</Button>
          <h2 className="text-lg font-bold text-gray-800">選擇品牌</h2>
          <div className="w-10" /> 
        </div>
        <div className="flex-1 overflow-y-auto">
          <BrandList onSelect={handleBrandSelect} />
        </div>
      </div>
    );
  }

  // --- Step 2: Select Drink ---
  if (step === 'drink') {
    const popularList = brand?.popularItems || [];
    const localFiltered = popularList.filter(item => 
        item.toLowerCase().includes(filterQuery.toLowerCase())
    );
    const combinedList = Array.from(new Set([...localFiltered, ...aiSearchResults]));

    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="bg-white px-4 py-4 shadow-sm flex items-center justify-between sticky top-0 z-10 border-b border-gray-100">
          <Button variant="ghost" size="sm" onClick={() => setStep('brand')}>
            <ChevronLeft className="w-5 h-5 mr-1" />
            重選
          </Button>
          <h2 className="text-lg font-bold text-gray-800">{brand?.name}</h2>
          <div className="w-16 flex justify-end">
               <button 
                onClick={handleOpenMenuImage}
                className="text-tea-600 p-2 hover:bg-tea-50 rounded-full"
                title="查看官方菜單圖片"
               >
                   <ExternalLink className="w-5 h-5" />
               </button>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto pb-24">
            <div className="sticky top-0 bg-gray-50 z-10 pb-2">
                <div className="relative mb-2">
                    <input 
                        type="text" 
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        placeholder="搜尋或輸入飲料名稱..."
                        className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-tea-500 outline-none shadow-sm"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAiSearch();
                        }}
                    />
                    <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    {filterQuery && (
                         <button 
                            onClick={() => {
                                setFilterQuery('');
                                setAiSearchResults([]);
                            }}
                            className="absolute right-3 top-3.5 text-gray-400"
                         >
                             <X className="w-5 h-5" />
                         </button>
                    )}
                </div>
                {filterQuery && localFiltered.length === 0 && (
                   <button
                    onClick={handleAiSearch}
                    disabled={isSearchingAI}
                    className="w-full mb-2 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-medium flex items-center justify-center border border-indigo-100 hover:bg-indigo-100 transition-colors"
                   >
                       {isSearchingAI ? (
                           <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                       ) : (
                           <Sparkles className="w-4 h-4 mr-2" />
                       )}
                       {isSearchingAI ? 'AI 正在搜尋菜單...' : `找不到？用 AI 幫你找「${filterQuery}」`}
                   </button>
                )}
            </div>

            {filterQuery && (
                 <button
                    onClick={() => handleDrinkSelect(filterQuery)}
                    className="w-full text-left px-4 py-4 mb-4 bg-tea-50 text-tea-700 rounded-xl font-bold shadow-sm border border-tea-100 flex items-center justify-between group"
                 >
                    <span>直接使用："{filterQuery}"</span>
                    <ChevronLeft className="w-5 h-5 rotate-180 transition-transform group-hover:translate-x-1" />
                 </button>
            )}

            {combinedList.length > 0 ? (
                <div>
                    <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                        {aiSearchResults.length > 0 ? 'AI 搜尋結果 & 菜單' : '店家菜單'}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                    {combinedList.map(item => (
                        <button
                            key={item}
                            onClick={() => handleDrinkSelect(item)}
                            className="text-left px-4 py-3 bg-white rounded-xl font-medium shadow-sm border border-gray-100 hover:border-tea-400 hover:text-tea-700 active:bg-gray-50 transition-all"
                        >
                            {item}
                        </button>
                    ))}
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-400 py-10 px-4">
                    <p className="mb-4">找不到相關飲料</p>
                    <p className="text-xs text-gray-500">
                        點擊右上角 <ExternalLink className="w-3 h-3 inline align-middle"/> 可查看線上菜單圖片
                    </p>
                </div>
            )}
        </div>
      </div>
    );
  }

  // --- Step 3: Customize ---
  return (
    <div className="flex flex-col h-full bg-gray-50">
       <div className="bg-white px-4 py-4 shadow-sm flex items-center justify-between sticky top-0 z-10 border-b border-gray-100">
          <Button variant="ghost" size="sm" onClick={() => setStep('drink')}>
            <ChevronLeft className="w-5 h-5 mr-1" />
            重選
          </Button>
          <div className="text-center">
            <div className="text-xs text-gray-500">{brand?.name}</div>
            <h2 className="text-lg font-bold text-gray-800">{drinkName}</h2>
          </div>
          <div className="w-16" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-32">
            
            <section className="mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider flex items-center">
                    <span className="w-1 h-4 bg-blue-500 rounded-full mr-2"></span>
                    容量 Size
                </h3>
                <div className={`grid gap-2 ${availableSizes.length <= 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                    {availableSizes.map(opt => (
                        <button
                            key={opt}
                            onClick={() => setSize(opt)}
                            className={`py-3 px-1 text-sm rounded-lg border transition-all ${
                                size === opt 
                                ? 'bg-blue-500 text-white border-blue-600 shadow-md transform scale-[1.02]' 
                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                            }`}
                        >
                            {opt.split('(')[0]}
                            <span className="text-[10px] ml-1 opacity-80">({opt.split('(')[1]}</span>
                        </button>
                    ))}
                </div>
            </section>

            <section className="mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider flex items-center">
                    <span className="w-1 h-4 bg-tea-500 rounded-full mr-2"></span>
                    甜度 Sugar
                </h3>
                <div className="grid grid-cols-3 gap-2">
                    {SUGAR_OPTIONS.map(opt => (
                        <button
                            key={opt}
                            onClick={() => setSugar(opt)}
                            className={`py-2 px-1 text-sm rounded-lg border transition-all ${
                                sugar === opt 
                                ? 'bg-tea-500 text-white border-tea-600 shadow-md transform scale-[1.02]' 
                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                            }`}
                        >
                            {opt.split(' ')[0]} 
                            <span className="block text-[10px] opacity-80">{opt.split(' ')[1]}</span>
                        </button>
                    ))}
                </div>
            </section>

            <section className="mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider flex items-center">
                    <span className="w-1 h-4 bg-cyan-500 rounded-full mr-2"></span>
                    冰塊 Ice
                </h3>
                <div className="grid grid-cols-4 gap-2">
                    {ICE_OPTIONS.map(opt => (
                        <button
                            key={opt}
                            onClick={() => setIce(opt)}
                            className={`py-2 px-1 text-sm rounded-lg border transition-all ${
                                ice === opt 
                                ? 'bg-cyan-500 text-white border-cyan-600 shadow-md transform scale-[1.02]' 
                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                            }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </section>

            <section className="mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                 <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider flex items-center">
                    <span className="w-1 h-4 bg-orange-500 rounded-full mr-2"></span>
                    加料 Toppings
                </h3>
                <div className="flex flex-wrap gap-2">
                    {availableToppings.map(t => (
                        <button
                            key={t}
                            onClick={() => toggleTopping(t)}
                            className={`py-1.5 px-3 text-sm rounded-full border transition-all ${
                                selectedToppings.includes(t)
                                ? 'bg-orange-500 text-white border-orange-600 shadow-sm'
                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </section>

            <section className="mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                 <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider flex items-center">
                    <span className="w-1 h-4 bg-yellow-400 rounded-full mr-2"></span>
                    評分 Rating
                 </h3>
                 <div className="flex justify-center">
                    {[1, 2, 3, 4, 5].map(r => (
                        <button key={r} onClick={() => setRating(r)} className="p-2 focus:outline-none transition-transform active:scale-125">
                            <svg 
                                className={`w-8 h-8 ${r <= rating ? 'text-yellow-400 fill-current' : 'text-gray-200 fill-current'}`} 
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                        </button>
                    ))}
                 </div>
            </section>

            <section className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider flex items-center">
                    <span className="w-1 h-4 bg-gray-400 rounded-full mr-2"></span>
                    備註 Note
                </h3>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="這家珍珠偏硬，建議..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-tea-500 outline-none resize-none h-24"
                />
            </section>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <Button onClick={handleSave} fullWidth size="lg" className="shadow-lg shadow-tea-200">
                {initialRecord ? '更新紀錄' : '加入紀錄'}
            </Button>
        </div>
    </div>
  );
};

export default AddDrinkFlow;