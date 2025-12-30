import { useState } from 'react';
import { Upload, Plus, Trash2, Save, Download, FileText } from 'lucide-react';
import { mockKPIs } from '../../store/mockData';

interface KPI {
  id: string;
  name: string;
  category: string;
  target: string;
  unit: string;
  priority: 'high' | 'medium' | 'low';
  source: 'imported' | 'custom';
}

export function KPIConfiguration() {
  const [kpis, setKpis] = useState<KPI[]>(mockKPIs);

  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      // 模拟导入指标
      alert(`成功导入指标文件: ${file.name}`);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除此指标吗？')) {
      setKpis(kpis.filter(k => k.id !== id));
    }
  };

  const handleSave = () => {
    alert('指标配置已保存！');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return '高优先级';
      case 'medium':
        return '中优先级';
      case 'low':
        return '低优先级';
      default:
        return '未设置';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">指标配置</h2>
        <p className="text-gray-600">导入或自定义系统性能指标，用于仿真结果评估</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：指标列表 */}
        <div className="col-span-2 space-y-6">
          {/* 操作按钮 */}
          <div className="flex items-center gap-3">
            <label className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4" />
              导入指标文件
              <input
                type="file"
                accept=".xlsx,.csv,.json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              自定义指标
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 text-gray-700 font-medium"
            >
              <Save className="w-4 h-4" />
              保存配置
            </button>
            <button className="ml-auto px-5 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 text-gray-700 font-medium">
              <Download className="w-4 h-4" />
              导出指标
            </button>
          </div>

          {/* 文件上传状态 */}
          {uploadedFile && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-green-900 font-semibold">已导入指标文件</div>
                  <div className="text-green-700">{uploadedFile}</div>
                </div>
              </div>
              <button
                onClick={() => setUploadedFile(null)}
                className="text-green-600 hover:text-green-800 transition-colors"
              >
                ✕
              </button>
            </div>
          )}

          {/* 添加指标表单 */}
          {showAddForm && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">添加自定义指标</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">指标名称</label>
                  <input
                    type="text"
                    placeholder="例如：折叠时间"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">指标分类</label>
                  <select className="w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>性能指标</option>
                    <option>功耗指标</option>
                    <option>舒适性指标</option>
                    <option>精度指标</option>
                    <option>可靠性指标</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">目标值</label>
                  <input
                    type="text"
                    placeholder="例如：≤2.5"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">单位</label>
                  <input
                    type="text"
                    placeholder="s"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 font-medium">优先级</label>
                  <select className="w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="high">高优先级</option>
                    <option value="medium">中优先级</option>
                    <option value="low">低优先级</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all">
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

          {/* 指标列表 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">已配置指标</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {kpis.map(kpi => (
                <div key={kpi.id} className="p-5 hover:bg-blue-50/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-gray-900 font-semibold">{kpi.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(kpi.priority)}`}>
                          {getPriorityText(kpi.priority)}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          {kpi.source === 'imported' ? '导入' : '自定义'}
                        </span>
                      </div>
                      <div className="text-gray-600">{kpi.category}</div>
                    </div>
                    <button
                      onClick={() => handleDelete(kpi.id)}
                      className="p-2 hover:bg-red-100 rounded-lg text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-gray-700">
                    <div>
                      <span className="text-gray-600">目标值: </span>
                      <span className="font-semibold">
                        {kpi.target} {kpi.unit}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：统计和说明 */}
        <div className="space-y-6">
          {/* 指标统计 */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-lg text-white">
            <h3 className="text-lg font-semibold mb-4">指标统计</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-green-100">总指标数</span>
                <span className="font-bold text-xl">{kpis.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100">导入指标</span>
                <span className="font-bold text-xl">
                  {kpis.filter(k => k.source === 'imported').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100">自定义指标</span>
                <span className="font-bold text-xl">
                  {kpis.filter(k => k.source === 'custom').length}
                </span>
              </div>
              <div className="h-px bg-green-400/30 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-green-100">高优先级</span>
                <span className="font-bold">
                  {kpis.filter(k => k.priority === 'high').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100">中优先级</span>
                <span className="font-bold">
                  {kpis.filter(k => k.priority === 'medium').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100">低优先级</span>
                <span className="font-bold">
                  {kpis.filter(k => k.priority === 'low').length}
                </span>
              </div>
            </div>
          </div>

          {/* 指标分类 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">指标分类</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">性能指标</span>
                <span className="text-gray-900 font-semibold">
                  {kpis.filter(k => k.category === '性能指标').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">功耗指标</span>
                <span className="text-gray-900 font-semibold">
                  {kpis.filter(k => k.category === '功耗指标').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">舒适性指标</span>
                <span className="text-gray-900 font-semibold">
                  {kpis.filter(k => k.category === '舒适性指标').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">精度指标</span>
                <span className="text-gray-900 font-semibold">
                  {kpis.filter(k => k.category === '精度指标').length}
                </span>
              </div>
            </div>
          </div>

          {/* 支持的文件格式 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 p-6 shadow-lg">
            <h3 className="text-blue-900 font-semibold mb-3">支持的文件格式</h3>
            <div className="text-blue-800 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-blue-600">•</span>
                <span>Excel 表格 (.xlsx)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">•</span>
                <span>CSV 文件 (.csv)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">•</span>
                <span>JSON 文件 (.json)</span>
              </div>
            </div>
          </div>

          {/* 指标模板 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">指标模板</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 transition-all text-left text-gray-700 font-medium">
                标准性能指标
              </button>
              <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 transition-all text-left text-gray-700 font-medium">
                完整评估指标
              </button>
              <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 transition-all text-left text-gray-700 font-medium">
                快速测试指标
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}