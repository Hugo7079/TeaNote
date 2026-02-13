import React, { useState } from 'react';
import { Brand } from '../types';
import { POPULAR_BRANDS } from '../constants';
import { Plus, Search, X } from 'lucide-react';

interface BrandListProps {
  onSelect: (brand: Brand) => void;
}

const BrandList: React.FC<BrandListProps> = ({ onSelect }) => {
  const [search, setSearch] = useState('');

  const filteredBrands = POPULAR_BRANDS.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="brand-list-container">
        <div className="brand-search-bar">
            <div className="brand-search-wrapper">
                <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="搜尋飲料店品牌..."
                    className="brand-search-input"
                />
                <Search className="brand-search-icon" />
                {search && (
                    <button 
                    onClick={() => setSearch('')}
                    className="brand-search-clear"
                    >
                        <X />
                    </button>
                )}
            </div>
        </div>

        <div className="brand-grid">
            <button
                onClick={() => onSelect({ id: 'custom', name: '其他品牌', color: '#9CA3AF', popularItems: [] })}
                className="brand-card brand-card-custom"
            >
                <Plus />
                <span className="brand-card-name">自訂品牌</span>
            </button>

            {filteredBrands.map((brand) => (
                <button
                key={brand.id}
                onClick={() => onSelect(brand)}
                className="brand-card"
                >
                <div 
                    className="brand-card-icon"
                    style={{ backgroundColor: brand.color }}
                >
                    {brand.name.substring(0, 1)}
                </div>
                <span className="brand-card-name">
                    {brand.name}
                </span>
                </button>
            ))}

            {filteredBrands.length === 0 && (
                <div className="brand-grid-empty">
                    找不到「{search}」<br/>請使用左上角「自訂品牌」自行輸入
                </div>
            )}
        </div>
    </div>
  );
};

export default BrandList;