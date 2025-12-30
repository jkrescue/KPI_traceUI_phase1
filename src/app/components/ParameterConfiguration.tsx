import { useState } from 'react';
import { Plus, Trash2, Save, RotateCcw, AlertCircle } from 'lucide-react';
import { mockParameters } from '../../store/mockData';

interface Parameter {
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

export function ParameterConfiguration() {
  const [parameters, setParameters] = useState<Parameter[]>(mockParameters);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const categories = ['电机参数', '轴承参数', '质量参数', '传动参数', '控制参数'];

  const handleSave = () => {
    alert('参数配置已保存！');
  };

  const handleReset = () => {
    if (confirm('确定要重置所有参数到默认值吗？')) {
      // 重置逻辑
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除此参数吗？')) {
      setParameters(parameters.filter(p => p.id !== id));
    }
  };

  const updateParameter = (id: string, field: string, value: any) => {
    setParameters(
      parameters.map(p =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">参数配置</h2>
        <p className="text-gray-600">
          配置电机、轴承、质量等系统参数的目标值和容差范围，用于 Monte Carlo 仿真
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：参数列表 */}
        <div className="col-span-2 space-y-6">
          {/* 操作按钮 */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              添加参数
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              保存配置
            </button>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 text-gray-700 font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              重置
            </button>
          </div>

          {/* 添加参数表单 */}
          {showAddForm && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">添加新参数</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">参数名称</label>
                  <input
                    type="text"
                    placeholder="例如：电机额定功率"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">参数分类</label>
                  <select className="w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {categories.map(cat => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">目标值</label>
                  <input
                    type="number"
                    placeholder="150"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">单位</label>
                  <input
                    type="text"
                    placeholder="W"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">上偏差 (+)</label>
                  <input
                    type="number"
                    placeholder="10"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">下偏差 (-)</label>
                  <input
                    type="number"
                    placeholder="5"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all">
                  确认添加
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-5 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 text-gray-700 transition-all"
                >
                  取消
                </button>
              </div>
            </div>
          )}

          {/* 参数表格 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">参数名称</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">分类</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">目标值</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">容差范围</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">当前值</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">状态</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {parameters.map(param => {
                    const current = param.current || param.target;
                    const upperLimit = param.target + param.tolerance.upper;
                    const lowerLimit = param.target + param.tolerance.lower;
                    const inRange = current >= lowerLimit && current <= upperLimit;

                    return (
                      <tr key={param.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-4 py-3 text-gray-900 font-medium">{param.name}</td>
                        <td className="px-4 py-3 text-gray-600">{param.category}</td>
                        <td className="px-4 py-3 text-gray-900 font-semibold">
                          {param.target} {param.unit}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          +{param.tolerance.upper} / {param.tolerance.lower} {param.unit}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`font-semibold ${inRange ? 'text-green-600' : 'text-red-600'}`}>
                            {current} {param.unit}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {inRange ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              正常
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                              超限
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDelete(param.id)}
                            className="p-2 hover:bg-red-100 rounded-lg text-gray-600 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 右侧：配置摘要和提示 */}
        <div className="space-y-6">
          {/* 参数统计 */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-lg text-white">
            <h3 className="text-lg font-semibold mb-4">配置摘要</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-100">总参数数量</span>
                <span className="font-bold text-xl">{parameters.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">电机参数</span>
                <span className="font-bold text-xl">
                  {parameters.filter(p => p.category === '电机参数').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">传动参数</span>
                <span className="font-bold text-xl">
                  {parameters.filter(p => p.category === '传动参数').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">质量参数</span>
                <span className="font-bold text-xl">
                  {parameters.filter(p => p.category === '质量参数').length}
                </span>
              </div>
            </div>
          </div>

          {/* 配置指南 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <h3 className="text-blue-900 font-semibold">配置指南</h3>
            </div>
            <div className="text-blue-800 space-y-2.5">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>目标值：理想工作点的参数值</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>容差范围：Monte Carlo 仿真的变化区间</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>容差越大，仿真覆盖的工况越全面</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>建议根据实际生产偏差设置容差</span>
              </div>
            </div>
          </div>

          {/* 快捷模板 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">快捷模板</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 transition-all text-left text-gray-700 font-medium">
                标准配置模板
              </button>
              <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 transition-all text-left text-gray-700 font-medium">
                高性能配置
              </button>
              <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 transition-all text-left text-gray-700 font-medium">
                低成本配置
              </button>
              <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 transition-all text-left text-gray-700 font-medium">
                导入自定义模板
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}