import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertCircle, Info, X, Sparkles } from "lucide-react";
import { Toast, ToastType } from "../types";

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType, duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, message, type, duration };
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastItemProps {
  key?: string;
  toast: Toast;
  onClose: () => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const { message, type } = toast;

  // Visual custom configuration based on toast type
  const config = {
    success: {
      bg: "bg-emerald-950/40 border-emerald-500/20 text-emerald-400",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.1)]",
      accent: "bg-emerald-500",
      icon: <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-400" />,
    },
    error: {
      bg: "bg-rose-950/40 border-rose-500/20 text-rose-400",
      glow: "shadow-[0_0_20px_rgba(244,63,94,0.1)]",
      accent: "bg-rose-500",
      icon: <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />,
    },
    warning: {
      bg: "bg-amber-950/40 border-amber-500/20 text-amber-400",
      glow: "shadow-[0_0_20px_rgba(245,158,11,0.1)]",
      accent: "bg-amber-500",
      icon: <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400" />,
    },
    info: {
      bg: "bg-blue-950/40 border-blue-500/20 text-blue-400",
      glow: "shadow-[0_0_20px_rgba(59,130,246,0.1)]",
      accent: "bg-blue-500",
      icon: <Info className="w-5 h-5 flex-shrink-0 text-blue-400" />,
    },
  }[type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`pointer-events-auto relative overflow-hidden flex items-start gap-3.5 p-4 rounded-2xl glass-panel border ${config.bg} ${config.glow} backdrop-blur-md`}
    >
      {/* Decorative accent slide line */}
      <div className={`absolute top-0 left-0 w-1 h-full ${config.accent}`} />

      {/* Dynamic Icon */}
      <div className="pt-0.5">{config.icon}</div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 pr-2">
        <h4 className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 mb-1 font-bold">
          System Notification
        </h4>
        <p className="text-xs text-neutral-200 leading-relaxed font-sans">
          {message}
        </p>
      </div>

      {/* Dismiss trigger */}
      <button
        onClick={onClose}
        className="text-neutral-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5 cursor-pointer flex-shrink-0"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Timed progress animation */}
      {toast.duration && toast.duration > 0 ? (
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: toast.duration / 1000, ease: "linear" }}
          className={`absolute bottom-0 left-0 h-[2px] ${config.accent} opacity-40`}
        />
      ) : null}
    </motion.div>
  );
}
