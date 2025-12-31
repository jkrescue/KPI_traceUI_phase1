import { useState } from "react";
import {
  Save,
  RotateCcw,
  AlertCircle,
  Zap,
  Move,
  Plus,
  Minus,
} from "lucide-react";
import {
  mockParameters,
  mockMotorParameters,
} from "../../store/mockData";

export function ParameterConfiguration() {
  const [parameters, setParameters] = useState(mockParameters);
  const [motorSpeeds, setMotorSpeeds] = useState(
    mockMotorParameters.map(m => m.maxSpeed)
  );
  const motorParams = mockMotorParameters;

  const handleSave = () => {
    alert("参数配置已保存！");
  };

  const handleReset = () => {
    if (confirm("确定要重置所有参数到默认值吗？")) {
      setParameters(mockParameters);
      setMotorSpeeds(mockMotorParameters.map(m => m.maxSpeed));
    }
  };

  const updateMotorSpeed = (index: number, value: number) => {
    const newSpeeds = [...motorSpeeds];
    newSpeeds[index] = Math.max(0, Math.min(10000, value)); // 限制在0-10000范围
    setMotorSpeeds(newSpeeds);
  };

  const incrementSpeed = (index: number) => {
    updateMotorSpeed(index, motorSpeeds[index] + 100);
  };

  const decrementSpeed = (index: number) => {
    updateMotorSpeed(index, motorSpeeds[index] - 100);
  };

  const updateParameter = (id: string, value: number) => {
    setParameters(
      parameters.map((p) =>
        p.id === id ? { ...p, current: value } : p,
      ),
    );
  };

  const getParamsByCategory = (category: string) => {
    return parameters.filter((p) => p.category === category);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          参数配置
        </h2>
        <p className="text-gray-600">
          配置4个电机的极限转速、行程参数以及系统质量，用于
          Monte Carlo 仿真
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：参数配置 */}
        <div className="col-span-2 space-y-6">
          {/* 操作按钮 */}
          <div className="flex items-center gap-3">
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

          {/* 电机参数卡片 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl px-[24px] py-[11px]">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                电机参数（4个电机）
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {motorParams.map((motor, idx) => (
                <div
                  key={motor.id}
                  className={`p-5 rounded-xl border-2 ${
                    motor.currentSpeed > 0
                      ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        motor.currentSpeed > 0
                          ? "bg-blue-600"
                          : "bg-gray-400"
                      }`}
                    >
                      <span className="text-white font-semibold">
                        {idx + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {motor.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {motor.type === "rotation"
                          ? "转动"
                          : "平动"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                          极限转速
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decrementSpeed(idx)}
                            className="w-7 h-7 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-all"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            value={motorSpeeds[idx]}
                            onChange={(e) => updateMotorSpeed(idx, parseInt(e.target.value) || 0)}
                            className="w-24 px-2 py-1 border-2 border-gray-300 rounded-lg text-center font-semibold text-gray-900 focus:border-blue-500 focus:outline-none"
                          />
                          <span className="text-gray-600 font-medium">rpm</span>
                          <button
                            onClick={() => incrementSpeed(idx)}
                            className="w-7 h-7 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 flex items-center justify-center transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(motor.currentSpeed / motorSpeeds[idx]) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        当前: {motor.currentSpeed} rpm
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 行程参数表格 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-xl px-[24px] py-[11px]">
            <div className="flex items-center gap-3 mb-6">
              <Move className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                行程参数
              </h3>
            </div>

            <div className="space-y-3">
              {getParamsByCategory("行程参数").map((param) => {
                const current = param.current || param.target;
                const upperLimit =
                  param.target + param.tolerance.upper;
                const lowerLimit =
                  param.target + param.tolerance.lower;
                const inRange =
                  current >= lowerLimit &&
                  current <= upperLimit;

                return (
                  <div
                    key={param.id}
                    className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 px-[16px] py-[11px]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {param.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          目标: {param.target} {param.unit} |
                          容差: +{param.tolerance.upper} /{" "}
                          {param.tolerance.lower}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          inRange
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {inRange ? "正常" : "超限"}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={lowerLimit}
                        max={upperLimit}
                        step={param.unit === "°" ? 1 : 5}
                        value={current}
                        onChange={(e) =>
                          updateParameter(
                            param.id,
                            parseFloat(e.target.value),
                          )
                        }
                        className="flex-1"
                      />
                      <input
                        type="number"
                        value={current}
                        onChange={(e) =>
                          updateParameter(
                            param.id,
                            parseFloat(e.target.value),
                          )
                        }
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold"
                      />
                      <span className="text-gray-600 w-12">
                        {param.unit}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 机转速参数表格 */}
        </div>

        {/* 右侧：配置摘要和提示 */}
        <div className="space-y-6">
          {/* 参数统计 */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-lg text-white mt-[19px] mr-[0px] mb-[3px] ml-[0px] px-[24px] py-[12px]">
            <h3 className="text-lg font-semibold mb-4">
              配置摘要
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-100">
                  总参数数量
                </span>
                <span className="font-bold text-xl">
                  {parameters.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">电机参数</span>
                <span className="font-bold text-xl">
                  {getParamsByCategory("电机参数").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">行程参数</span>
                <span className="font-bold text-xl">
                  {getParamsByCategory("行程参数").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">质量参数</span>
                <span className="font-bold text-xl">
                  {getParamsByCategory("质量参数").length}
                </span>
              </div>
            </div>
          </div>

          {/* 质量参数 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg px-[24px] py-[22px] mt-[18px] mr-[0px] mb-[24px] ml-[0px]">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              质量参数
            </h3>
            {getParamsByCategory("质量参数").map((param) => {
              const current = param.current || param.target;
              return (
                <div
                  key={param.id}
                  className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">
                      {param.name}
                    </span>
                    <span className="font-bold text-xl text-gray-900">
                      {current} {param.unit}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    目标: {param.target} {param.unit} (±
                    {param.tolerance.upper} {param.unit})
                  </div>
                </div>
              );
            })}
          </div>

          {/* 配置指南 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 p-6 shadow-lg px-[24px] py-[30px] mt-[0px] mr-[0px] mb-[34px] ml-[0px]">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <h3 className="text-blue-900 font-semibold">
                配置指南
              </h3>
            </div>
            <div className="text-blue-800 space-y-2.5 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>电机1和2为转动电机，控制手轮和俯仰</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>电机3为平动电机，控制滑轨行程</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>电机4为XX电机，控制xx使用</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>
                  容差范围影响Monte Carlo仿真的随机变化区间
                </span>
              </div>
            </div>
          </div>

          {/* 快捷模板 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              快捷模板
            </h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 transition-all text-left text-gray-700 font-medium">
                标准配置模板
              </button>
              <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 transition-all text-left text-gray-700 font-medium">
                高速折叠配置
              </button>
              <button className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 transition-all text-left text-gray-700 font-medium">
                低噪音配置
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}