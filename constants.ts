import { Brand, SugarLevel, IceLevel, Size } from './types';

// Default Fallbacks
export const SUGAR_OPTIONS = Object.values(SugarLevel);
export const ICE_OPTIONS = Object.values(IceLevel);
export const SIZE_OPTIONS = Object.values(Size);
export const COMMON_TOPPINGS = [
  '珍珠', '椰果', '仙草凍', '布丁', '蘆薈', '紅豆', '寒天', '芋圓', '愛玉', '燕麥', '茶凍', '粉粿', '奶蓋'
];

export const POPULAR_BRANDS: Brand[] = [
  // --- 老牌經典 / 國民飲料 ---
  {
    id: '50lan',
    name: '50嵐',
    color: '#F4D03F',
    customSizes: [Size.MEDIUM, Size.LARGE],
    customToppings: ['波霸', '珍珠', '椰果', '仙草', '燕麥', '布丁', '冰淇淋'],
    popularItems: [
      '茉莉綠茶', '阿薩姆紅茶', '四季春青茶', '黃金烏龍',
      '波霸奶茶', '波霸奶綠', '珍珠奶茶', '珍珠奶綠', '椰果奶茶', '1號(四季春+珍波椰)', 
      '奶茶', '紅茶拿鐵', '阿華田', '可可芭蕾',
      '檸檬綠', '檸檬紅', '梅子綠', '8冰綠', '旺來紅', '鮮柚綠'
    ]
  },
  {
    id: 'kqtea',
    name: '康青龍',
    color: '#117A65',
    customToppings: ['雙色芋圓', '珍珠', '椰果', '仙草', '寒天', '愛玉', '小芋圓'],
    popularItems: [
        '格雷冰茶', '百香總匯冰茶', '青檸綠茶', '粉紅佳人', '桑葚香檸', '紫晶莓果飲', '蘋果冰茶', 
        '沁心金萱', '青龍茶王', '御香烏龍綠茶', 
        '黑白珍珠奶茶', '茉莉奶綠芋圓', '鐵觀音奶茶', '金萱奶茶', '大甲芋頭鮮奶茶'
    ]
  },
  {
    id: 'chingshin',
    name: '清心福全',
    color: '#2ECC71',
    customSizes: [Size.MEDIUM, Size.LARGE],
    customToppings: ['珍珠', '椰果', '仙草凍', '暗黑水晶(咖啡凍)', '布丁', '蘆薈', '冰淇淋'],
    popularItems: [
      '特級綠茶', '錫蘭紅茶', '烏龍綠茶', '極品菁茶',
      '珍珠鮮奶茶', '鮮奶冬瓜', 
      '優多綠茶', '隱藏版(珍珠蜂蜜鮮奶普洱)', '梅子綠茶', '蜂蜜檸檬', '冬瓜檸檬', '蘆薈優多綠茶'
    ]
  },
  {
    id: 'coco',
    name: 'CoCo都可',
    color: '#E67E22',
    customSizes: [Size.MEDIUM, Size.LARGE],
    customToppings: ['珍珠', '布丁', '椰果', '西谷米', '蜜香凍', 'Q', '芋圓'],
    popularItems: [
      '百香雙響炮', '珍珠奶茶', '奶茶三兄弟', '星空葡萄', '莓果戀人', '檸檬霸', '鮮芋奶茶', '鹿兒島烤奶', '蕎麥冬瓜露', '蜜香檸凍紅', '綠茶多多'
    ]
  },
  {
    id: 'comebuy',
    name: 'COMEBUY',
    color: '#C0392B',
    customToppings: ['珍珠', '椰果', '荔枝凍', '雙Q(珍+椰)', '寒天晶球', '蘆薈', '粉條'],
    popularItems: [
      '海神', '蘋果冰茶', '絕代雙Q奶茶', '百香搖果樂', '玫瑰花茶', '玉荷冰綠', '玩火', '小葉紅茶', '烏瓦紅茶拿鐵', '港式厚奶', '金芒珍穀'
    ]
  },

  // --- 鮮果 / 鮮奶 / 高價位區 ---
  {
    id: 'macu',
    name: '麻古茶坊',
    color: '#E74C3C',
    customSizes: [Size.LARGE, Size.BOTTLE],
    customToppings: ['波霸', '珍珠', '椰果', '布丁', '寒天', '芝芝(奶蓋)', '綠茶凍'],
    popularItems: [
      '芝芝葡萄果粒', '芝芝芒果果粒', '芝芝草莓果粒', '楊枝甘露2.0', '柳橙果粒茶', '香橙果粒茶', '葡萄柚果粒茶', '奇威果粒茶', '番茄梅蜜',
      '高山金萱茶', '金萱雙Q', '波霸紅茶拿鐵', '搖滾波波奶茶'
    ]
  },
  {
    id: 'milksha',
    name: '迷客夏',
    color: '#27AE60',
    customToppings: ['珍珠', '布丁', '仙草', '芋圓', '燕麥'],
    popularItems: [
      '大甲芋頭鮮奶', '珍珠紅茶拿鐵', '黑糖珍珠鮮奶', '法柯紅拿鐵', '娜杯紅茶拿鐵', '伯爵紅茶拿鐵', '茉香綠茶拿鐵',
      '青檸香茶', '冰糖洛神梅', '柳丁綠茶', '焙香決明大麥'
    ]
  },
  {
    id: 'truedan',
    name: '珍煮丹',
    color: '#17202A',
    customToppings: ['黑糖珍珠', '仙草', '布丁', '芋圓', '粉粿'],
    customSizes: [Size.MEDIUM, Size.LARGE],
    popularItems: [
      '黑糖珍珠鮮奶', '泰泰鮮奶茶', '十份芋芋鮮奶', '黑糖檸檬冬瓜', '姍姍紅茶拿鐵', '不知春', '蜂蜜菊花茶', '老派紅豆粉粿鮮奶'
    ]
  },
  {
    id: 'dayungs',
    name: '大苑子',
    color: '#229954',
    customSizes: [Size.LARGE, Size.BOTTLE],
    customToppings: ['蘆薈', '愛玉', '珍珠'],
    popularItems: [
      '台灣鮮搾柳橙綠', '芭樂檸檬', '愛文芒果冰沙', '愛文翡翠', '繽紛水果茶', '柚美粒', '蔓越莓冰醋', '奇異果冰鑽', '百年蜜仙草'
    ]
  },
  {
    id: 'yifang',
    name: '一芳水果茶',
    color: '#F5B041',
    customSizes: [Size.MEDIUM, Size.LARGE],
    customToppings: ['粉圓', '愛玉', '仙草', '粉粿'],
    popularItems: [
      '一芳水果茶', '粉圓鮮奶茶', '黑糖粉圓鮮奶', '甘蔗青茶', '信義脆梅綠', '金鑽鳳梨綠', '埔里百香綠', '中華愛玉檸檬'
    ]
  },
  {
    id: 'wanpo',
    name: '萬波島嶼紅茶',
    color: '#922B21',
    customSizes: [Size.MEDIUM, Size.LARGE],
    customToppings: ['波霸', '珍珠', '小芋圓', '愛玉', '仙草', '粉粿'],
    popularItems: [
      '紅豆粉粿鮮奶', '蘭葉那堤', '金牌愛玉檸檬', '黑糖珍珠鮮奶', '島嶼紅茶', '埔里甘蔗青', '鳴光蜜金桔', '大青梅果綠'
    ]
  },

  // --- 文青 / 單品茶 / 排隊名店 ---
  {
    id: 'kebuke',
    name: '可不可熟成紅茶',
    color: '#145A32',
    customSizes: [Size.MEDIUM, Size.LARGE],
    customToppings: ['白玉', '水玉', '菓玉'],
    popularItems: [
      '熟成紅茶', '鴉片紅茶', '春芽冷露', '春梅冰茶', '白玉歐蕾', '熟成檸果', '胭脂紅茶', '雪藏紅茶', '太妃紅茶', '熟成歐蕾', '冷露歐蕾'
    ]
  },
  {
    id: 'hachiyo',
    name: '八曜和茶',
    color: '#8BC34A',
    customSizes: [Size.LARGE],
    customToppings: ['白玉珍珠', '蜂巢(蜂蜜凍)', '307甜粉粿'],
    popularItems: [
      '柚香覺醒307', '83蜂見茶', '307研發烏龍', '究極308', '炙燒濃乳308', '和風307', '寧夏307', '京彩夕燒奶茶', '牧場307'
    ]
  },
  {
    id: 'ugtea',
    name: 'UG',
    color: '#00FF00',
    customSizes: [Size.LARGE],
    customToppings: ['珍珠', '茶凍', '燕麥'], // Updated guess
    popularItems: [
      '三窨十五茉', '米香烏龍奶茶', '桂花輕烏龍', '白桃烏龍', 'UG奶茶', '康普茶'
    ]
  },
  {
    id: 'oolong',
    name: '得正',
    color: '#3498DB',
    customSizes: [Size.MEDIUM, Size.LARGE],
    customToppings: ['焙烏龍茶凍', '黃金珍珠', '芝士奶蓋'],
    popularItems: [
      '檸檬春烏龍', '芝士奶蓋春烏龍', '焙烏龍鮮奶', '春烏龍', '輕烏龍', '甘蔗春烏龍', '優酪春烏龍', '烘吉奶茶'
    ]
  },
  {
    id: 'johntea',
    name: '約翰紅茶公司',
    color: '#1F618D',
    customSizes: [Size.MEDIUM, Size.LARGE],
    customToppings: ['白珍珠'],
    popularItems: [
      '煮濃那堤', '雨果那堤', '生乳紅茶', '曼非斯紅茶', '茶中香檳', '玉釀紅茶', '灼香紅茶', '夢幻紅茶'
    ]
  },
  {
    id: 'annice',
    name: '一沐日',
    color: '#28B463',
    customSizes: [Size.LARGE],
    customToppings: ['粉粿', '珍珠', '草仔粿', '奶酪', '豆花'],
    popularItems: [
      '逮丸奶茶', '粉粿黑糖檸檬', '油切蕎麥茶', '招牌紅', '粉粿奶茶', '荔枝烏龍', '桂花檸檬'
    ]
  },
  {
    id: 'soma',
    name: 'SOMA',
    color: '#7B241C',
    customSizes: [Size.MEDIUM],
    customToppings: ['珍珠'], // SOMA usually simple
    popularItems: [
      '原味茶歐蕾', '茶歐蕾三分糖', '非洲可可歐蕾', '芒果高山菁茶', '京都抹茶歐蕾', 'SOMA菁茶'
    ]
  },
  {
    id: 'guigui',
    name: '龜記茗品',
    color: '#1B4F72',
    customSizes: [Size.LARGE],
    customToppings: ['珍珠', '椰果', '蘆薈', '粉圓'],
    popularItems: [
      '紅柚翡翠', '蘋果紅萱', '三十三茶王', '紅水烏龍', '香柚雷夢綠', '秀水旺梨春', '楊桃紅茶', '冬瓜鮮乳'
    ]
  },
  {
    id: 'wus',
    name: '五桐號',
    color: '#D35400',
    customSizes: [Size.MEDIUM, Size.LARGE],
    customToppings: ['綠茶凍', '杏仁凍', '米漿凍', '仙草凍', '珍珠', '奶霜'],
    popularItems: [
      '五桐茶', '杏仁凍五桐茶', '綠茶凍五桐茶拿鐵', '老實人紅茶', '招牌五桐奶霜', '最完美手沖泰奶', '一把青茶', '清香烏龍'
    ]
  },
  {
    id: 'hwuz',
    name: '鶴茶樓',
    color: '#17202A',
    customSizes: [Size.MEDIUM, Size.LARGE],
    customToppings: ['鶴頂凍', '波霸', '胚芽', '蘆薈', '杏仁凍'],
    popularItems: [
        '鶴頂紅茶', '綺夢紅茶', '舶來紅茶', '鶴頂那堤', '綺夢那堤', '復刻奶茶', '藝伎紅茶', '桂花烏龍'
    ]
  },
   {
    id: 'naptea',
    name: '再睡五分鐘',
    color: '#F1C40F',
    customSizes: [Size.MEDIUM, Size.LARGE],
    customToppings: ['珍珠', '芋圓', '仙草', '奶蓋'],
    popularItems: [
      '棉被午茉綠', '日安紅珍珠歐蕾', '全糖女神', '棉被日安紅', '香芋啵啵', '棉被四季金萱', '黑糖珍珠好龘'
    ]
  },
  {
    id: 'itsotea',
    name: '一手私藏',
    color: '#5D4037',
    customSizes: [Size.LARGE],
    customToppings: ['珍珠', '寒天', '茶凍'],
    popularItems: [
        '台灣魚池18號紅玉', '私藏仲夏夜', '俄羅斯夏卡爾紅茶', '伯爵茶', '蜜斯茶拿鐵', '林檎紅茶'
    ]
  },
  {
    id: 'shangyulin',
    name: '上宇林',
    color: '#1B2631',
    customSizes: [Size.LARGE],
    customToppings: ['手工粉角', '珍珠', '仙草', '椰果', '布丁', '梅子'],
    popularItems: [
        '紅龍奶茶', '鼎極濃奶茶', '手工粉角奶茶', '太極鮮奶茶', '鐵觀音鮮奶茶', '東方美人', '美人鮮奶茶'
    ]
  },

  // --- 南部/其他特色 ---
  {
    id: 'laolai',
    name: '老賴茶棧',
    color: '#E74C3C',
    customSizes: [Size.LARGE, Size.BOTTLE],
    customToppings: ['珍珠', '椰果', '胚芽'],
    popularItems: [
        '老賴紅茶', '豆香紅茶', '招牌奶茶', '青草紅茶', '太后牛乳', '豆漿'
    ]
  },
  {
    id: 'tea_demon',
    name: '茶之魔手',
    color: '#7D3C98',
    customSizes: [Size.LARGE],
    customToppings: ['波霸', '珍珠', '椰果', '藍莓凍', '粉條', '仙草', '咖啡凍'],
    popularItems: [
        '山楂烏龍', '藍莓凍奶茶', '青梅綠', '台灣綠茶', '波霸奶茶', '伯爵紅茶'
    ]
  },
  {
    id: 'tptea',
    name: '茶湯會',
    color: '#4A235A',
    customSizes: [Size.MEDIUM],
    customToppings: ['珍珠', '波霸', '燕麥', '蘆薈', '愛玉', '小芋圓'],
    popularItems: [
      '觀音拿鐵', '翡翠檸檬', '蔗香紅茶', '鐵觀音', '珍珠奶茶', '黃金烏龍拿鐵', '豆漿紅茶'
    ]
  },
  {
    id: 'tenren',
    name: '天仁茗茶',
    color: '#196F3D',
    customSizes: [Size.MEDIUM, Size.LARGE],
    customToppings: ['珍珠', '蘆薈', '茶凍', '燕麥'],
    popularItems: [
      '913茶王', '913鮮奶茶', '珍珠鮮奶茶', '香芋鮮奶綠', '洛神冰茶', '蜂蜜綠茶'
    ]
  },
  {
    id: 'mrwish',
    name: 'Mr.Wish',
    color: '#F39C12',
    customSizes: [Size.LARGE, Size.BOTTLE],
    customToppings: ['白珍珠', '椰果', '蘆薈', '愛玉'],
    popularItems: [
        '光果茶', '鮮粒百香綠', '香蘋紅茶', '蜜桃甘露', '野莓纖果子'
    ]
  },
  {
    id: 'chingyuan',
    name: '清原芋圓',
    color: '#8E44AD',
    customSizes: [Size.MEDIUM, Size.LARGE],
    customToppings: ['芋圓', '仙草凍', '珍珠', '西米露', '紅豆', '綠豆', '芋頭'],
    popularItems: [
      '芋見泥珍好', '雙芋冰嫩仙草凍', '紫芋波波沙', '四季春', '熟成紅茶', '芋頭鮮奶露', '岩漿珍珠鮮奶'
    ]
  },
  {
    id: 'uno',
    name: '烏弄',
    color: '#212F3C',
    customSizes: [Size.LARGE, Size.BOTTLE],
    customToppings: ['杏仁凍', '桂花凍', '珍珠', '小粉圓'],
    popularItems: [
      '名間鄉冬片仔', '金萱烏龍', '旺萊水果茶', '杏仁凍冬片', '桑葚鮮奶'
    ]
  },
  {
    id: 'gongcha',
    name: '貢茶',
    color: '#A93226',
    customSizes: [Size.MEDIUM, Size.LARGE],
    customToppings: ['珍珠', '仙草凍', '椰果', '愛玉', '羅勒子', '寒天', '布丁', '紅豆', '奶蓋'],
    popularItems: [
      '奶蓋綠茶', '珍珠奶茶', '芒果冰沙', '黑糖烏龍'
    ]
  },
  {
    id: 'huada',
    name: '樺達奶茶',
    color: '#000000',
    customSizes: [Size.MEDIUM],
    customToppings: ['珍珠'], // Mostly fixed sugar/ice, simple toppings
    popularItems: [
      '樺達奶茶', '美容奶茶', '益壽奶茶', '普洱奶茶', '紅龍奶茶'
    ]
  },
  {
    id: 'chunshuitang',
    name: '春水堂',
    color: '#212F3D',
    customSizes: [Size.MEDIUM], // Usually "Small" (glass) or "Medium" (pot), mapping to M/L is tricky, sticking to defaults or M.
    customToppings: ['珍珠', '紅豆', '愛玉'],
    popularItems: [
      '珍珠奶茶', '胚芽奶茶', '頂級烏龍', '翡翠檸檬'
    ]
  },
  {
    id: 'presotea',
    name: '鮮茶道',
    color: '#2ECC71',
    customSizes: [Size.LARGE],
    customToppings: ['熊貓珍珠', '寒天', '椰果', '仙草', '布丁'],
    popularItems: [
      '阿里山冰茶', '熊貓珍珠奶茶', '墾丁冰茶', '藍莓果茶', '皇家伯爵紅茶'
    ]
  },
  {
    id: 'tigersugar',
    name: '老虎堂',
    color: '#17202A',
    customSizes: [Size.MEDIUM],
    customToppings: ['波霸', '珍珠'],
    popularItems: [
      '黑糖波霸厚鮮奶', '虎虎生風厚鮮奶', '黑糖精選紅茶拿鐵'
    ]
  },
  {
    id: 'xingfutang',
    name: '幸福堂',
    color: '#935116',
    customSizes: [Size.MEDIUM],
    customToppings: ['黑糖珍珠', '麒麟'],
    popularItems: [
      '焰遇幸福黑糖珍珠鮮奶', '水仙桂花烏龍', '芒著蹦蹦跳'
    ]
  },
  {
    id: 'yuan',
    name: '圓石禪飲',
    color: '#566573',
    customSizes: [Size.LARGE, Size.BOTTLE], // Famous for XL/Bottle
    customToppings: ['粉圓', '黃金粉圓'],
    popularItems: [
      '復刻紅茶', '冷泉玉露', '格雷伯爵', '龍涎冷烏', '麥茶'
    ]
  },
  {
    id: 'sipship',
    name: '緒緒',
    color: '#2980B9',
    customSizes: [Size.LARGE],
    customToppings: ['珍珠', '寒天'],
    popularItems: [
        '緒緒紅茶', '緒緒綠茶', '金萱烏龍', '蜜桃烏龍', '檸檬紅茶', '檸檬綠茶', '波霸奶茶', '珍珠奶茶'
    ]
  },
  {
    id: 'jiate',
    name: '呷茶',
    color: '#A569BD',
    customSizes: [Size.LARGE],
    customToppings: ['珍珠', '小芋圓'],
    popularItems: [
        '熟成紅茶', '小時候紅茶', '黑糖珍珠鮮奶', '冬瓜檸檬'
    ]
  },
  {
    id: 'whitealley',
    name: '白巷子',
    color: '#FDFEFE',
    customSizes: [Size.LARGE],
    customToppings: ['波霸', '珍珠', '椰果', '芝士奶蓋', '芋泥'],
    popularItems: [
        '滿杯水果茶', '芝士奶蓋紅茶', '波霸奶茶', '芋泥鮮奶', '靜岡抹茶拿鐵', '冬瓜檸檬'
    ]
  }
];
