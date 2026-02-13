import React, { useState } from 'react';
import { DrinkRecord, Size } from '../types';
import { Star, Calendar, Droplets, Snowflake, Edit2, Share2, Check, CupSoda } from 'lucide-react';

interface HistoryItemProps {
  record: DrinkRecord;
  onEdit: (record: DrinkRecord) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ record, onEdit }) => {
  const [copied, setCopied] = useState(false);
  const dateStr = new Date(record.date).toLocaleDateString('zh-TW', { month: 'short', day: 'numeric' });
  
  // Backwards compatibility for records without size
  const displaySize = record.size ? record.size.split('(')[0] : '大杯';

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Format for messaging (LINE style friendly)
    const text = `🧋 茶記推薦\n` +
      `【${record.brandName}】${record.drinkName}\n` +
      `------------------\n` +
      `📏 容量：${displaySize}\n` +
      `🍬 甜度：${record.sugar}\n` +
      `🧊 冰塊：${record.ice}\n` +
      `${record.toppings.length > 0 ? `🟣 加料：${record.toppings.join(', ')}\n` : ''}` +
      `⭐ 評分：${'★'.repeat(record.rating)}${'☆'.repeat(5-record.rating)}\n` +
      `${record.note ? `📝 備註：${record.note}\n` : ''}` +
      `------------------\n` +
      `#茶記 #手搖飲筆記`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: '我的手搖飲筆記',
          text: text,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3 relative overflow-hidden group">
       {/* Accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tea-500" />
      
      <div className="pl-3">
        <div className="flex justify-between items-start mb-1">
          <div>
            <span className="text-xs font-semibold text-tea-600 bg-tea-50 px-2 py-0.5 rounded-full">
              {record.brandName}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-1">{record.drinkName}</h3>
          </div>
          <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
            <span className="text-sm font-bold text-yellow-600">{record.rating}</span>
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 my-3">
          <div className="flex items-center text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
            <CupSoda className="w-3 h-3 mr-1 text-blue-500" />
            {displaySize}
          </div>
          <div className="flex items-center text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
            <Droplets className="w-3 h-3 mr-1 text-pink-500" />
            {record.sugar}
          </div>
          <div className="flex items-center text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
            <Snowflake className="w-3 h-3 mr-1 text-cyan-500" />
            {record.ice}
          </div>
          {record.toppings.length > 0 && (
             <div className="flex items-center text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
             <span className="mr-1 text-orange-500">🟣</span>
             {record.toppings.join(', ')}
           </div>
          )}
        </div>

        {record.note && (
          <p className="text-sm text-gray-500 italic mb-2 bg-gray-50 p-2 rounded-lg">
            "{record.note}"
          </p>
        )}

        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
          <div className="flex items-center text-xs text-gray-400">
            <Calendar className="w-3 h-3 mr-1" />
            {dateStr}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleShare}
              className={`text-sm font-medium flex items-center px-3 py-1.5 rounded-lg transition-colors border ${copied ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
            >
              {copied ? <Check className="w-3 h-3 mr-1" /> : <Share2 className="w-3 h-3 mr-1" />}
              {copied ? '已複製' : '分享'}
            </button>
            <button 
              onClick={() => onEdit(record)}
              className="text-tea-600 bg-tea-50 border border-tea-100 text-sm font-medium flex items-center hover:bg-tea-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Edit2 className="w-3 h-3 mr-1" />
              修改
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;