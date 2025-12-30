import { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, TrendingDown, Lightbulb } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// 模拟折叠时间序列数据
const timeSeriesData = [
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
const correlationData = [
  { parameter: '电机功率', correlation: 0.85, impact: 'high' },
  { parameter: '系统质量', correlation: -0.72, impact: 'high' },
  { parameter: '传动效率', correlation: 0.68, impact: 'medium' },
  { parameter: '轴承摩擦', correlation: -0.45, impact: 'medium' },
  { parameter: '传动比', correlation: 0.32, impact: 'low' },
];

export function ResultAnalysis() {
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);

  const kpiResults = [
    {
      name: '折叠时间',
      target: '≤2.5s',
      actual: '3.1s',
      status: 'fail',
      gap: '+0.6s',
      priority: 'high',
    },
    {
      name: '峰值功耗',
      target: '≤250W',
      actual: '280W',
      status: 'fail',
      gap: '+30W',
      priority: 'high',
    },
    {
      name: '平顺性 (Jerk)',
      target: '≤100 mm/s³',
      actual: '85 mm/s³',
      status: 'pass',
      gap: '-',
      priority: 'medium',
    },
    {
      name: '噪音水平',
      target: '≤65dB',
      actual: '62dB',
      status: 'pass',
      gap: '-',
      priority: 'medium',
    },
    {
      name: '折叠行程精度',
      target: '±2mm',
      actual: '±1.5mm',
      status: 'pass',
      gap: '-',
      priority: 'high',
    },
  ];

  const failedKPIs = kpiResults.filter(k => k.status === 'fail');
  const passedKPIs = kpiResults.filter(k => k.status === 'pass');

  // 智能优化建议
  const suggestions = [
    {
      id: 1,
      title: '提升电机功率',
      impact: 'high',
      description: '将电机功率从 150W 提升到 180W',
      expectedImprovement: '折叠时间减少约 0.5s',
      relatedKPI: '折叠时间',
      tradeoff: '峰值功耗增加约 35W',
    },
    {
      id: 2,
      title: '降低结构质量',
      impact: 'high',
      description: '优化折叠臂设计，减轻质量约 100g',
      expectedImprovement: '折叠时间减少约 0.3s',
      relatedKPI: '折叠时间',
      tradeoff: '需要重新进行结构强度验证',
    },
    {
      id: 3,
      title: '优化传动部件',
      impact: 'medium',
      description: '采用低摩擦轴承，提升传动效率至 0.90',
      expectedImprovement: '折叠时间减少约 0.2s，功耗降低 15W',
      relatedKPI: '折叠时间、峰值功耗',
      tradeoff: '成本增加约 ¥50/套',
    },
    {
      id: 4,
      title: '调整控制策略',
      impact: 'medium',
      description: '优化加速度曲线，提高初始阶段速度',
      expectedImprovement: '折叠时间减少约 0.15s',
      relatedKPI: '折叠时间',
      tradeoff: '可能略微影响平顺性',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">结果分析</h2>
        <p className="text-gray-600">仿真结果、指标达成情况与智能优化建议</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：仿真结果曲线 */}
        <div className="col-span-2 space-y-6">
          {/* 指标达成概览 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">指标达成概览</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-900">达标</span>
                </div>
                <div className="text-green-600">{passedKPIs.length} 项</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <div className="flex items-center gap-2 mb-1">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-900">未达标</span>
                </div>
                <div className="text-red-600">{failedKPIs.length} 项</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-900">达标率</span>
                </div>
                <div className="text-blue-600">
                  {Math.round((passedKPIs.length / kpiResults.length) * 100)}%
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {kpiResults.map((kpi, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border cursor-pointer ${
                    kpi.status === 'pass'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  } ${selectedKPI === kpi.name ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedKPI(kpi.name)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-900">{kpi.name}</span>
                        {kpi.status === 'pass' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <div className="text-gray-600">
                        目标: {kpi.target} | 实际: {kpi.actual}
                        {kpi.gap !== '-' && (
                          <span className="text-red-600"> | 差距: {kpi.gap}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 关键时间序列曲线 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">折叠过程时间序列</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" label={{ value: '时间 (s)', position: 'insideBottom', offset: -5 }} stroke="#6b7280" />
                <YAxis yAxisId="left" label={{ value: '行程 (mm) / 速度 (mm/s)', angle: -90, position: 'insideLeft' }} stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" label={{ value: '功耗 (W)', angle: 90, position: 'insideRight' }} stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="position" stroke="#3b82f6" name="行程" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="velocity" stroke="#10b981" name="速度" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="power" stroke="#ec4899" name="功耗" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 参数相关性分析 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">参数相关性分析（对折叠时间的影响）</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={correlationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="parameter" stroke="#6b7280" />
                <YAxis label={{ value: '相关系数', angle: -90, position: 'insideLeft' }} stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="correlation" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-gray-600">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span>正相关：增加该参数会增加折叠时间</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <span>负相关：增加该参数会减少折叠时间</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：智能优化建议 */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h3 className="text-gray-900">智能优化建议</h3>
            </div>
            <p className="text-gray-600 mb-4">基于相关性分析生成的优化方案</p>

            <div className="space-y-4">
              {suggestions.map(suggestion => (
                <div
                  key={suggestion.id}
                  className={`p-4 rounded-lg border ${
                    suggestion.impact === 'high'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-gray-900">{suggestion.title}</h4>
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        suggestion.impact === 'high'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {suggestion.impact === 'high' ? '高影响' : '中影响'}
                    </span>
                  </div>
                  <div className="text-gray-700 mb-2">{suggestion.description}</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-green-700">{suggestion.expectedImprovement}</span>
                    </div>
                    {suggestion.tradeoff && (
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span className="text-amber-700">{suggestion.tradeoff}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-600">影响指标: {suggestion.relatedKPI}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 仿真统计 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">仿真统计</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">仿真次数</span>
                <span className="text-gray-900">1000 次</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">成功率</span>
                <span className="text-green-600">98.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">平均折叠时间</span>
                <span className="text-gray-900">3.1s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">时间标准差</span>
                <span className="text-gray-900">±0.15s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">最佳情况</span>
                <span className="text-green-600">2.8s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">最差情况</span>
                <span className="text-red-600">3.5s</span>
              </div>
            </div>
          </div>

          {/* 快捷操作 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">快捷操作</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                导出完整报告
              </button>
              <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                保存优化方案
              </button>
              <button className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                应用建议并重新仿真
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
