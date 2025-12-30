// 全局 Mock 数据管理
export interface CADVersion {
  version: string;
  date: string;
  author: string;
  source: string;
  changes: string;
  status: 'current' | 'archived';
}

export interface Parameter {
  id: string;
  name: string;
  category: string;
  target: number;
  unit: string;
  tolerance: {
    upper: number;
    lower: number;
  };
  current?: number;
}

export interface KPI {
  id: string;
  name: string;
  category: string;
  target: string;
  unit: string;
  priority: 'high' | 'medium' | 'low';
  source: 'imported' | 'custom';
}

export interface SimulationResult {
  kpiName: string;
  target: string;
  actual: string;
  status: 'pass' | 'fail';
  gap: string;
  priority: 'high' | 'medium' | 'low';
}

// CAD 版本历史
export const mockCADVersions: CADVersion[] = [
  {
    version: 'v2.3.1',
    date: '2024-12-28',
    author: '张工',
    source: 'TC',
    changes: '优化折叠臂连接处厚度，降低质量约50g',
    status: 'current',
  },
  {
    version: 'v2.3.0',
    date: '2024-12-20',
    author: '李工',
    source: 'UG',
    changes: '增加加强筋，提升结构强度',
    status: 'archived',
  },
  {
    version: 'v2.2.5',
    date: '2024-12-15',
    author: '王工',
    source: 'TC',
    changes: '调整电机安装位置，优化重心分布',
    status: 'archived',
  },
  {
    version: 'v2.2.0',
    date: '2024-12-01',
    author: '张工',
    source: 'TC',
    changes: '初始设计版本',
    status: 'archived',
  },
];

// 参数配置
export const mockParameters: Parameter[] = [
  {
    id: '1',
    name: '电机额定功率',
    category: '电机参数',
    target: 150,
    unit: 'W',
    tolerance: { upper: 10, lower: -5 },
    current: 150,
  },
  {
    id: '2',
    name: '电机峰值扭矩',
    category: '电机参数',
    target: 50,
    unit: 'Nm',
    tolerance: { upper: 5, lower: -3 },
    current: 52,
  },
  {
    id: '3',
    name: '轴承摩擦系数',
    category: '轴承参数',
    target: 0.002,
    unit: '',
    tolerance: { upper: 0.0005, lower: -0.0003 },
    current: 0.0022,
  },
  {
    id: '4',
    name: '系统总质量',
    category: '质量参数',
    target: 2.5,
    unit: 'kg',
    tolerance: { upper: 0.2, lower: -0.1 },
    current: 2.35,
  },
  {
    id: '5',
    name: '齿轮传动比',
    category: '传动参数',
    target: 80,
    unit: '',
    tolerance: { upper: 5, lower: -5 },
    current: 80,
  },
  {
    id: '6',
    name: '传动效率',
    category: '传动参数',
    target: 0.85,
    unit: '',
    tolerance: { upper: 0.05, lower: -0.02 },
    current: 0.87,
  },
];

// KPI 配置
export const mockKPIs: KPI[] = [
  {
    id: '1',
    name: '折叠时间',
    category: '性能指标',
    target: '≤2.5',
    unit: 's',
    priority: 'high',
    source: 'imported',
  },
  {
    id: '2',
    name: '峰值功耗',
    category: '功耗指标',
    target: '≤250',
    unit: 'W',
    priority: 'high',
    source: 'imported',
  },
  {
    id: '3',
    name: '平顺性 (Jerk)',
    category: '性能指标',
    target: '≤100',
    unit: 'mm/s³',
    priority: 'medium',
    source: 'custom',
  },
  {
    id: '4',
    name: '噪音水平',
    category: '舒适性指标',
    target: '≤65',
    unit: 'dB',
    priority: 'medium',
    source: 'custom',
  },
  {
    id: '5',
    name: '折叠行程精度',
    category: '精度指标',
    target: '±2',
    unit: 'mm',
    priority: 'high',
    source: 'imported',
  },
];

// 仿真结果（基于 KPI 生成）
export const mockSimulationResults: SimulationResult[] = [
  {
    kpiName: '折叠时间',
    target: '≤2.5s',
    actual: '3.1s',
    status: 'fail',
    gap: '+0.6s',
    priority: 'high',
  },
  {
    kpiName: '峰值功耗',
    target: '≤250W',
    actual: '280W',
    status: 'fail',
    gap: '+30W',
    priority: 'high',
  },
  {
    kpiName: '平顺性 (Jerk)',
    target: '≤100 mm/s³',
    actual: '85 mm/s³',
    status: 'pass',
    gap: '-',
    priority: 'medium',
  },
  {
    kpiName: '噪音水平',
    target: '≤65dB',
    actual: '62dB',
    status: 'pass',
    gap: '-',
    priority: 'medium',
  },
  {
    kpiName: '折叠行程精度',
    target: '±2mm',
    actual: '±1.5mm',
    status: 'pass',
    gap: '-',
    priority: 'high',
  },
];

// 时间序列数据
export const mockTimeSeriesData = [
  { time: 0, position: 0, velocity: 0, power: 0 },
  { time: 0.5, position: 15, velocity: 45, power: 120 },
  { time: 1.0, position: 35, velocity: 58, power: 180 },
  { time: 1.5, position: 58, velocity: 62, power: 220 },
  { time: 2.0, position: 78, velocity: 55, power: 280 },
  { time: 2.5, position: 92, velocity: 38, power: 240 },
  { time: 3.0, position: 98, velocity: 15, power: 150 },
  { time: 3.1, position: 100, velocity: 0, power: 0 },
];

// 相关性分析数据
export const mockCorrelationData = [
  { parameter: '电机功率', correlation: 0.85, impact: 'high' },
  { parameter: '系统质量', correlation: -0.72, impact: 'high' },
  { parameter: '传动效率', correlation: 0.68, impact: 'medium' },
  { parameter: '轴承摩擦', correlation: -0.45, impact: 'medium' },
  { parameter: '传动比', correlation: 0.32, impact: 'low' },
];

// 优化建议
export const mockSuggestions = [
  {
    id: 1,
    title: '提升电机功率',
    impact: 'high' as const,
    description: '将电机功率从 150W 提升到 180W',
    expectedImprovement: '折叠时间减少约 0.5s',
    relatedKPI: '折叠时间',
    tradeoff: '峰值功耗增加约 35W',
  },
  {
    id: 2,
    title: '降低结构质量',
    impact: 'high' as const,
    description: '优化折叠臂设计，减轻质量约 100g',
    expectedImprovement: '折叠时间减少约 0.3s',
    relatedKPI: '折叠时间',
    tradeoff: '需要重新进行结构强度验证',
  },
  {
    id: 3,
    title: '优化传动部件',
    impact: 'medium' as const,
    description: '采用低摩擦轴承，提升传动效率至 0.90',
    expectedImprovement: '折叠时间减少约 0.2s，功耗降低 15W',
    relatedKPI: '折叠时间、峰值功耗',
    tradeoff: '成本增加约 ¥50/套',
  },
  {
    id: 4,
    title: '调整控制策略',
    impact: 'medium' as const,
    description: '优化加速度曲线，提高初始阶段速度',
    expectedImprovement: '折叠时间减少约 0.15s',
    relatedKPI: '折叠时间',
    tradeoff: '可能略微影响平顺性',
  },
];
