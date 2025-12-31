import { useState } from "react";
import {
  RefreshCw,
  History,
  Download,
  Upload,
  GitCompare,
  CheckCircle,
  Clock,
  Box,
  Weight,
  Compass,
} from "lucide-react";
import { mockCADVersions, mockCADComponents } from "../../store/mockData";

export function CADModelManagement() {
  const [syncing, setSyncing] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState("v2.3.1");
  const [selectedComponent, setSelectedComponent] = useState(mockCADComponents[0]);
  const [showComparison, setShowComparison] = useState(false);
  const [compareVersion1, setCompareVersion1] = useState("v2.3.1");
  const [compareVersion2, setCompareVersion2] = useState("v2.3.0");

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  const versionHistory = mockCADVersions;
  const components = mockCADComponents;
  const totalMass = components.reduce((sum, comp) => sum + comp.mass, 0);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          数模管理
        </h2>
        <p className="text-gray-600">
          从 TC/UG 同步 CAD 数模，查看部件物理属性和版本历史
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：数模版本和部件列表 */}
        <div className="col-span-2 space-y-6">
          {/* 当前版本卡片 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl shadow-blue-500/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">当前数模版本</h3>
              <button
                onClick={handleSync}
                disabled={syncing}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
                {syncing ? "同步中..." : "同步最新数模"}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="text-blue-600 mb-1 text-sm font-medium">版本号</div>
                <div className="text-gray-900 font-semibold text-lg">{selectedVersion}</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div className="text-purple-600 mb-1 text-sm font-medium">来源系统</div>
                <div className="text-gray-900 font-semibold">TC</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="text-green-600 mb-1 text-sm font-medium">最后更新</div>
                <div className="text-gray-900 font-semibold text-sm">2024-12-28</div>
              </div>
            </div>
          </div>

          {/* 部件列表 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">部件列表（{components.length}个部件）</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {components.map((comp) => (
                <div
                  key={comp.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedComponent.id === comp.id
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-400 shadow-md"
                      : "bg-white border-gray-200 hover:border-blue-200 hover:shadow"
                  }`}
                  onClick={() => setSelectedComponent(comp)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Box className={`w-5 h-5 ${selectedComponent.id === comp.id ? "text-blue-600" : "text-gray-400"}`} />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{comp.name}</div>
                      <div className="text-xs text-gray-600">{comp.material}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">质量:</span>
                    <span className="font-semibold text-gray-900">{comp.mass} kg</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 版本历史 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">版本历史</h3>
              <button 
                onClick={() => setShowComparison(!showComparison)}
                className={`px-4 py-2 border-2 rounded-xl transition-all flex items-center gap-2 ${
                  showComparison 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                    : 'text-blue-600 border-blue-600 hover:bg-blue-50'
                }`}
              >
                <GitCompare className="w-4 h-4" />
                {showComparison ? '关闭对比' : '版本对比'}
              </button>
            </div>

            <div className="space-y-3">
              {versionHistory.map((version, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    version.status === "current"
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-md"
                      : "bg-gray-50/50 border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }`}
                  onClick={() => setSelectedVersion(version.version)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {version.status === "current" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                      <div>
                        <div className="text-gray-900 font-semibold">{version.version}</div>
                        <div className="text-gray-600 text-sm">
                          {version.date} · {version.author} · {version.source}
                        </div>
                      </div>
                    </div>
                    {version.status === "current" && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        当前版本
                      </span>
                    )}
                  </div>
                  <div className="text-gray-700 ml-8">{version.changes}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 版本对比面板 */}
          {showComparison && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200 p-6 shadow-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">版本对比</h3>
              
              {/* 版本选择器 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">基准版本</label>
                  <select 
                    value={compareVersion1}
                    onChange={(e) => setCompareVersion1(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    {versionHistory.map((v) => (
                      <option key={v.version} value={v.version}>{v.version}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">对比版本</label>
                  <select 
                    value={compareVersion2}
                    onChange={(e) => setCompareVersion2(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    {versionHistory.map((v) => (
                      <option key={v.version} value={v.version}>{v.version}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 对比结果 */}
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">主要变更</h4>
                  <div className="text-sm text-gray-700">
                    {compareVersion1 === 'v2.3.1' && compareVersion2 === 'v2.3.0' && (
                      <div>• 前舱质量优化：0.90kg → 0.85kg，降低50g</div>
                    )}
                    {compareVersion1 === 'v2.3.0' && compareVersion2 === 'v2.2.5' && (
                      <div>• 滑轨机构材质调整为钢+尼龙，刚度提升</div>
                    )}
                    {compareVersion1 === 'v2.2.5' && compareVersion2 === 'v2.2.0' && (
                      <div>• 俯仰机构安装位置调整，管柱重心优化</div>
                    )}
                    {compareVersion1 === 'v2.2.0' && compareVersion2 === 'v2.1.8' && (
                      <div>• 方向盘盖板厚度优化，滑盖加强筋优化</div>
                    )}
                    {compareVersion1 === 'v2.1.8' && compareVersion2 === 'v2.1.5' && (
                      <div>• 小桌板材质变更，手轮轮廓修改</div>
                    )}
                    {compareVersion1 === compareVersion2 && (
                      <div className="text-amber-700">⚠️ 选择了相同版本，无变更</div>
                    )}
                  </div>
                </div>

                {/* 部件参数对比 */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">系统总质量对比</h4>
                  <div className="flex items-center justify-between">
                    <div className="text-center flex-1">
                      <div className="text-sm text-gray-600">{compareVersion1}</div>
                      <div className="text-2xl font-bold text-blue-600">{totalMass.toFixed(2)} kg</div>
                    </div>
                    <div className="text-gray-400 mx-4">→</div>
                    <div className="text-center flex-1">
                      <div className="text-sm text-gray-600">{compareVersion2}</div>
                      <div className="text-2xl font-bold text-purple-600">
                        {compareVersion1 === 'v2.3.1' && compareVersion2 === 'v2.3.0' 
                          ? (totalMass + 0.05).toFixed(2) 
                          : totalMass.toFixed(2)} kg
                      </div>
                    </div>
                  </div>
                  {compareVersion1 === 'v2.3.1' && compareVersion2 === 'v2.3.0' && (
                    <div className="mt-3 text-center text-sm text-green-600 font-medium">
                      ✓ 减重 50g
                    </div>
                  )}
                </div>

                {/* 影响的部件 */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">变更涉及部件</h4>
                  <div className="space-y-2">
                    {compareVersion1 === 'v2.3.1' && compareVersion2 === 'v2.3.0' && (
                      <>
                        <div className="flex items-center gap-2 p-2 bg-white rounded-lg border-l-4 border-blue-500">
                          <Box className="w-4 h-4 text-blue-600" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">前舱</div>
                            <div className="text-xs text-gray-500">质量: 0.90kg → 0.85kg (-5.6%)</div>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">优化</span>
                        </div>
                        <div className="text-xs text-gray-600 pl-2 pt-1">
                          • 惯性矩 Ixx: 1245 → 1180 kg·mm²<br/>
                          • 质心 Z轴偏移: 15.2 → 14.8 mm
                        </div>
                      </>
                    )}
                    {compareVersion1 === 'v2.3.0' && compareVersion2 === 'v2.2.5' && (
                      <>
                        <div className="flex items-center gap-2 p-2 bg-white rounded-lg border-l-4 border-purple-500">
                          <Box className="w-4 h-4 text-purple-600" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">滑轨机构</div>
                            <div className="text-xs text-gray-500">材质: 铝合金 → 钢+尼龙</div>
                          </div>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">材质</span>
                        </div>
                        <div className="text-xs text-gray-600 pl-2 pt-1">
                          • 质量: 2.10kg → 2.15kg (+2.4%)<br/>
                          • 刚度提升约 15%，预期提高系统稳定性
                        </div>
                      </>
                    )}
                    {compareVersion1 === 'v2.2.5' && compareVersion2 === 'v2.2.0' && (
                      <>
                        <div className="flex items-center gap-2 p-2 bg-white rounded-lg border-l-4 border-amber-500">
                          <Box className="w-4 h-4 text-amber-600" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">俯仰机构</div>
                            <div className="text-xs text-gray-500">安装位置调整</div>
                          </div>
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded">位置</span>
                        </div>
                        <div className="text-xs text-gray-600 pl-2 pt-1 mb-2">
                          • 质心 Y轴: -8.5 → -7.2 mm<br/>
                          • 优化力矩传递效率
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-white rounded-lg border-l-4 border-teal-500">
                          <Box className="w-4 h-4 text-teal-600" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">管柱</div>
                            <div className="text-xs text-gray-500">重心优化</div>
                          </div>
                          <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded">优化</span>
                        </div>
                        <div className="text-xs text-gray-600 pl-2 pt-1">
                          • 质心坐标调整，减少偏心载荷<br/>
                          • 惯性矩 Iyy: 8920 → 8650 kg·mm² (-3.0%)
                        </div>
                      </>
                    )}
                    {compareVersion1 === 'v2.2.0' && compareVersion2 === 'v2.1.8' && (
                      <>
                        <div className="flex items-center gap-2 p-2 bg-white rounded-lg border-l-4 border-pink-500">
                          <Box className="w-4 h-4 text-pink-600" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">方向盘盖板</div>
                            <div className="text-xs text-gray-500">厚度优化</div>
                          </div>
                          <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded">结构</span>
                        </div>
                        <div className="text-xs text-gray-600 pl-2 pt-1 mb-2">
                          • 壁厚: 3.0mm → 2.5mm<br/>
                          • 质量: 0.55kg → 0.48kg (-12.7%)
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-white rounded-lg border-l-4 border-indigo-500">
                          <Box className="w-4 h-4 text-indigo-600" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">滑盖</div>
                            <div className="text-xs text-gray-500">加强筋优化</div>
                          </div>
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">结构</span>
                        </div>
                        <div className="text-xs text-gray-600 pl-2 pt-1">
                          • 增加局部加强筋，提升刚度<br/>
                          • 惯性矩整体提升 8%
                        </div>
                      </>
                    )}
                    {compareVersion1 === 'v2.1.8' && compareVersion2 === 'v2.1.5' && (
                      <>
                        <div className="flex items-center gap-2 p-2 bg-white rounded-lg border-l-4 border-emerald-500">
                          <Box className="w-4 h-4 text-emerald-600" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">小桌板</div>
                            <div className="text-xs text-gray-500">材质变更</div>
                          </div>
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded">材质</span>
                        </div>
                        <div className="text-xs text-gray-600 pl-2 pt-1 mb-2">
                          • 材质: PC → PC+ABS<br/>
                          • 提升耐冲击性能，质量微增
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-white rounded-lg border-l-4 border-orange-500">
                          <Box className="w-4 h-4 text-orange-600" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">手轮</div>
                            <div className="text-xs text-gray-500">轮廓修改</div>
                          </div>
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">设计</span>
                        </div>
                        <div className="text-xs text-gray-600 pl-2 pt-1">
                          • 外轮廓曲线优化，人机工程改进<br/>
                          • 质量: 1.20kg → 1.18kg
                        </div>
                      </>
                    )}
                    {compareVersion1 !== compareVersion2 && 
                     !(compareVersion1 === 'v2.3.1' && compareVersion2 === 'v2.3.0') &&
                     !(compareVersion1 === 'v2.3.0' && compareVersion2 === 'v2.2.5') &&
                     !(compareVersion1 === 'v2.2.5' && compareVersion2 === 'v2.2.0') &&
                     !(compareVersion1 === 'v2.2.0' && compareVersion2 === 'v2.1.8') &&
                     !(compareVersion1 === 'v2.1.8' && compareVersion2 === 'v2.1.5') && (
                      <div className="text-center py-4 text-gray-500">
                        <Box className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <div className="text-sm">该版本组合暂无详细对比数据</div>
                        <div className="text-xs mt-1">请参考版本历史中的变更说明</div>
                      </div>
                    )}
                    {compareVersion1 === compareVersion2 && (
                      <div className="text-center py-4 text-amber-600">
                        <div className="text-2xl mb-2">⚠️</div>
                        <div className="text-sm font-medium">选择了相同版本</div>
                        <div className="text-xs mt-1">请选择不同版本进行对比</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 右侧：选中部件详细信息 */}
        <div className="space-y-6">
          {/* 部件详细信息 */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center gap-3 mb-4">
              <Box className="w-6 h-6" />
              <h3 className="text-lg font-semibold">部件详情</h3>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
              <div className="font-semibold text-lg mb-1">{selectedComponent.name}</div>
              <div className="text-indigo-100 text-sm">{selectedComponent.material}</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Weight className="w-5 h-5 text-indigo-200" />
                <div className="flex-1">
                  <div className="text-indigo-100 text-sm">质量</div>
                  <div className="font-semibold text-lg">{selectedComponent.mass} kg</div>
                </div>
              </div>
              
              <div className="h-px bg-white/20" />
              
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-indigo-200" />
                <div className="flex-1">
                  <div className="text-indigo-100 text-sm">质心坐标 (mm)</div>
                  <div className="font-mono text-sm mt-1">
                    <div>X: {selectedComponent.centerOfMass.x}</div>
                    <div>Y: {selectedComponent.centerOfMass.y}</div>
                    <div>Z: {selectedComponent.centerOfMass.z}</div>
                  </div>
                </div>
              </div>
              
              <div className="h-px bg-white/20" />
              
              <div>
                <div className="text-indigo-100 text-sm mb-2">惯性矩 (kg·mm²)</div>
                <div className="font-mono text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Ixx:</span>
                    <span>{selectedComponent.inertia.Ixx}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Iyy:</span>
                    <span>{selectedComponent.inertia.Iyy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Izz:</span>
                    <span>{selectedComponent.inertia.Izz}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 系统统计 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">系统统计</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">部件总数</span>
                <span className="text-gray-900 font-semibold">{components.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">系统总质量</span>
                <span className="text-gray-900 font-semibold">{totalMass.toFixed(2)} kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">历史版本数</span>
                <span className="text-gray-900 font-semibold">{versionHistory.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">最后同步</span>
                <span className="text-gray-900 font-semibold">2小时前</span>
              </div>
            </div>
          </div>

          {/* 快捷操作 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">快捷操作</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 transition-all flex items-center gap-2 text-gray-700 font-medium">
                <Download className="w-4 h-4" />
                导出数模文件
              </button>
              <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 transition-all flex items-center gap-2 text-gray-700 font-medium">
                <Upload className="w-4 h-4" />
                上传本地数模
              </button>
              <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 transition-all flex items-center gap-2 text-gray-700 font-medium">
                <History className="w-4 h-4" />
                完整变更日志
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}