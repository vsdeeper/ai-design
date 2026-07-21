'use client';

export function AddPipelineBar() {
  return (
    <button
      type="button"
      onClick={() => {
        // v1 占位：多流水线后续实现
        window.alert('多业务流程即将支持，当前可完成单条流水线评测。');
      }}
      className="mx-auto mt-5 flex w-full max-w-[1100px] items-center justify-center gap-2 rounded-[var(--radius-card)] border border-dashed border-[#b7d0ff] bg-surface/70 px-4 py-3.5 text-sm font-medium text-accent transition-colors hover:bg-accent-soft"
    >
      <span className="text-base leading-none">+</span>
      添加业务流程
    </button>
  );
}
