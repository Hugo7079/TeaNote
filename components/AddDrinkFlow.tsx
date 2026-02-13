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
  
  const [filterQuery, setFilterQuery] = useState('');
  const [isSearchingAI, setIsSearchingAI] = useState(false);
  const [aiSearchResults, setAiSearchResults] = useState<string[]>([]);

  useEffect(() => {
    if (initialRecord) {
      setBrand({ 
        id: initialRecord.brandId, 
        name: initialRecord.brandName, 
        color: '#ccc', 
        popularItems: [],
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

  const availableToppings = brand?.customToppings || COMMON_TOPPINGS;
  const availableSizes = brand?.customSizes || SIZE_OPTIONS;

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

  if (step === 'brand') {
    return (
      <div className="app-container">
        <div className="flow-header">
          <Button variant="ghost" size="sm" onClick={onCancel}>取消</Button>
          <h2 className="flow-header-title">選擇品牌</h2>
          <div style={{ width: '2.5rem' }} /> 
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <BrandList onSelect={handleBrandSelect} />
        </div>
      </div>
    );
  }

  if (step === 'drink') {
    const popularList = brand?.popularItems || [];
    const localFiltered = popularList.filter(item => 
        item.toLowerCase().includes(filterQuery.toLowerCase())
    );
    const combinedList = Array.from(new Set([...localFiltered, ...aiSearchResults]));

    return (
      <div className="app-container">
        <div className="flow-header">
          <Button variant="ghost" size="sm" onClick={() => setStep('brand')}>
            <ChevronLeft />
            重選
          </Button>
          <h2 className="flow-header-title">{brand?.name}</h2>
          <div style={{ width: '4rem', display: 'flex', justifyContent: 'flex-end' }}>
               <button 
                onClick={handleOpenMenuImage}
                className="menu-link-button"
                title="查看官方菜單圖片"
               >
                   <ExternalLink />
               </button>
          </div>
        </div>

        <div className="flow-content">
            <div className="drink-search-sticky">
                <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                    <input 
                        type="text" 
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        placeholder="搜尋或輸入飲料名稱..."
                        className="drink-search-input"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAiSearch();
                        }}
                    />
                    <Search style={{ position: 'absolute', left: '0.75rem', top: '0.875rem', width: '1.25rem', height: '1.25rem', color: 'var(--color-gray-400)' }} />
                    {filterQuery && (
                         <button 
                            onClick={() => {
                                setFilterQuery('');
                                setAiSearchResults([]);
                            }}
                            style={{ position: 'absolute', right: '0.75rem', top: '0.875rem', color: 'var(--color-gray-400)', background: 'none', border: 'none', cursor: 'pointer' }}
                         >
                             <X style={{ width: '1.25rem', height: '1.25rem' }} />
                         </button>
                    )}
                </div>
                {filterQuery && localFiltered.length === 0 && (
                   <button
                    onClick={handleAiSearch}
                    disabled={isSearchingAI}
                    className="drink-ai-button"
                   >
                       {isSearchingAI ? (
                           <Loader2 className="spin" />
                       ) : (
                           <Sparkles />
                       )}
                       {isSearchingAI ? 'AI 正在搜尋菜單...' : `找不到？用 AI 幫你找「${filterQuery}」`}
                   </button>
                )}
            </div>

            {filterQuery && (
                 <button
                    onClick={() => handleDrinkSelect(filterQuery)}
                    className="drink-custom-button"
                 >
                    <span>直接使用："{filterQuery}"</span>
                    <ChevronLeft style={{ transform: 'rotate(180deg)' }} />
                 </button>
            )}

            {combinedList.length > 0 ? (
                <div>
                    <h3 className="drink-list-title">
                        {aiSearchResults.length > 0 ? 'AI 搜尋結果 & 菜單' : '店家菜單'}
                    </h3>
                    <div className="drink-list">
                    {combinedList.map(item => (
                        <button
                            key={item}
                            onClick={() => handleDrinkSelect(item)}
                            className="drink-item"
                        >
                            {item}
                        </button>
                    ))}
                    </div>
                </div>
            ) : (
                <div className="drink-list-empty">
                    <p>找不到相關飲料</p>
                    <p>
                        點擊右上角 <ExternalLink /> 可查看線上菜單圖片
                    </p>
                </div>
            )}
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
       <div className="flow-header">
          <Button variant="ghost" size="sm" onClick={() => setStep('drink')}>
            <ChevronLeft />
            重選
          </Button>
          <div className="flow-header-subtitle">
            <div className="flow-header-subtitle-small">{brand?.name}</div>
            <h2 className="flow-header-subtitle-large">{drinkName}</h2>
          </div>
          <div className="flow-header-spacer" />
        </div>

        <div className="flow-content">
            
            <section className="customize-section">
                <h3 className="customize-section-title title-size">
                    容量 Size
                </h3>
                <div className={`option-grid ${availableSizes.length <= 2 ? 'option-grid-2' : 'option-grid-3'}`}>
                    {availableSizes.map(opt => (
                        <button
                            key={opt}
                            onClick={() => setSize(opt)}
                            className={`option-button ${size === opt ? 'active size' : ''}`}
                        >
                            {opt.split('(')[0]}
                            <span className="option-button-small">({opt.split('(')[1]}</span>
                        </button>
                    ))}
                </div>
            </section>

            <section className="customize-section">
                <h3 className="customize-section-title title-sugar">
                    甜度 Sugar
                </h3>
                <div className="option-grid option-grid-3">
                    {SUGAR_OPTIONS.map(opt => (
                        <button
                            key={opt}
                            onClick={() => setSugar(opt)}
                            className={`option-button ${sugar === opt ? 'active sugar' : ''}`}
                        >
                            {opt.split(' ')[0]} 
                            <span className="option-button-small">{opt.split(' ')[1]}</span>
                        </button>
                    ))}
                </div>
            </section>

            <section className="customize-section">
                <h3 className="customize-section-title title-ice">
                    冰塊 Ice
                </h3>
                <div className="option-grid option-grid-4">
                    {ICE_OPTIONS.map(opt => (
                        <button
                            key={opt}
                            onClick={() => setIce(opt)}
                            className={`option-button ${ice === opt ? 'active ice' : ''}`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </section>

            <section className="customize-section">
                 <h3 className="customize-section-title title-toppings">
                    加料 Toppings
                </h3>
                <div className="toppings-flex">
                    {availableToppings.map(t => (
                        <button
                            key={t}
                            onClick={() => toggleTopping(t)}
                            className={`topping-button ${selectedToppings.includes(t) ? 'active' : ''}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </section>

            <section className="customize-section">
                 <h3 className="customize-section-title title-rating">
                    評分 Rating
                 </h3>
                 <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map(r => (
                        <button 
                            key={r} 
                            onClick={() => setRating(r)} 
                            className={`star-button ${r <= rating ? 'filled' : ''}`}
                        >
                            <svg viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                        </button>
                    ))}
                 </div>
            </section>

            <section className="customize-section">
                <h3 className="customize-section-title title-note">
                    備註 Note
                </h3>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="這家珍珠偏硬，建議..."
                    className="note-textarea"
                />
            </section>
        </div>

        <div className="flow-footer">
            <Button onClick={handleSave} fullWidth size="lg">
                {initialRecord ? '更新紀錄' : '加入紀錄'}
            </Button>
        </div>
    </div>
  );
};

export default AddDrinkFlow;