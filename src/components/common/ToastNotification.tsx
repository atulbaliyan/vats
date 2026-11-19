import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

export const ToastNotification: React.FC = () => {
  const toasts = useUIStore((s) => s.toasts);
  const removeToast = useUIStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-3.5 bg-vats-surface border border-vats-border rounded-sm shadow-2xl backdrop-blur-md animate-in slide-in-from-top-2 duration-200"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-vats-lime flex-shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />}
          {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />}

          <div className="flex-1">
            <h5 className="text-xs font-bold text-vats-offwhite">{toast.title}</h5>
            {toast.description && (
              <p className="text-[11px] text-vats-muted mt-0.5">{toast.description}</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-vats-muted hover:text-white p-1"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
