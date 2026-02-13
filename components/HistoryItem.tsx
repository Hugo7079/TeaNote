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
  
  const displaySize = record.size ? record.size.split('(')[0] : '大杯';

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
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
    <div className="history-item">
      <div className="history-item-content">
        <div className="history-item-header">
          <div>
            <span className="history-item-brand">
              {record.brandName}
            </span>
            <h3 className="history-item-name">{record.drinkName}</h3>
          </div>
          <div className="history-item-rating">
            <span>{record.rating}</span>
            <Star />
          </div>
        </div>

        <div className="history-item-tags">
          <div className="history-item-tag">
            <CupSoda className="icon-size" />
            {displaySize}
          </div>
          <div className="history-item-tag">
            <Droplets className="icon-sugar" />
            {record.sugar}
          </div>
          <div className="history-item-tag">
            <Snowflake className="icon-ice" />
            {record.ice}
          </div>
          {record.toppings.length > 0 && (
             <div className="history-item-tag">
             <span>🟣</span>
             {record.toppings.join(', ')}
           </div>
          )}
        </div>

        {record.note && (
          <p className="history-item-note">
            "{record.note}"
          </p>
        )}

        <div className="history-item-footer">
          <div className="history-item-date">
            <Calendar />
            {dateStr}
          </div>
          
          <div className="history-item-actions">
            <button 
              onClick={handleShare}
              className={copied ? 'btn btn-success' : 'btn btn-secondary'}
            >
              {copied ? <Check /> : <Share2 />}
              {copied ? '已複製' : '分享'}
            </button>
            <button 
              onClick={() => onEdit(record)}
              className="btn btn-tea"
            >
              <Edit2 />
              修改
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;