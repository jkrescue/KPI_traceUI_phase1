import { useState } from "react";
import { CADModelManagement } from "./components/CADModelManagement";
import { ParameterConfiguration } from "./components/ParameterConfiguration";
import { KPIConfiguration } from "./components/KPIConfiguration";
import { SimulationExecution } from "./components/SimulationExecution";
import { ResultAnalysis } from "./components/ResultAnalysis";
import { Settings, User, Zap } from "lucide-react";

type PageType =
  | "cad"
  | "parameters"
  | "kpi"
  | "simulation"
  | "results";

export default function App() {
  const [activePage, setActivePage] = useState<PageType>("cad");
  const [simulationCompleted, setSimulationCompleted] =
    useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  折叠方向盘自动化仿真平台
                </h1>
              </div>
              <nav className="flex items-center gap-2">
                <button
                  onClick={() => setActivePage("cad")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activePage === "cad"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  数模管理
                </button>
                <button
                  onClick={() => setActivePage("parameters")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activePage === "parameters"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  参数配置
                </button>
                <button
                  onClick={() => setActivePage("kpi")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activePage === "kpi"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  指标配置
                </button>
                <button
                  onClick={() => setActivePage("simulation")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activePage === "simulation"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  一键仿真
                </button>
                <button
                  onClick={() => setActivePage("results")}
                  className={`px-4 py-2 rounded-lg transition-all relative ${
                    activePage === "results"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                  disabled={!simulationCompleted}
                >
                  结果分析
                  {simulationCompleted && (
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium animate-pulse">
                      已完成
                    </span>
                  )}
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all hover:scale-110">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all hover:scale-110">
                <User className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 内容区域 */}
      <main className="p-6 animate-in fade-in duration-500">
        {activePage === "cad" && <CADModelManagement />}
        {activePage === "parameters" && (
          <ParameterConfiguration />
        )}
        {activePage === "kpi" && <KPIConfiguration />}
        {activePage === "simulation" && (
          <SimulationExecution
            onComplete={() => setSimulationCompleted(true)}
          />
        )}
        {activePage === "results" && <ResultAnalysis />}
      </main>
    </div>
  );
}