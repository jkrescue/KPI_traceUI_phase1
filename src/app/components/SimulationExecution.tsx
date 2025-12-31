import { useState } from "react";
import {
  Play,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { SimulationHistory } from "../../store/mockData";

interface SimulationExecutionProps {
  onComplete: (record: SimulationHistory) => void;
}

export function SimulationExecution({
  onComplete,
}: SimulationExecutionProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [completed, setCompleted] = useState(false);

  const steps = [
    { id: 1, name: "解析数模数据", duration: 2000 },
    { id: 2, name: "加载 Mworks 模型", duration: 1500 },
    { id: 3, name: "配置仿真参数", duration: 1000 },
    { id: 4, name: "电机时序优化仿真", duration: 5000 },
    { id: 5, name: "计算统计结果", duration: 1500 },
    { id: 6, name: "生成分析报告", duration: 1000 },
  ];

  const handleStartSimulation = () => {
    setIsRunning(true);
    setProgress(0);
    setCompleted(false);

    let currentProgress = 0;
    let stepIndex = 0;

    const totalDuration = steps.reduce(
      (sum, step) => sum + step.duration,
      0,
    );

    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      // 更新当前步骤
      let accumulatedDuration = 0;
      for (let i = 0; i < steps.length; i++) {
        accumulatedDuration += steps[i].duration;
        if (
          (currentProgress / 100) * totalDuration <
          accumulatedDuration
        ) {
          setCurrentStep(steps[i].name);
          break;
        }
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsRunning(false);
        setCompleted(true);
        setCurrentStep("仿真完成");

        // 创建新的仿真记录
        const now = new Date();
        const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

        const newRecord: SimulationHistory = {
          id: `sim-${Date.now()}`,
          timestamp,
          cadVersion: "v2.3.1",
          foldingTime: "7.2s",
          status: "pass",
          motorConfig: {
            motor1Speed: 7500,
            motor2Speed: 7800,
            motor3Speed: 7600,
            motor4Speed: 6500,
          },
          notes: "新执行的仿真",
        };

        onComplete(newRecord);
      }
    }, totalDuration / 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">一键仿真执行</h2>
        <p className="text-gray-600">
          基于配置的数模和参数，自动执行仿真分析，并对电机时序进行优化
        </p>
      </div>

      <div className="space-y-6">
        {/* 执行控制区 */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="text-center">
            {!isRunning && !completed && (
              <>
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-gray-900 mb-2">准备就绪</h3>
                <p className="text-gray-600 mb-6">
                  点击下方按钮开始执行自动化仿真
                </p>
                <button
                  onClick={handleStartSimulation}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  开始仿真
                </button>
              </>
            )}

            {isRunning && (
              <>
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <TrendingUp className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-gray-900 mb-2">
                  仿真进行中...
                </h3>
                <p className="text-gray-600 mb-4">
                  {currentStep}
                </p>
                <div className="max-w-md mx-auto">
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="text-gray-900">
                    {progress}%
                  </div>
                </div>
              </>
            )}

            {completed && (
              <>
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-green-900 mb-2">
                  仿真完成！
                </h3>
                <p className="text-gray-600 mb-6">
                  已成功完成 Monte Carlo
                  仿真分析，请前往结果分析页面查看详情
                </p>
                <button
                  onClick={handleStartSimulation}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  重新运行
                </button>
              </>
            )}
          </div>
        </div>

        {/* 执行步骤 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">执行步骤</h3>
          <div className="space-y-3">
            {steps.map((step, idx) => {
              const stepProgress = Math.max(
                0,
                Math.min(
                  100,
                  ((progress - (idx / steps.length) * 100) /
                    (100 / steps.length)) *
                    100,
                ),
              );
              const isActive =
                isRunning && currentStep === step.name;
              const isCompleted =
                progress > ((idx + 1) / steps.length) * 100;

              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border ${
                    isActive
                      ? "bg-blue-50 border-blue-200"
                      : isCompleted
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : isActive ? (
                        <Clock className="w-5 h-5 text-blue-600 animate-spin" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                      )}
                      <div>
                        <div className="text-gray-900">
                          {step.id}. {step.name}
                        </div>
                        {isActive && (
                          <div className="text-blue-600">
                            执行中...
                          </div>
                        )}
                      </div>
                    </div>
                    {isActive && (
                      <div className="text-blue-600">
                        {Math.round(stepProgress)}%
                      </div>
                    )}
                  </div>
                  {isActive && (
                    <div className="mt-2">
                      <div className="w-full bg-blue-200 rounded-full h-1">
                        <div
                          className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${stepProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 配置概览 */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">当前配置</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-600">数模版本</span>
                <span>v2.3.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">参数数量</span>
                <span>6 个</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">评估指标</span>
                <span>5 个</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">仿真次数</span>
                <span>1000 次</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">预计时间</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-600">数据准备</span>
                <span>~5 秒</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">仿真计算</span>
                <span>~5 秒</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">结果分析</span>
                <span>~2 秒</span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex justify-between font-medium">
                <span className="text-gray-900">总计</span>
                <span className="text-blue-600">~12 秒</span>
              </div>
            </div>
          </div>
        </div>

        {/* 注意事项 */}
        <div className="bg-amber-50 rounded-lg border border-amber-200 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-amber-900 mb-2">注意事项</h3>
              <div className="text-amber-800 space-y-1">
                <div>• 仿真期间请勿修改配置参数</div>
                <div>• 确保 MWorks 环境已正确配置</div>
                <div>• 仿真结果将自动保存到项目目录</div>
                <div>
                  • 大规模仿真可能需要较长时间，请耐心等待
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}