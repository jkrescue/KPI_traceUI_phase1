// 全局 Mock 数据管理 - 折叠方向盘系统

export interface CADVersion {
  version: string;
  date: string;
  author: string;
  source: string;
  changes: string;
  status: 'current' | 'archived';
}

// CAD 部件信息
export interface CADComponent {
  id: string;
  name: string;
  mass: number; // kg
  centerOfMass: { x: number; y: number; z: number }; // mm
  inertia: { Ixx: number; Iyy: number; Izz: number }; // kg·mm²
  material: string;
}

// 电机参数
export interface MotorParameter {
  id: string;
  name: string;
  type: 'rotation' | 'translation'; // 转动或平动
  maxSpeed: number; // rpm (转动) 或 mm/s (平动)
  stroke: number; // 行程：度数(转动) 或 mm(平动)
  currentSpeed: number;
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
    changes: '优化前舱质量：0.90kg → 0.85kg，降低50g',
    status: 'current',
  },
  {
    version: 'v2.3.0',
    date: '2024-12-20',
    author: '李工',
    source: 'UG',
    changes: '增强滑轨机构刚度，调整材质为钢+尼龙',
    status: 'archived',
  },
  {
    version: 'v2.2.5',
    date: '2024-12-15',
    author: '王工',
    source: 'TC',
    changes: '调整俯仰机构安装位，优化管柱重心分布',
    status: 'archived',
  },
  {
    version: 'v2.2.0',
    date: '2024-12-01',
    author: '张工',
    source: 'TC',
    changes: '完成8个核心部件初始建模（手轮、管柱、俯仰机构、滑轨机构、前舱、盖板、滑盖、桌板）',
    status: 'archived',
  },
];

// CAD 部件数据（8个部件）
export const mockCADComponents: CADComponent[] = [
  {
    id: '1',
    name: '前舱',
    mass: 0.85,
    centerOfMass: { x: 120.5, y: 0, z: 85.3 },
    inertia: { Ixx: 1250, Iyy: 1380, Izz: 980 },
    material: 'ABS+PC',
  },
  {
    id: '2',
    name: '方向盘盖板',
    mass: 0.32,
    centerOfMass: { x: 15.2, y: 0, z: 42.1 },
    inertia: { Ixx: 420, Iyy: 385, Izz: 315 },
    material: '皮革+ABS',
  },
  {
    id: '3',
    name: '滑盖',
    mass: 0.28,
    centerOfMass: { x: 95.3, y: 0, z: 12.8 },
    inertia: { Ixx: 380, Iyy: 410, Izz: 290 },
    material: 'PC',
  },
  {
    id: '4',
    name: '小桌板',
    mass: 0.45,
    centerOfMass: { x: 180.2, y: 0, z: 55.6 },
    inertia: { Ixx: 650, Iyy: 720, Izz: 580 },
    material: 'ABS',
  },
  {
    id: '5',
    name: '手轮',
    mass: 1.25,
    centerOfMass: { x: 0, y: 0, z: 0 },
    inertia: { Ixx: 2850, Iyy: 2850, Izz: 5200 },
    material: '铝合金+皮革',
  },
  {
    id: '6',
    name: '管柱',
    mass: 2.15,
    centerOfMass: { x: 0, y: 0, z: -285.4 },
    inertia: { Ixx: 18500, Iyy: 18500, Izz: 1250 },
    material: '钢管',
  },
  {
    id: '7',
    name: '俯仰机构',
    mass: 0.68,
    centerOfMass: { x: 25.3, y: 0, z: -120.5 },
    inertia: { Ixx: 1150, Iyy: 980, Izz: 850 },
    material: '铝合金',
  },
  {
    id: '8',
    name: '滑轨机构',
    mass: 0.92,
    centerOfMass: { x: 0, y: 0, z: -350.2 },
    inertia: { Ixx: 1680, Iyy: 1720, Izz: 420 },
    material: '钢+尼龙',
  },
];

// 4个电机参数
export const mockMotorParameters: MotorParameter[] = [
  {
    id: 'motor1',
    name: '手轮转动电机',
    type: 'rotation',
    maxSpeed: 8000, // rpm
    stroke: 90, // 度
    currentSpeed: 7500,
  },
  {
    id: 'motor2',
    name: '俯仰转动电机',
    type: 'rotation',
    maxSpeed: 8000, // rpm
    stroke: 90, // 度
    currentSpeed: 7800,
  },
  {
    id: 'motor3',
    name: '滑轨平动电机',
    type: 'translation',
    maxSpeed: 8000, // rpm（通过减速机构转化为平动）
    stroke: 200, // mm
    currentSpeed: 7600,
  },
  {
    id: 'motor4',
    name: '备用电机',
    type: 'translation',
    maxSpeed: 8000, // rpm
    stroke: 200, // mm
    currentSpeed: 0, // 未使用
  },
];

// 参数配置（基于电机和部件）
export const mockParameters: Parameter[] = [
  {
    id: '1',
    name: '电机1-手轮转动极限转速',
    category: '电机参数',
    target: 8000,
    unit: 'rpm',
    tolerance: { upper: 200, lower: -200 },
    current: 7500,
  },
  {
    id: '2',
    name: '电机2-俯仰转动极限转速',
    category: '电机参数',
    target: 8000,
    unit: 'rpm',
    tolerance: { upper: 200, lower: -200 },
    current: 7800,
  },
  {
    id: '3',
    name: '电机3-滑轨平动极限转速',
    category: '电机参数',
    target: 8000,
    unit: 'rpm',
    tolerance: { upper: 200, lower: -200 },
    current: 7600,
  },
  {
    id: '4',
    name: '电机4-备用极限转速',
    category: '电机参数',
    target: 8000,
    unit: 'rpm',
    tolerance: { upper: 200, lower: -200 },
    current: 0,
  },
  {
    id: '5',
    name: '手轮转动行程',
    category: '行程参数',
    target: 90,
    unit: '°',
    tolerance: { upper: 2, lower: -2 },
    current: 90,
  },
  {
    id: '6',
    name: '俯仰转动行程',
    category: '行程参数',
    target: 90,
    unit: '°',
    tolerance: { upper: 2, lower: -2 },
    current: 90,
  },
  {
    id: '7',
    name: '滑轨平动行程',
    category: '行程参数',
    target: 200,
    unit: 'mm',
    tolerance: { upper: 5, lower: -5 },
    current: 200,
  },
  {
    id: '8',
    name: '系统总质量',
    category: '质量参数',
    target: 6.9,
    unit: 'kg',
    tolerance: { upper: 0.3, lower: -0.2 },
    current: 6.9,
  },
];

// KPI 配置（简化为折叠时间）
export const mockKPIs: KPI[] = [
  {
    id: '1',
    name: '折叠总时间',
    category: '性能指标',
    target: '≤8',
    unit: 's',
    priority: 'high',
    source: 'imported',
  },
];

// 仿真结果
export const mockSimulationResults: SimulationResult[] = [
  {
    kpiName: '折叠总时间',
    target: '≤8s',
    actual: '7.2s',
    status: 'pass',
    gap: '-',
    priority: 'high',
  },
];

// 4个电机的时序数据（0-10s，实际折叠时间7.2s）
// 使用阶跃数据格式表示电机启停状态和速度
export const mockMotor1Timeline = [
  { time: 0, value: 0, speed: 0 },
  { time: 0, value: 0, speed: 7500 },  // 启动
  { time: 0.5, value: 20, speed: 7500 },
  { time: 1.0, value: 40, speed: 7500 },
  { time: 1.5, value: 60, speed: 7500 },
  { time: 2.0, value: 75, speed: 7500 },
  { time: 2.5, value: 85, speed: 7500 },
  { time: 3.0, value: 90, speed: 7500 },
  { time: 3.0, value: 90, speed: 0 },  // 停止
  { time: 10, value: 90, speed: 0 },
];

export const mockMotor2Timeline = [
  { time: 0, value: 0, speed: 0 },
  { time: 1.5, value: 0, speed: 0 },
  { time: 1.5, value: 0, speed: 7800 },  // 启动
  { time: 2.0, value: 18, speed: 7800 },
  { time: 2.5, value: 35, speed: 7800 },
  { time: 3.0, value: 52, speed: 7800 },
  { time: 3.5, value: 68, speed: 7800 },
  { time: 4.0, value: 82, speed: 7800 },
  { time: 4.5, value: 90, speed: 7800 },
  { time: 4.5, value: 90, speed: 0 },  // 停止
  { time: 10, value: 90, speed: 0 },
];

export const mockMotor3Timeline = [
  { time: 0, value: 0, speed: 0 },
  { time: 2.0, value: 0, speed: 0 },
  { time: 2.0, value: 0, speed: 7600 },  // 启动
  { time: 2.5, value: 25, speed: 7600 },
  { time: 3.0, value: 50, speed: 7600 },
  { time: 3.5, value: 75, speed: 7600 },
  { time: 4.0, value: 100, speed: 7600 },
  { time: 4.5, value: 125, speed: 7600 },
  { time: 5.0, value: 150, speed: 7600 },
  { time: 5.5, value: 175, speed: 7600 },
  { time: 6.0, value: 195, speed: 7600 },
  { time: 6.5, value: 200, speed: 7600 },
  { time: 6.5, value: 200, speed: 0 },  // 停止
  { time: 7.2, value: 200, speed: 0 },
  { time: 10, value: 200, speed: 0 },
];

export const mockMotor4Timeline = [
  { time: 0, value: 0, speed: 0 },
  { time: 5.0, value: 0, speed: 0 },
  { time: 5.0, value: 0, speed: 6500 },  // 启动
  { time: 5.5, value: 40, speed: 6500 },
  { time: 6.0, value: 80, speed: 6500 },
  { time: 6.5, value: 120, speed: 6500 },
  { time: 7.0, value: 150, speed: 6500 },
  { time: 7.2, value: 160, speed: 6500 },
  { time: 7.2, value: 160, speed: 0 },  // 停止
  { time: 10, value: 160, speed: 0 },
];

// 优化建议（基于折叠时间）
export const mockSuggestions = [
  {
    id: 1,
    title: '优化电机1启动时序',
    impact: 'medium' as const,
    description: '将手轮转动电机启动时间提前0.2s',
    expectedImprovement: '折叠时间减少约 0.3s',
    relatedKPI: '折叠总时间',
    tradeoff: '需要验证与其他机构的干涉',
  },
  {
    id: 2,
    title: '提升电机3运动速度',
    impact: 'high' as const,
    description: '将滑轨平动电机速度提升10%',
    expectedImprovement: '折叠时间减少约 0.5s',
    relatedKPI: '折叠总时间',
    tradeoff: '需要验证结构强度和噪音影响',
  },
  {
    id: 3,
    title: '优化电机2和电机3时序重叠',
    impact: 'high' as const,
    description: '让俯仰和滑轨动作部分并行执行',
    expectedImprovement: '折叠时间减少约 0.8s',
    relatedKPI: '折叠总时间',
    tradeoff: '需要进行运动学干涉分析',
  },
  {
    id: 4,
    title: '减轻部件质量',
    impact: 'medium' as const,
    description: '优化前舱和小桌板设计，减重100g',
    expectedImprovement: '折叠时间减少约 0.2s',
    relatedKPI: '折叠总时间',
    tradeoff: '需要重新进行结构强度验证',
  },
];

// 仿真历史记录
export interface SimulationHistory {
  id: string;
  timestamp: string;
  cadVersion: string;
  foldingTime: string;
  status: 'pass' | 'fail';
  motorConfig: {
    motor1Speed: number;
    motor2Speed: number;
    motor3Speed: number;
    motor4Speed: number;
  };
  notes?: string;
}

export const mockSimulationHistory: SimulationHistory[] = [
  {
    id: 'sim-001',
    timestamp: '2024-12-28 14:30:25',
    cadVersion: 'v2.3.1',
    foldingTime: '7.2s',
    status: 'pass',
    motorConfig: {
      motor1Speed: 7500,
      motor2Speed: 7800,
      motor3Speed: 7600,
      motor4Speed: 6500,
    },
    notes: '当前最优配置',
  },
  {
    id: 'sim-002',
    timestamp: '2024-12-28 10:15:42',
    cadVersion: 'v2.3.0',
    foldingTime: '7.8s',
    status: 'pass',
    motorConfig: {
      motor1Speed: 7200,
      motor2Speed: 7500,
      motor3Speed: 7300,
      motor4Speed: 6000,
    },
  },
  {
    id: 'sim-003',
    timestamp: '2024-12-27 16:20:18',
    cadVersion: 'v2.2.5',
    foldingTime: '8.5s',
    status: 'fail',
    motorConfig: {
      motor1Speed: 7000,
      motor2Speed: 7200,
      motor3Speed: 7000,
      motor4Speed: 0,
    },
    notes: '未达标，需优化电机3速度',
  },
];