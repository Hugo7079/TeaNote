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
    <div className="flex flex-col h-full">
        {/* Search Bar for Brands */}
        <div className="px-4 py-2 sticky top-0 bg-gray-50 z-10">
            <div className="relative">
                <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="搜尋飲料店品牌..."
                    className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-tea-500 outline-none shadow-sm text-sm"
                />
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                {search && (
                    <button 
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 overflow-y-auto pb-20">
            {/* Custom Brand Button - Always visible or at least when no exact match? Let's keep it first or last. */}
            {/* Let's put it as the first option if search is empty or implies "other" */}
            <button
                onClick={() => onSelect({ id: 'custom', name: '其他品牌', color: '#9CA3AF', popularItems: [] })}
                className="flex flex-col items-center justify-center aspect-square rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all active:scale-95 text-gray-500"
            >
                <Plus className="w-8 h-8 mb-1" />
                <span className="text-xs font-medium">自訂品牌</span>
            </button>

            {filteredBrands.map((brand) => (
                <button
                key={brand.id}
                onClick={() => onSelect(brand)}
                className="flex flex-col items-center justify-center aspect-square rounded-2xl bg-white shadow-sm border border-gray-100 hover:border-tea-500 transition-all active:scale-95"
                >
                <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold mb-2 shadow-sm border border-white/20"
                    style={{ backgroundColor: brand.color }}
                >
                    {brand.name.substring(0, 1)}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center px-1 truncate w-full">
                    {brand.name}
                </span>
                </button>
            ))}

            {filteredBrands.length === 0 && (
                <div className="col-span-3 text-center py-8 text-gray-400 text-sm">
                    找不到「{search}」<br/>請使用左上角「自訂品牌」自行輸入
                </div>
            )}
        </div>
    </div>
  );
};

export default BrandList;