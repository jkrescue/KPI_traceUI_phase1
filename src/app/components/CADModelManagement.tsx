import { useState } from "react";
import {
  RefreshCw,
  History,
  Download,
  Upload,
  GitCompare,
  CheckCircle,
  Clock,
} from "lucide-react";
import { mockCADVersions } from "../../store/mockData";

export function CADModelManagement() {
  const [syncing, setSyncing] = useState(false);
  const [selectedVersion, setSelectedVersion] =
    useState("v2.3.1");

  // 模拟同步操作
  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  // 使用 mock 数据
  const versionHistory = mockCADVersions;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          数模管理
        </h2>
        <p className="text-gray-600">
          从 TC/UG 同步 CAD 数模，查看版本历史和变更记录
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：当前数模信息 */}
        <div className="col-span-2 space-y-6">
          {/* 当前版本 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                当前数模版本
              </h3>
              <button
                onClick={handleSync}
                disabled={syncing}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`}
                />
                {syncing ? "同步中..." : "同步最新数模"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="text-blue-600 mb-1 text-sm font-medium">
                  版本号
                </div>
                <div className="text-gray-900 font-semibold text-lg">
                  {selectedVersion}
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div className="text-purple-600 mb-1 text-sm font-medium">
                  来源系统
                </div>
                <div className="text-gray-900 font-semibold">
                  TC (Teamcenter)
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="text-green-600 mb-1 text-sm font-medium">
                  最后更新
                </div>
                <div className="text-gray-900 font-semibold">
                  2024-12-28 14:30
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                <div className="text-amber-600 mb-1 text-sm font-medium">
                  更新人
                </div>
                <div className="text-gray-900 font-semibold">
                  CAD设计工程师
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
              <div className="text-blue-900 mb-2 font-semibold">
                变更摘要
              </div>
              <div className="text-blue-700">
                优化折叠臂连接处厚度，降低质量约50g
              </div>
            </div>
          </div>

          {/* 版本历史 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl shadow-purple-500/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                版本历史
              </h3>
              <button className="px-4 py-2 text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all flex items-center gap-2">
                <GitCompare className="w-4 h-4" />
                版本对比
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
                  onClick={() =>
                    setSelectedVersion(version.version)
                  }
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {version.status === "current" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                      <div>
                        <div className="text-gray-900 font-semibold">
                          {version.version}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {version.date} · {version.author} ·{" "}
                          {version.source}
                        </div>
                      </div>
                    </div>
                    {version.status === "current" && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        当前版本
                      </span>
                    )}
                  </div>
                  <div className="text-gray-700 ml-8">
                    {version.changes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：快捷操作 */}
        <div className="space-y-6">
          {/* 数据源配置 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              数据源配置
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-600 mb-2 font-medium">
                  CAD 系统
                </label>
                <select className="w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>TC (Teamcenter)</option>
                  <option>UG (NX)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-2 font-medium">
                  同步频率
                </label>
                <select className="w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>手动同步</option>
                  <option>每日自动同步</option>
                  <option>实时同步</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-2 font-medium">
                  项目路径
                </label>
                <input
                  type="text"
                  value="/project/folding_wheel"
                  readOnly
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl bg-gray-50 text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* 快捷操作 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              快捷操作
            </h3>
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
                查看完整变更日志
              </button>
            </div>
          </div>

          {/* 数模统计 */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
            <h3 className="text-lg font-semibold mb-4">
              数模统计
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-indigo-100">
                  零部件总数
                </span>
                <span className="font-bold text-xl">127</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-indigo-100">
                  总质量 (kg)
                </span>
                <span className="font-bold text-xl">2.35</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-indigo-100">
                  历史版本数
                </span>
                <span className="font-bold text-xl">15</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-indigo-100">
                  最后同步
                </span>
                <span className="font-bold">2小时前</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}