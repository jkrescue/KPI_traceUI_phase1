import { useState } from 'react';
import { CheckCircle, XCircle, Lightbulb, Download, BarChart3, History, Trash2, GitBranch, X, RotateCcw } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart
} from 'recharts';
import { 
  mockSimulationResults, 
  mockMotor1Timeline, 
  mockMotor2Timeline, 
  mockMotor3Timeline, 
  mockMotor4Timeline,
  mockSuggestions,
  SimulationHistory
} from '../../store/mockData';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  Handle,
  Position,
  NodeProps,
  BackgroundVariant,
  OnNodesChange,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface ResultAnalysisProps {
  simulationHistory?: SimulationHistory[];
}

export function ResultAnalysis({ simulationHistory = [] }: ResultAnalysisProps) {
  const [selectedMotor, setSelectedMotor] = useState<number | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showTraceability, setShowTraceability] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const kpiResults = mockSimulationResults;
  const suggestions = mockSuggestions;

  const motorTimelines = [
    { id: 1, name: '电机1 - 手轮转动', data: mockMotor1Timeline, unit: '°', color: '#3b82f6', maxValue: 90, maxSpeed: 8000 },
    { id: 2, name: '电机2 - 俯仰转动', data: mockMotor2Timeline, unit: '°', color: '#8b5cf6', maxValue: 90, maxSpeed: 8000 },
    { id: 3, name: '电机3 - 滑轨平动', data: mockMotor3Timeline, unit: 'mm', color: '#10b981', maxValue: 200, maxSpeed: 8000 },
    { id: 4, name: '电机4 - 备用', data: mockMotor4Timeline, unit: 'mm', color: '#6b7280', maxValue: 200, maxSpeed: 8000 },
  ];

  const result = kpiResults[0];

  // 定义追溯图的初始节点位置 (从左到右布局)
  const initialNodes: Node[] = [
    // 第一列：KPI层 - 折叠时间指标
    {
      id: 'kpi-foldingTime',
      type: 'custom',
      position: { x: 50, y: 300 },
      data: { 
        label: '折叠时间',
        value: '7.2s',
        target: '≤8s',
        status: 'achieved',
        category: 'kpi'
      },
    },
    // 第二列：参数层 - 8个部件
    {
      id: 'param-qiancang',
      type: 'custom',
      position: { x: 350, y: 20 },
      data: { label: '前舱', description: '质量: 0.85kg\\n惯性矩 Ixx: 1180 kg·mm²', category: 'param' },
    },
    {
      id: 'param-cover',
      type: 'custom',
      position: { x: 350, y: 100 },
      data: { label: '方向盘盖板', description: '质量: 0.48kg\\n厚度: 2.5mm', category: 'param' },
    },
    {
      id: 'param-slide',
      type: 'custom',
      position: { x: 350, y: 180 },
      data: { label: '滑盖', description: '质量: 0.62kg\\n加强筋优化', category: 'param' },
    },
    {
      id: 'param-table',
      type: 'custom',
      position: { x: 350, y: 260 },
      data: { label: '小桌板', description: '质量: 0.32kg\\n材质: PC+ABS', category: 'param' },
    },
    {
      id: 'param-handwheel',
      type: 'custom',
      position: { x: 350, y: 340 },
      data: { label: '手轮', description: '质量: 1.18kg\\n转动范围: 90°', category: 'param' },
    },
    {
      id: 'param-column',
      type: 'custom',
      position: { x: 350, y: 420 },
      data: { label: '管柱', description: '质量: 3.25kg\\nIyy: 8650 kg·mm²', category: 'param' },
    },
    {
      id: 'param-pitch',
      type: 'custom',
      position: { x: 350, y: 500 },
      data: { label: '俯仰机构', description: '质量: 1.45kg\\n转动范围: 90°', category: 'param' },
    },
    {
      id: 'param-rail',
      type: 'custom',
      position: { x: 350, y: 580 },
      data: { label: '滑轨机构', description: '质量: 2.15kg\\n行程: 200mm', category: 'param' },
    },
    // 第三列：CAD模型层
    {
      id: 'model-cad',
      type: 'custom',
      position: { x: 650, y: 300 },
      data: { label: 'CAD模型', description: 'TC v2.3.1\\n数模来源', category: 'model' },
    },
    // 第四列：Modelica仿真层
    {
      id: 'model-modelica',
      type: 'custom',
      position: { x: 950, y: 300 },
      data: { label: 'Modelica仿真', description: 'Monte Carlo\\n1000次仿真', category: 'model' },
    },
  ];

  // 节点状态管理
  const [nodes, setNodes] = useState<Node[]>(initialNodes);

  // 定义追溯图的边
  const baseEdges: Edge[] = [
    // KPI -> 参数层
    { id: 'e1', source: 'kpi-foldingTime', target: 'param-qiancang' },
    { id: 'e2', source: 'kpi-foldingTime', target: 'param-cover' },
    { id: 'e3', source: 'kpi-foldingTime', target: 'param-slide' },
    { id: 'e4', source: 'kpi-foldingTime', target: 'param-table' },
    { id: 'e5', source: 'kpi-foldingTime', target: 'param-handwheel' },
    { id: 'e6', source: 'kpi-foldingTime', target: 'param-column' },
    { id: 'e7', source: 'kpi-foldingTime', target: 'param-pitch' },
    { id: 'e8', source: 'kpi-foldingTime', target: 'param-rail' },
    // 参数层 -> CAD模型层
    { id: 'e9', source: 'param-qiancang', target: 'model-cad' },
    { id: 'e10', source: 'param-cover', target: 'model-cad' },
    { id: 'e11', source: 'param-slide', target: 'model-cad' },
    { id: 'e12', source: 'param-table', target: 'model-cad' },
    { id: 'e13', source: 'param-handwheel', target: 'model-cad' },
    { id: 'e14', source: 'param-column', target: 'model-cad' },
    { id: 'e15', source: 'param-pitch', target: 'model-cad' },
    { id: 'e16', source: 'param-rail', target: 'model-cad' },
    // CAD模型 -> Modelica仿真
    { id: 'e17', source: 'model-cad', target: 'model-modelica' },
    // 参数层 -> Modelica仿真 (直接关联)
    { id: 'e18', source: 'param-qiancang', target: 'model-modelica' },
    { id: 'e19', source: 'param-cover', target: 'model-modelica' },
    { id: 'e20', source: 'param-slide', target: 'model-modelica' },
    { id: 'e21', source: 'param-table', target: 'model-modelica' },
    { id: 'e22', source: 'param-handwheel', target: 'model-modelica' },
    { id: 'e23', source: 'param-column', target: 'model-modelica' },
    { id: 'e24', source: 'param-pitch', target: 'model-modelica' },
    { id: 'e25', source: 'param-rail', target: 'model-modelica' },
  ];

  // 计算高亮的边
  const getHighlightedEdges = () => {
    if (!selectedNodeId) {
      return baseEdges.map(edge => ({
        ...edge,
        style: { stroke: '#94a3b8', strokeWidth: 2 },
        animated: false,
      }));
    }

    // 找出所有相关的边
    const relatedEdgeIds = new Set<string>();
    const upstreamNodes = new Set<string>([selectedNodeId]);
    const downstreamNodes = new Set<string>([selectedNodeId]);

    // 找上游节点
    let changed = true;
    while (changed) {
      changed = false;
      baseEdges.forEach(edge => {
        if (upstreamNodes.has(edge.target) && !upstreamNodes.has(edge.source)) {
          upstreamNodes.add(edge.source);
          relatedEdgeIds.add(edge.id);
          changed = true;
        }
      });
    }

    // 找下游节点
    changed = true;
    while (changed) {
      changed = false;
      baseEdges.forEach(edge => {
        if (downstreamNodes.has(edge.source) && !downstreamNodes.has(edge.target)) {
          downstreamNodes.add(edge.target);
          relatedEdgeIds.add(edge.id);
          changed = true;
        }
      });
    }

    return baseEdges.map(edge => ({
      ...edge,
      style: relatedEdgeIds.has(edge.id)
        ? { stroke: '#6366f1', strokeWidth: 3 }
        : { stroke: '#e2e8f0', strokeWidth: 1 },
      animated: relatedEdgeIds.has(edge.id),
    }));
  };

  const traceabilityEdges = getHighlightedEdges();

  // 处理节点变化（拖动等）
  const onNodesChange: OnNodesChange = (changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  // 处理节点点击
  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    if (selectedNodeId === node.id) {
      setSelectedNodeId(null); // 取消选择
    } else {
      setSelectedNodeId(node.id); // 选择节点
    }
  };

  // 重置节点布局
  const resetLayout = () => {
    setNodes(initialNodes);
    setSelectedNodeId(null);
  };

  // 计算节点是否应该高亮
  const getNodeHighlight = (nodeId: string) => {
    if (!selectedNodeId) return 'normal';
    if (selectedNodeId === nodeId) return 'selected';

    // 检查是否是上下游节点
    const upstreamNodes = new Set<string>([selectedNodeId]);
    const downstreamNodes = new Set<string>([selectedNodeId]);

    // 找上游
    let changed = true;
    while (changed) {
      changed = false;
      baseEdges.forEach(edge => {
        if (upstreamNodes.has(edge.target) && !upstreamNodes.has(edge.source)) {
          upstreamNodes.add(edge.source);
          changed = true;
        }
      });
    }

    // 找下游
    changed = true;
    while (changed) {
      changed = false;
      baseEdges.forEach(edge => {
        if (downstreamNodes.has(edge.source) && !downstreamNodes.has(edge.target)) {
          downstreamNodes.add(edge.target);
          changed = true;
        }
      });
    }

    if (upstreamNodes.has(nodeId) || downstreamNodes.has(nodeId)) {
      return 'highlighted';
    }
    return 'dimmed';
  };

  // 自定义节点组件
  function CustomNode({ data, id }: NodeProps) {
    const highlight = getNodeHighlight(id);
    
    let baseStyle = '';
    let borderStyle = '';
    
    if (highlight === 'selected') {
      baseStyle = 'ring-4 ring-indigo-500 ring-offset-2';
      borderStyle = data.category === 'kpi' 
        ? 'border-indigo-600 bg-gradient-to-br from-indigo-100 to-purple-100'
        : data.category === 'param'
        ? 'border-blue-600 bg-gradient-to-br from-blue-100 to-cyan-100'
        : 'border-gray-600 bg-gradient-to-br from-gray-100 to-slate-100';
    } else if (highlight === 'highlighted') {
      baseStyle = 'ring-2 ring-indigo-300';
      borderStyle = data.category === 'kpi' 
        ? 'border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50'
        : data.category === 'param'
        ? 'border-blue-400 bg-blue-50'
        : 'border-gray-400 bg-gray-50';
    } else if (highlight === 'dimmed') {
      baseStyle = 'opacity-30';
      borderStyle = data.category === 'kpi' 
        ? 'border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50'
        : data.category === 'param'
        ? 'border-blue-300 bg-blue-50'
        : 'border-gray-300 bg-gray-50';
    } else {
      borderStyle = data.category === 'kpi' 
        ? 'border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50'
        : data.category === 'param'
        ? 'border-blue-300 bg-blue-50'
        : 'border-gray-300 bg-gray-50';
    }

    return (
      <div className={`px-4 py-3 rounded-lg border-2 min-w-[180px] max-w-[240px] transition-all hover:shadow-lg ${borderStyle} ${baseStyle} shadow-sm cursor-pointer`}>
        <Handle type="target" position={Position.Left} className="w-3 h-3 bg-slate-400 border-2 border-white" />
        
        <div>
          {data.category === 'kpi' && (
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-indigo-900">{data.label}</div>
              {data.status === 'achieved' && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </div>
          )}
          {data.category !== 'kpi' && (
            <div className="font-bold text-gray-900 mb-1">{data.label}</div>
          )}
          
          {data.value && (
            <div className="text-2xl font-bold text-indigo-600 mb-1">{data.value}</div>
          )}
          {data.target && (
            <div className="text-sm text-gray-600">目标: {data.target}</div>
          )}
          {data.description && (
            <div className="text-xs text-gray-700 whitespace-pre-line leading-snug mt-1">
              {data.description}
            </div>
          )}
        </div>

        <Handle type="source" position={Position.Right} className="w-3 h-3 bg-slate-400 border-2 border-white" />
      </div>
    );
  }

  const nodeTypes = {
    custom: CustomNode,
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            结果分析
          </h2>
          <p className="text-gray-600">仿真结果、电机时序和优化建议</p>
        </div>
        <button
          onClick={() => setShowTraceability(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center gap-2 font-medium"
        >
          <GitBranch className="w-5 h-5" />
          指标追溯
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：时序图和结果 */}
        <div className="col-span-2 space-y-6">
          {/* 指标达成概览 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">折叠时间评估</h3>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className={`p-5 rounded-xl border-2 ${
                result.status === 'pass' 
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                  : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-300'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {result.status === 'pass' ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                  <span className={`font-semibold ${result.status === 'pass' ? 'text-green-900' : 'text-red-900'}`}>
                    {result.status === 'pass' ? '达标' : '未达标'}
                  </span>
                </div>
                <div className={`text-3xl font-bold ${result.status === 'pass' ? 'text-green-600' : 'text-red-600'}`}>
                  {result.actual}
                </div>
                <div className="text-sm text-gray-600 mt-1">实际折叠时间</div>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                <div className="text-blue-900 font-semibold mb-2">目标时间</div>
                <div className="text-3xl font-bold text-blue-600">{result.target}</div>
                <div className="text-sm text-gray-600 mt-1">设计要求</div>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                <div className="text-purple-900 font-semibold mb-2">性能评级</div>
                <div className="text-3xl font-bold text-purple-600">
                  {parseFloat(result.actual) < 7.5 ? '优秀' : '达标'}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {parseFloat(result.actual) < 7.5 ? '领先水平' : '符合要求'}
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
              <div className="text-blue-900 font-semibold mb-1">评估结论</div>
              <div className="text-blue-700">
                {result.status === 'pass' 
                  ? '折叠时间为7.2秒，满足≤8秒的设计目标，性能优秀。建议继续优化以达到更高性能水平。'
                  : '折叠时间超出设计目标，需要进行优化调整。'}
              </div>
            </div>
          </div>

          {/* 电机运动时序图 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">电机运动时序（0-10s）</h3>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                导出数据
              </button>
            </div>

            <div className="space-y-8">
              {motorTimelines.map((motor, idx) => (
                <div
                  key={motor.id}
                  className={`transition-all ${
                    selectedMotor === motor.id ? 'ring-2 ring-blue-500 rounded-xl p-4' : ''
                  }`}
                  onMouseEnter={() => setSelectedMotor(motor.id)}
                  onMouseLeave={() => setSelectedMotor(null)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: motor.color }}
                      />
                      <span className="font-semibold text-gray-900">{motor.name}</span>
                      <span className="text-sm text-gray-600">
                        (0 → {motor.maxValue} {motor.unit})
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      完成时间: {motor.data[motor.data.length - 2]?.time}s
                    </span>
                  </div>
                  
                  <ResponsiveContainer width="100%" height={180}>
                    <ComposedChart data={motor.data} margin={{ top: 5, right: 60, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="time" 
                        domain={[0, 10]}
                        ticks={[0, 2, 4, 6, 8, 10]}
                        label={{ value: '时间 (s)', position: 'insideBottomRight', offset: -5 }} 
                        stroke="#6b7280" 
                      />
                      {/* 左侧Y轴 - 位移/转角 */}
                      <YAxis 
                        yAxisId="left"
                        domain={[0, motor.maxValue]}
                        label={{ value: `位移 (${motor.unit})`, angle: -90, position: 'insideLeft' }} 
                        stroke={motor.color}
                      />
                      {/* 右侧Y轴 - 转速 */}
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        domain={[0, motor.maxSpeed]}
                        label={{ value: '转速 (rpm)', angle: 90, position: 'insideRight', offset: 10 }} 
                        stroke="#ef4444"
                      />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                                <div className="text-sm text-gray-600 mb-1">时间: {data.time}s</div>
                                <div className="text-sm font-semibold" style={{ color: motor.color }}>
                                  位移: {data.value} {motor.unit}
                                </div>
                                <div className="text-sm font-semibold text-red-600">
                                  转速: {data.speed} rpm {data.speed > 0 ? '运行中' : '停止'}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      {/* 位移曲线 - 使用连续曲��� */}
                      <Line 
                        yAxisId="left"
                        type="monotone"
                        dataKey="value" 
                        stroke={motor.color} 
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6 }}
                      />
                      {/* 转速区域图 - 显示电机启停状态 */}
                      <Area
                        yAxisId="right"
                        type="stepAfter"
                        dataKey="speed"
                        stroke="#ef4444"
                        strokeWidth={2}
                        fill="#fee2e2"
                        fillOpacity={0.3}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                  
                  {/* 运动阶段标注 */}
                  <div className="mt-2 flex gap-2 text-xs text-gray-600 flex-wrap">
                    {(() => {
                      const startTime = motor.data.find(d => d.speed > 0)?.time || 0;
                      const endTime = motor.data.findIndex(d => d.speed > 0) > -1 
                        ? motor.data.slice().reverse().find(d => d.speed > 0)?.time || 0
                        : 0;
                      const workTime = endTime - startTime;
                      
                      return (
                        <>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                            启动: {startTime}s
                          </span>
                          {endTime > 0 && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
                              停止: {endTime}s
                            </span>
                          )}
                          {workTime > 0 && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                              工作时长: {workTime.toFixed(1)}s
                            </span>
                          )}
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                            完成位移: {motor.data[motor.data.length - 2]?.value || 0} {motor.unit}
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 时序分析 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">时序分析</h3>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="font-semibold text-blue-900 mb-2">📊 电机协作策略</div>
                <div className="text-blue-700 text-sm space-y-1">
                  <div>• 电机1 (0-3.0s): 手轮转动，优先执行</div>
                  <div>• 电机2 (1.5-4.5s): 俯仰转动，与电机1部分重叠</div>
                  <div>• 电机3 (2.0-6.5s): 滑轨平动，与电机2串联执行</div>
                  <div>• 电机4 (5.0-7.2s): 辅助动作，在后期介入</div>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="font-semibold text-green-900 mb-2">✅ 协作亮点</div>
                <div className="text-green-700 text-sm">
                  4个电机采用串联+并行混合策略，电机1和2有1.5s重叠工作时间，电机2和3有2.5s重叠，充分利用时间窗口提高效率
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <div className="font-semibold text-amber-900 mb-2">⚡ 优化建议</div>
                <div className="text-amber-700 text-sm">
                  电机3的滑轨平动耗时4.5s是关键路径，建议提升其速度或优化电机4的介入时机，以进一步缩短总折叠时间
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：优化建议 */}
        <div className="space-y-6">
          {/* 智能优化建议 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-semibold text-gray-900">优化建议</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">基于时序分析生成的优化方案</p>

            <div className="space-y-3">
              {suggestions.map((suggestion, idx) => (
                <div
                  key={suggestion.id}
                  className={`p-4 rounded-xl border-2 ${
                    suggestion.impact === 'high'
                      ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200'
                      : 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{idx === 0 ? '🎯' : idx === 1 ? '⚡' : idx === 2 ? '🔧' : '💡'}</span>
                      <h4 className="font-semibold text-gray-900">{suggestion.title}</h4>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        suggestion.impact === 'high'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {suggestion.impact === 'high' ? '高影响' : '中影响'}
                    </span>
                  </div>
                  <div className="text-gray-700 text-sm mb-2">{suggestion.description}</div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-green-600">✓</span>
                      <span className="text-green-700 font-medium">{suggestion.expectedImprovement}</span>
                    </div>
                    {suggestion.tradeoff && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-amber-600">⚠</span>
                        <span className="text-amber-700">{suggestion.tradeoff}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 仿真统计 */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
            <h3 className="text-lg font-semibold mb-4">仿真统计</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-indigo-100">仿真次数</span>
                <span className="font-bold text-xl">1000次</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-indigo-100">成功率</span>
                <span className="font-bold text-xl">98.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-indigo-100">平均时间</span>
                <span className="font-bold text-xl">7.2s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-indigo-100">标准差</span>
                <span className="font-bold">±0.15s</span>
              </div>
              <div className="h-px bg-white/20 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-indigo-100">最佳情况</span>
                <span className="font-bold text-green-200">6.8s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-indigo-100">最差情况</span>
                <span className="font-bold text-red-200">7.6s</span>
              </div>
            </div>
          </div>

          {/* 快捷操作 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">快捷操作</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-medium">
                导出完整报告
              </button>
              <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all text-gray-700 font-medium">
                保存优化方案
              </button>
              <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all text-gray-700 font-medium">
                应用建议并重新仿真
              </button>
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
              >
                <History className="w-4 h-4" />
                {showHistory ? '隐藏' : '查看'}历史记录
              </button>
            </div>
          </div>

          {/* 历史记录 */}
          {showHistory && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">仿真历史</h3>
                </div>
                <span className="text-sm text-gray-600">{simulationHistory.length} 条记录</span>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {simulationHistory.map((record) => (
                  <div
                    key={record.id}
                    className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                      record.status === 'pass'
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                        : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {record.status === 'pass' ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                          <span className="font-semibold text-gray-900">{record.cadVersion}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            record.status === 'pass' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {record.status === 'pass' ? '达标' : '未达标'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">{record.timestamp}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${
                          record.status === 'pass' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {record.foldingTime}
                        </div>
                      </div>
                    </div>
                    
                    {/* 电机配置 */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">电机1:</span>
                        <span className="font-medium">{record.motorConfig.motor1Speed} rpm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">电机2:</span>
                        <span className="font-medium">{record.motorConfig.motor2Speed} rpm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">电机3:</span>
                        <span className="font-medium">{record.motorConfig.motor3Speed} rpm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">电机4:</span>
                        <span className="font-medium">{record.motorConfig.motor4Speed} rpm</span>
                      </div>
                    </div>
                    
                    {record.notes && (
                      <div className="text-xs text-gray-700 bg-white/50 px-2 py-1 rounded">
                        📝 {record.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 指标追溯图 */}
      {showTraceability && (
        <>
          {/* 背景遮罩 */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setShowTraceability(false)}
          />
          
          {/* 抽屉面板 */}
          <div className={`fixed top-0 right-0 h-full w-[80vw] max-w-[1400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
            showTraceability ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="h-full flex flex-col">
              {/* 头部 */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
                <div className="flex items-center gap-3">
                  <GitBranch className="w-6 h-6 text-purple-600" />
                  <h3 className="text-2xl font-bold text-gray-900">指标追溯</h3>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    折叠时间指标
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={resetLayout}
                    className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-medium flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    重置布局
                  </button>
                  <button
                    onClick={() => setShowTraceability(false)}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all font-medium flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    关闭
                  </button>
                </div>
              </div>
              
              {/* 追溯画布 */}
              <div className="flex-1 p-6 overflow-hidden">
                <div className="h-full bg-gray-50 rounded-xl border border-gray-200">
                  <ReactFlow
                    nodes={nodes}
                    edges={traceabilityEdges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onNodeClick={handleNodeClick}
                    fitView
                    fitViewOptions={{ padding: 40 }}
                  >
                    <Background variant={BackgroundVariant.Lines} />
                    <Controls />
                  </ReactFlow>
                </div>
                {/* 提示信息 */}
                {!selectedNodeId && (
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
                    💡 点击任意节点查看上下游追溯关系
                  </div>
                )}
                {selectedNodeId && (
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
                    ✓ 已选中节点 | 再次点击取消选择
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}