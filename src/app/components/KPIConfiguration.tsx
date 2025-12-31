import { useState } from "react";
import {
  Save,
  Clock,
  Target,
  TrendingDown,
} from "lucide-react";
import { mockKPIs } from "../../store/mockData";

export function KPIConfiguration() {
  const [targetTime, setTargetTime] = useState(8);
  const [tolerance, setTolerance] = useState(0.5);

  const handleSave = () => {
    alert("指标配置已保存！");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          指标配置
        </h2>
        <p className="text-gray-600">
          配置折叠方向盘系统的性能指标 - 折叠总时间
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 左侧：指标配置 */}
        <div className="space-y-6">
          {/* 主要指标卡片 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  折叠总时间
                </h3>
                <p className="text-gray-600">核心性能指标</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* 目标时间设置 */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  目标时间（秒）
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="15"
                    step="0.5"
                    value={targetTime}
                    onChange={(e) =>
                      setTargetTime(parseFloat(e.target.value))
                    }
                    className="flex-1"
                  />
                  <div className="w-32 px-4 py-3 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-center">
                    <span className="text-3xl font-bold text-blue-600">
                      ≤{targetTime}
                    </span>
                    <span className="text-gray-600 ml-1">
                      s
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-600">
                  <span>5s (极快)</span>
                  <span>10s (标准)</span>
                  <span>15s (较慢)</span>
                </div>
              </div>

              {/* 容差设置 */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  允许容差（秒）
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={tolerance}
                    onChange={(e) =>
                      setTolerance(parseFloat(e.target.value))
                    }
                    className="flex-1"
                  />
                  <div className="w-32 px-4 py-3 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl text-center">
                    <span className="text-3xl font-bold text-green-600">
                      ±{tolerance}
                    </span>
                    <span className="text-gray-600 ml-1">
                      s
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  容差越大，仿真成功率越高，但要求越宽松
                </div>
              </div>

              {/* 评估范围 */}
              <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
                <div className="text-purple-900 font-semibold mb-3">
                  评估范围
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700">
                      最佳时间 (优秀):
                    </span>
                    <span className="font-bold text-green-600">
                      ≤{(targetTime * 0.85).toFixed(1)}s
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700">
                      目标时间 (达标):
                    </span>
                    <span className="font-bold text-blue-600">
                      ≤{targetTime}s
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700">
                      容差上限 (可接受):
                    </span>
                    <span className="font-bold text-amber-600">
                      ≤{(targetTime + tolerance).toFixed(1)}s
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700">
                      超限 (不达标):
                    </span>
                    <span className="font-bold text-red-600">
                      {">"}
                      {(targetTime + tolerance).toFixed(1)}s
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 新增指标 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                新增指标
              </h3>
              <button
                onClick={() => {
                  const newKPI = {
                    name: "新指标",
                    category: "性能指标",
                    target: "0",
                    unit: "",
                    priority: "medium" as const,
                  };
                  // 这里可以添加新增逻辑
                  console.log("新增指标", newKPI);
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
              >
                + 添加指标
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  指标名称
                </label>
                <input
                  type="text"
                  placeholder="例如: 电机峰值功耗、最大加速度"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    目标值
                  </label>
                  <input
                    type="text"
                    placeholder="例如: ≤500"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    单位
                  </label>
                  <input
                    type="text"
                    placeholder="例如: W, m/s²"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  优先级
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="high">高 - 关键指标</option>
                  <option value="medium">中 - 重要指标</option>
                  <option value="low">低 - 参考指标</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-xs text-blue-800">
                  💡
                  提示：新增的自定义指标将在仿真结果中展示和分析
                </div>
              </div>
            </div>
          </div>

          {/* 保存按钮 */}
          <button
            onClick={handleSave}
            className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2 font-semibold"
          >
            <Save className="w-5 h-5" />
            保存指标配置
          </button>
        </div>

        {/* 右侧：说明和建议 */}
        <div className="space-y-6">
          {/* 指标说明 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                指标说明
              </h3>
            </div>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <div>
                  <div className="font-medium">折叠总时间</div>
                  <div className="text-sm text-gray-600">
                    从收起手轮开始，到完全折叠至收纳位置的总耗时
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <div>
                  <div className="font-medium">包含阶段</div>
                  <div className="text-sm text-gray-600">
                    手轮转动 → 俯仰调整 → 滑轨平移 → 最终定位
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <div>
                  <div className="font-medium">评估依据</div>
                  <div className="text-sm text-gray-600">
                    基于4个电机的运动时序，计算最长完成时间
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 性能等级 */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
            <h3 className="text-lg font-semibold mb-4">
              性能等级
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold"> 优秀</span>
                  <span className="text-sm">
                    ≤{(targetTime * 0.85).toFixed(1)}s
                  </span>
                </div>
                <div className="text-sm text-indigo-100">
                  行业领先水平
                </div>
              </div>
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">✓ 达标</span>
                  <span className="text-sm">
                    ≤{targetTime}s
                  </span>
                </div>
                <div className="text-sm text-indigo-100">
                  满足设计要求
                </div>
              </div>
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">
                    △ 可接受
                  </span>
                  <span className="text-sm">
                    ≤{(targetTime + tolerance).toFixed(1)}s
                  </span>
                </div>
                <div className="text-sm text-indigo-100">
                  需要优化
                </div>
              </div>
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">
                    ✕ 不达标
                  </span>
                  <span className="text-sm">
                    {">"}
                    {(targetTime + tolerance).toFixed(1)}s
                  </span>
                </div>
                <div className="text-sm text-indigo-100">
                  需要重新设计
                </div>
              </div>
            </div>
          </div>

          {/* 优化建议 */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200/50 p-6 shadow-lg px-[24px] py-[20px]">
            <div className="flex items-center gap-3 mb-4">
              <TrendingDown className="w-6 h-6 text-amber-600" />
              <h3 className="text-amber-900 font-semibold">
                优化方向
              </h3>
            </div>
            <div className="space-y-2 text-amber-800 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>提高电机转速可直接缩短折叠时间</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>优化电机启动时序，实现动作并行</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>减轻部件质量可降低加速时间</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>改进传动效率减少能量损耗</span>
              </div>
            </div>
          </div>

          {/* 历史数据对比 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg mx-[0px] my-[-7px] px-[24px] py-[16px]">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              历史数据
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  v2.3.1 (当前)
                </span>
                <span className="font-semibold text-green-600">
                  7.2s
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">v2.3.0</span>
                <span className="font-semibold text-gray-900">
                  7.8s
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">v2.2.5</span>
                <span className="font-semibold text-gray-900">
                  8.5s
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">v2.2.0</span>
                <span className="font-semibold text-red-600">
                  9.2s
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}